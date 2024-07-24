package com.javatars.pop.controller;

import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobContainerClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.WritableResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.Charset;

@CrossOrigin
@RestController
@RequestMapping("blob")
public class BlobController {

    @Value("azure-blob://caninefiles/test.txt")
    private Resource blobFile;

    @Value("${BLOB_URL}")
    private String connectionString;

    @Value("${BLOB_IMG_CONT}")
    private String imageContainer;

    @GetMapping("/readBlobFile")
    public String readBlobFile() throws IOException {
        return StreamUtils.copyToString(
                this.blobFile.getInputStream(),
                Charset.defaultCharset());
    }

    @PostMapping("/writeBlobFile")
    public String writeBlobFile(@RequestBody String data) throws IOException {
//        System.out.println("data.getSize() = " + data.getSize());
        try (OutputStream os = ((WritableResource) this.blobFile).getOutputStream()) {
            os.write(data.getBytes());
        }
        return "file was updated";
    }

    @PostMapping("/uploadLocally")
    public String handleFileUpload(@RequestParam("file") MultipartFile file) {
        String uploadDir = "uploads/";
        File uploadDirFile = new File(uploadDir);

        // Create the directory if it doesn't exist
        if (!uploadDirFile.exists()) {
            uploadDirFile.mkdirs();
        }
        try {
            // Get the file name and create the file on the server
            String fileName = file.getOriginalFilename();
            File destFile = new File(uploadDir + fileName);
            file.transferTo(destFile.toPath());
            return "File uploaded successfully: " + destFile.getAbsolutePath();
        } catch (IOException e) {
            e.printStackTrace();
            return "Failed to upload file: " + e.getMessage();
        }
    }

    @PostMapping("/uploadImage")
    public String uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        // Create a BlobContainerClient
        BlobContainerClient containerClient = new BlobContainerClientBuilder()
                .connectionString(connectionString)
                .containerName(imageContainer)
                .buildClient();

        // Create a BlobClient
        BlobClient blobClient = containerClient.getBlobClient(file.getOriginalFilename());

        // Upload the file
        blobClient.upload(file.getInputStream(), file.getSize(), true);

        // Return the URL of the uploaded file
        return blobClient.getBlobUrl();
    }

    @GetMapping("/getImage/{fileName}")
    public ResponseEntity<byte[]> getImage(@PathVariable String fileName) {
        // Create a BlobContainerClient
        BlobContainerClient containerClient = new BlobContainerClientBuilder()
                .connectionString(connectionString)
                .containerName(imageContainer)
                .buildClient();

        // Create a BlobClient
        BlobClient blobClient = containerClient.getBlobClient(fileName);

        // Download the content to a byte array
        byte[] content = blobClient.downloadContent().toBytes();

        // Set the content type to image/jpeg (you may need to adjust this for other image types)
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_TYPE, "image/jpeg");

        return new ResponseEntity<>(content, headers, HttpStatus.OK);
    }


}
