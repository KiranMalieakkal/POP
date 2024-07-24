package com.javatars.pop.model;

import org.springframework.lang.Nullable;

import java.time.LocalDate;

public record FilterDto(@Nullable String company, @Nullable Double amountFrom, @Nullable Double amountTo, @Nullable String currency,
                        @Nullable LocalDate dateFrom, @Nullable LocalDate dateTo, @Nullable String project, @Nullable String category) {
}
