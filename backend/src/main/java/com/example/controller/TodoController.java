package com.todoapp.controller;

import com.todoapp.dto.TodoCreateDTO;
import com.todoapp.dto.TodoResponseDTO;
import com.todoapp.dto.TodoUpdateDTO;
import com.todoapp.entity.User;
import com.todoapp.service.CustomUserDetailsService;
import com.todoapp.service.TodoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
public class TodoController {

    @Autowired
    private TodoService todoService;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @PostMapping
    public ResponseEntity<TodoResponseDTO> createTodo(
            @Valid @RequestBody TodoCreateDTO dto,
            @AuthenticationPrincipal UserDetails userDetails) {
        User user = userDetailsService.getUserByUsername(userDetails.getUsername());
        TodoResponseDTO response = todoService.create(dto, user);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<TodoResponseDTO>> getAllTodos(
            @AuthenticationPrincipal UserDetails userDetails) {
        User user = userDetailsService.getUserByUsername(userDetails.getUsername());
        List<TodoResponseDTO> todos = todoService.getAllByUser(user);
        return ResponseEntity.ok(todos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TodoResponseDTO> getTodoById(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        User user = userDetailsService.getUserByUsername(userDetails.getUsername());
        TodoResponseDTO todo = todoService.getById(id, user);
        return ResponseEntity.ok(todo);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<TodoResponseDTO> updateTodo(
            @PathVariable Long id,
            @Valid @RequestBody TodoUpdateDTO dto,
            @AuthenticationPrincipal UserDetails userDetails) {
        User user = userDetailsService.getUserByUsername(userDetails.getUsername());
        TodoResponseDTO response = todoService.update(id, dto, user);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        User user = userDetailsService.getUserByUsername(userDetails.getUsername());
        todoService.delete(id, user);
        return ResponseEntity.noContent().build();
    }
}
