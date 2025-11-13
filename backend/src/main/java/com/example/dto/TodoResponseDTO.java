package com.todoapp.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TodoResponseDTO {
    private Long id;
    private String title;
    private String description;
    private boolean completed;
    private LocalDateTime dueDate;
    private String priority;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
