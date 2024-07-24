package com.javatars.pop.model;

import java.time.LocalDate;

public record ReceiptDtoOut(Long id, String company, double amount, String currency, LocalDate purchaseDate, String project, String category) {
}
