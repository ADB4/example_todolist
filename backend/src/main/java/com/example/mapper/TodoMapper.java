package com.todoapp.mapper;

import com.todoapp.dto.TodoCreateDTO;
import com.todoapp.dto.TodoResponseDTO;
import com.todoapp.dto.TodoUpdateDTO;
import com.todoapp.entity.Priority;
import com.todoapp.entity.Todo;
import com.todoapp.entity.User;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class TodoMapper {

    public Todo toEntity(TodoCreateDTO dto, User user) {
        Todo todo = new Todo();
        todo.setTitle(dto.getTitle());
        todo.setDescription(dto.getDescription());
        todo.setDueDate(dto.getDueDate());
        if (dto.getPriority() != null) {
            todo.setPriority(Priority.valueOf(dto.getPriority()));
        } else {
            todo.setPriority(Priority.MEDIUM);
        }
        todo.setUser(user);
        return todo;
    }

    public TodoResponseDTO toDTO(Todo entity) {
        TodoResponseDTO dto = new TodoResponseDTO();
        dto.setId(entity.getId());
        dto.setTitle(entity.getTitle());
        dto.setDescription(entity.getDescription());
        dto.setCompleted(entity.isCompleted());
        dto.setDueDate(entity.getDueDate());
        dto.setPriority(entity.getPriority().name());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());
        return dto;
    }

    public List<TodoResponseDTO> toDTOList(List<Todo> entities) {
        return entities.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public void updateEntity(Todo entity, TodoUpdateDTO dto) {
        if (dto.getTitle() != null) {
            entity.setTitle(dto.getTitle());
        }
        if (dto.getDescription() != null) {
            entity.setDescription(dto.getDescription());
        }
        if (dto.getCompleted() != null) {
            entity.setCompleted(dto.getCompleted());
        }
        if (dto.getDueDate() != null) {
            entity.setDueDate(dto.getDueDate());
        }
        if (dto.getPriority() != null) {
            entity.setPriority(Priority.valueOf(dto.getPriority()));
        }
    }
}
