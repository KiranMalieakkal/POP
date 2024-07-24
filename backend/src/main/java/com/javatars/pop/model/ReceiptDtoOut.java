package com.javatars.pop.model;

import java.time.LocalDate;

public record ReceiptDtoOut(String company, double amount, String currency, LocalDate purchaseDate) {
}
