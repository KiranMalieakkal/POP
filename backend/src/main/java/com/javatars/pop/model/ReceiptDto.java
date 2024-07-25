package com.javatars.pop.model;

import java.time.LocalDate;

public record ReceiptDto(Long id,
                         String company,
                         double amount,
                         String currency,
                         LocalDate purchaseDate) {

}
//add text-content and image?
