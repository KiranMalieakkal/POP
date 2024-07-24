package com.javatars.pop.controller;

import com.javatars.pop.model.ReceiptDtoOut;
import com.javatars.pop.service.ReceiptService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/receipts")
public class ReceiptController {

    ReceiptService service;

    public ReceiptController(ReceiptService service) {
        this.service = service;
    }

    @GetMapping("")
    public ResponseEntity<List<ReceiptDtoOut>> getReceipts(@RequestParam String email) {
        List<ReceiptDtoOut> receipts = service.getReceipts(email);
        if(receipts.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(receipts);
    }

}

