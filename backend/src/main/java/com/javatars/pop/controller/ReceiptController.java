package com.javatars.pop.controller;

import com.javatars.pop.model.*;
import com.javatars.pop.service.BlobService;
import com.javatars.pop.service.ProjectService;
import com.javatars.pop.service.ReceiptService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/receipts")
//@RequiredArgsConstructor
public class ReceiptController {

    ReceiptService receiptService;
    BlobService blobService;
    ProjectService projectService;

    public ReceiptController(ReceiptService receiptService, BlobService blobService, ProjectService projectService) {
        this.receiptService = receiptService;
        this.blobService = blobService;
        this.projectService = projectService;
    }

    @GetMapping
    public ResponseEntity<List<ReceiptDtoOut>> getReceipts(@RequestParam String email) {
        List<ReceiptDtoOut> receipts = receiptService.getReceipts(email);
        return ResponseEntity.ok(receipts);
    }

    @PostMapping("/filters")
    public ResponseEntity<List<ReceiptDtoOut>> getReceiptsWithFilters(
            @RequestParam String email, @RequestBody FilterDto filters) {
        List<ReceiptDtoOut> receipts = receiptService.getReceipts(email, filters);
        return ResponseEntity.ok(receipts);
    }

//--------- Endpoing for reading text from picture

    @PostMapping("/textextraction")
    public ResponseEntity<ReceiptDtoGpt> textExtraction(@RequestParam("file") MultipartFile file) {
        ReceiptDtoGpt receipt = receiptService.textExtraction(file);
        // Comment: this method only extracts text from the image and maps it to an object
        // It does not save the file to the server nor to the database.
        // todo: returnera ett ResponseEntity med ReceiptH-objektet och status 200 OK.
        return ResponseEntity.ok(receipt);
        //return new ReceiptH("1919", "Bauhaus", "2023-08-19", "Gamla Nynäsvägen 600S-142 51 SkogåsTlf. 020-120 20 30www.bauhaus.seORG.NR: 969630-6944VEDKLYV HL 650 0 2.295,00* DEKORT 495,00TOTAL 1.800,00Bankkort 1.800,00Moms% 25%Moms 360,00Brutto 1.800,00Ni blev betjänad av: 4232209 10 140 14 10 18 15:50För mer information: Privatkunder - 60 dagars öppet köpPremiumkunder - 90 dagars öppet köp", "hardcoded.user@jwt.com");
    }

    @PostMapping
    public ResponseEntity<ReceiptDtoOut> createReceipt(@RequestParam("file") MultipartFile file,
                                                       @RequestParam String email,
                                                       @RequestParam String company,
                                                       @RequestParam Double amount,
                                                       @RequestParam String currency,
                                                       @RequestParam LocalDate purchaseDate,
                                                       @RequestParam String textContent ) {
        ReceiptDtoGpt receiptDtoGpt = new ReceiptDtoGpt(company, amount, currency, purchaseDate, textContent);
        Receipt receipt = receiptService.createReceipt(receiptDtoGpt, email);
        String filename;
        try {
            filename = blobService.uploadImage(file, receipt.getId());
        } catch (IOException e) {
            System.out.println("Error uploading image");
            return ResponseEntity.badRequest().build();
        }
        receipt.setFileName(filename);
        receiptService.save(receipt);
        return ResponseEntity.ok(receipt.getDtoOut());
    }

    @PostMapping("/with-project")
    public ResponseEntity<ReceiptDtoOut> createReceiptWithProject(@RequestParam("file") MultipartFile file,
                                                       @RequestParam String email,
                                                       @RequestParam String company,
                                                       @RequestParam Double amount,
                                                       @RequestParam String currency,
                                                       @RequestParam LocalDate purchaseDate,
                                                       @RequestParam String textContent,
                                                       @RequestParam String projectTitle) {
        ReceiptDtoGpt receiptDtoGpt = new ReceiptDtoGpt(company, amount, currency, purchaseDate, textContent);
        Receipt receipt = receiptService.createReceipt(receiptDtoGpt, email);
        String filename;
        Project project = projectService.createProject(email, projectTitle);
        try {
            filename = blobService.uploadImage(file, receipt.getId());
        } catch (IOException e) {
            System.out.println("Error uploading image");
            return ResponseEntity.badRequest().build();
        }
        receipt.setFileName(filename);
        receipt.setProject(project);
        receiptService.save(receipt);
        project.addReceipt(receipt);
        projectService.save(project);
        return ResponseEntity.ok(receipt.getDtoOut());
    }



//------- I added getById to test display details.
//then I create a putMapping to edit receipt
// I also create service and repository for Project and Category
//because I need to get them byTitle to set in Edit.
//I added DeleteMapping.
// I need to fix condition to check if category or project are null,
//because now I can't delete them.
// add text-content and image in ReceiptDtoOut??

    @GetMapping("/{id}")
    public ResponseEntity<ReceiptDtoOut> getReceiptById(@PathVariable long id) {
        Receipt receipt = receiptService.findById(id);
        if (receipt != null) {
            return ResponseEntity.ok(receipt.getDtoOut());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}/img")
    public ResponseEntity<byte[]> getImage(@PathVariable Long id) {
        byte[] content = blobService.getImage(id);
        // Set the content type to image/jpeg (you may need to adjust this for other image types)
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_TYPE, "image/jpeg");
        return new ResponseEntity<>(content, headers, HttpStatus.OK);
    }


    @PutMapping("/{id}")
    public ResponseEntity<ReceiptDtoOut> editReceipt(
            @PathVariable long id,
            @RequestBody ReceiptDtoOut updatedReceipt) {
        Receipt receipt = receiptService.findById(id);
        if (receipt != null) {
//            Receipt receipt = receiptFound;
            receipt.setCompany(updatedReceipt.company());
            receipt.setAmount(updatedReceipt.amount());
            receipt.setCurrency(updatedReceipt.currency());
            receipt.setPurchaseDate(updatedReceipt.purchaseDate());

            Project project = receiptService.findProjectByTitle(updatedReceipt.project());
            Category category = receiptService.findCategoryByTitle(updatedReceipt.category());

            receipt.setProject(project);
            receipt.setCategory(category);

            Receipt updated = receiptService.save(receipt);
            return ResponseEntity.ok(updated.getDtoOut());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReceipt(@PathVariable long id) {
        Receipt receipt = receiptService.findById(id);
        if (receipt != null) {
            receiptService.delete(receipt);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}


