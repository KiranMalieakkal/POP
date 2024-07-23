package com.javatars.pop.controller;

import com.javatars.pop.model.Receipt;
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

    @GetMapping
    public String sayHello(){
        return "Azure Successful";
    }

//    @GetMapping("")
//    public ResponseEntity<List<Receipt>> getReceipts(@RequestParam String email) {
//        List<Receipt> receipts = service.getReceipts(email);
//    }

}

