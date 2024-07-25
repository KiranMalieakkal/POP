package com.javatars.pop.controller;

import com.azure.core.annotation.Post;
import com.javatars.pop.model.*;
import com.javatars.pop.service.ReceiptService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/receipts")
public class ReceiptController {

    ReceiptService service;
    public ReceiptController(ReceiptService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<ReceiptDtoOut>> getReceipts(@RequestParam String email) {
        List<ReceiptDtoOut> receipts = service.getReceipts(email);
        if(receipts.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(receipts);
    }

    @GetMapping("/filters")
    public ResponseEntity<List<ReceiptDtoOut>> getReceiptsWithFilters(
            @RequestParam String email, @RequestBody FilterDto filters) {
        List<ReceiptDtoOut> receipts = service.getReceipts(email, filters);
        if(receipts.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(receipts);
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
        Receipt receipt = service.findById(id);
        if (receipt != null) {
            return ResponseEntity.ok(receipt.getDto());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<ReceiptDtoOut> editReceipt(
            @PathVariable long id,
            @RequestBody ReceiptDtoOut updatedReceipt) {
        Receipt receipt = service.findById(id);
        if (receipt != null) {
//            Receipt receipt = receiptFound;
            receipt.setCompany(updatedReceipt.company());
            receipt.setAmount(updatedReceipt.amount());
            receipt.setCurrency(updatedReceipt.currency());
            receipt.setPurchaseDate(updatedReceipt.purchaseDate());

            Project project = service.findProjectByTitle(updatedReceipt.project());
            Category category = service.findCategoryByTitle(updatedReceipt.category());

            receipt.setProject(project);
            receipt.setCategory(category);

            Receipt updated = service.save(receipt);
            return ResponseEntity.ok(updated.getDto());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteReceipt(@PathVariable long id) {
        Receipt receipt = service.findById(id);
        if (receipt != null) {
            service.delete(receipt);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}


