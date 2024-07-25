package com.javatars.pop.service;

import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobContainerClientBuilder;
import com.javatars.pop.model.Receipt;
import com.javatars.pop.model.User;
import com.javatars.pop.repository.ReceiptRepository;
import com.javatars.pop.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class BlobService {

    ReceiptRepository receiptRepository;

    public BlobService(ReceiptRepository receiptRepository) {
        this.receiptRepository = receiptRepository;
    }

    @Value("${BLOB_URL}")
    private String connectionString;

    @Value("${BLOB_IMG_CONT}")
    private String imageContainer;


    public String uploadImage(MultipartFile file, Long id) throws IOException {
        // Create a BlobContainerClient
        BlobContainerClient containerClient = new BlobContainerClientBuilder()
                .connectionString(connectionString)
                .containerName(imageContainer)
                .buildClient();

        String newFilename = generateNewFilename(file.getOriginalFilename(), id);
        // Create a BlobClient
        BlobClient blobClient = containerClient.getBlobClient(newFilename);
        // Upload the file
        blobClient.upload(file.getInputStream(), file.getSize(), true);
        // Return the URL of the uploaded file
        return newFilename;
    }

    private String generateNewFilename(String originalFilename, Long id) {
        String extension = "";
        int i = originalFilename.lastIndexOf('.');
        if (i >= 0) {
            extension = originalFilename.substring(i);
        }
        return id + extension;
    }


    public byte[] getImage(Long id) {
        // Create a BlobContainerClient
        Receipt receipt = receiptRepository.findById(id);
        BlobContainerClient containerClient = new BlobContainerClientBuilder()
                .connectionString(connectionString)
                .containerName(imageContainer)
                .buildClient();

        // Create a BlobClient
        BlobClient blobClient = containerClient.getBlobClient(receipt.getFileName());

        // Download the content to a byte array
        byte[] content = blobClient.downloadContent().toBytes();
        return content;
    }
}
