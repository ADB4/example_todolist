package com.todoapp.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TodoUpdateDTO {
    private String title;
    private String description;
    private Boolean completed;
    private LocalDateTime dueDate;
    private String priority;
}
