package com.javatars.pop.model;

import java.util.List;

public record ProjectDto(Long id, String title, Long user_id, Long tax_category, List<ReceiptDtoOut> receiptList) {
}
