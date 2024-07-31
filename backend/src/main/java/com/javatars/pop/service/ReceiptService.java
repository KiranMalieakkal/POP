package com.javatars.pop.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.javatars.pop.model.*;
import com.javatars.pop.repository.ReceiptRepository;
import com.javatars.pop.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Service
public class ReceiptService {

    private final ProjectService projectService;
    private final CategoryService categoryService;

    ReceiptRepository receiptRepository;
    UserRepository userRepository;
    private final RestClient restClient;
    @Value("${keys.openai}")
    private String API_KEY;

//    @Value("${image.upload.dir}")
//    private String fileDirectory;

    public ReceiptService(ReceiptRepository receiptRepository, UserRepository userRepository,
                          ProjectService projectService, CategoryService categoryService) {
        this.receiptRepository = receiptRepository;
        this.userRepository = userRepository;
        this.projectService = projectService;
        this.categoryService = categoryService;

        restClient = RestClient.builder()
                .baseUrl("https://api.openai.com/v1/chat")
                .build();
    }

    public List<ReceiptDtoOut> getReceipts(String email) {
        User user = userRepository.getReceipts(email);
        if (user == null) {
            user = new User("userFirstName", "userLastName", email);
            userRepository.saveUser(user);
            return new ArrayList<>();
        }
        return user.getReceipts().stream().map(Receipt::getDtoOut).toList();
    }

    public List<ReceiptDtoOut> getReceipts(String email, FilterDto filters) {
        User user = userRepository.getReceipts(email);
        if (user == null) {
            user = new User("userFirstName", "userLastName", email);
            userRepository.saveUser(user);
            return new ArrayList<>();
        }

        return user.getReceipts().stream()
                .filter(r -> filters.company() == null || r.getCompany().equalsIgnoreCase(filters.company().strip()))
                .filter(r -> filters.amountFrom() == null || r.getAmount() >= filters.amountFrom())
                .filter(r -> filters.amountTo() == null || r.getAmount() <= filters.amountTo())
                .filter(r -> filters.currency() == null || r.getCurrency().equals(filters.currency()))
                .filter(r -> filters.dateFrom() == null || !r.getPurchaseDate().isBefore(filters.dateFrom()))
                .filter(r -> filters.dateTo() == null || !r.getPurchaseDate().isAfter(filters.dateTo()))
                .filter(r -> filters.project() == null || (r.getProject() != null && r.getProject().getTitle().equalsIgnoreCase(filters.project().strip())))
                .filter(r -> filters.category() == null || (r.getCategory() != null && r.getCategory().getTitle().equalsIgnoreCase(filters.category().strip())))
                .map(Receipt::getDtoOut)
                .toList();
    }


//..........................................................

    public Receipt findById(long id) {
       return receiptRepository.findById(id);
    }

    public Receipt save(Receipt receipt) {
        return receiptRepository.save(receipt);
    }

    public Project findProjectByTitle(String title) {
        return projectService.findByTitle(title);
    }

    public Category findCategoryByTitle(String title) {
        return categoryService.findByTitle(title);
    }

    public void delete(Receipt receipt) {
        receiptRepository.delete(receipt);
    }


//..........................................................

    // Methods
    public ReceiptDtoGpt textExtraction(MultipartFile file) {
        System.out.println("\n\tCALL TO TEXT EXTRACTION API MADE\n");

        // Comment: file extension is needed when calling the text extraction api
        String fileExtensionType = getFileExtensionType(file.getOriginalFilename());
        // Comment: the image passed to the text extraction api has to be in base 64 format.
        String base64Image = convertFileToBase64(file);

        String prompt = "Extrahera texten i kvittot till följande key-value pairs: company, amount, currency, purchaseDate, textContent. Observera att ditt respons måste vara i json-format utan något extra. Alla fält ska vara av datatypen String, bortsett fra purchaseDate, den er LocalDate, og amount, den er double. Om bilden inte är på ett kvitto lämna fälten tomma.";

        String jsonString = "{" +
                "\"model\": \"gpt-4o\"," +
                "\"messages\": [" +
                "{" +
                "\"role\": \"user\"," +
                "\"content\": [" +
                "{" +
                "\"type\": \"text\"," +
                "\"text\": \""+ prompt + "\"" +
                "}," +
                "{" +
                "\"type\": \"image_url\"," +
                "\"image_url\": {" +
                "\"url\": \"data:image/" + fileExtensionType + ";base64," + base64Image + "\"" +
                "}" +
                "}" +
                "]" +
                "}" +
                "]," +
                "\"max_tokens\": 1000" +
                "}";

        try {
            String response = restClient.post()
                    .uri("/completions")
                    .header("Content-Type", "application/json")
                    .header("Authorization", "Bearer " + API_KEY)
                    .body(jsonString)
                    .retrieve()
                    .body(String.class);

            System.out.println("response = " + response);

            // Parse JSON to object
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.registerModule(new JavaTimeModule());
            JsonNode rootNode = objectMapper.readTree(response);
            JsonNode contentNode = rootNode.path("choices").get(0).path("message").path("content");

            // Remove the ```json\n prefix and ``` suffix if present
            String contentString = contentNode.asText();
            if (contentString.startsWith("```json")) {
                contentString = contentString.substring(7, contentString.length() - 3);
            }

            // Städa upp responsen. Det händer att den innehåller olagliga tecken
            contentString = sanitizeJsonString(contentString);
            System.out.println(contentString);

            // Map the contentString to Receipt class
            return objectMapper.readValue(contentString, ReceiptDtoGpt.class);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private String sanitizeJsonString(String jsonString) {
        return jsonString.replaceAll("[\\x00-\\x1F]", "");
    }

    public String getFileExtensionType(String fileName) {
        try {
            String formatName = fileName.substring(fileName.lastIndexOf('.') + 1);
            return formatName.toLowerCase();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public String convertFileToBase64(MultipartFile file) {
        try {
            // Read bytes from MultipartFile
            byte[] fileBytes = file.getBytes();

            // Encode byte array to Base64 string
            return Base64.getEncoder().encodeToString(fileBytes);

        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    public Receipt createReceipt(ReceiptDtoGpt receiptDtoGpt, String email) {
        User user = userRepository.getUser(email);
        Receipt receipt = receiptRepository.save(new Receipt(receiptDtoGpt, user));
        user.addReceipt(receipt);
        userRepository.saveUser(user);
        return receipt;
    }
}
