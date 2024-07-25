package com.javatars.pop.model;

import java.time.LocalDate;

public record ReceiptDtoGpt(String company, double amount, String currency, LocalDate purchaseDate, String textContent) {
}
