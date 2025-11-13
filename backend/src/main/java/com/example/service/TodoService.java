package com.todoapp.service;

import com.todoapp.dto.TodoCreateDTO;
import com.todoapp.dto.TodoResponseDTO;
import com.todoapp.dto.TodoUpdateDTO;
import com.todoapp.entity.Todo;
import com.todoapp.entity.User;
import com.todoapp.mapper.TodoMapper;
import com.todoapp.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {

    @Autowired
    private TodoRepository todoRepository;

    @Autowired
    private TodoMapper todoMapper;

    public TodoResponseDTO create(TodoCreateDTO dto, User user) {
        Todo todo = todoMapper.toEntity(dto, user);
        Todo savedTodo = todoRepository.save(todo);
        return todoMapper.toDTO(savedTodo);
    }

    public List<TodoResponseDTO> getAllByUser(User user) {
        List<Todo> todos = todoRepository.findByUserOrderByCreatedAtDesc(user);
        return todoMapper.toDTOList(todos);
    }

    public TodoResponseDTO getById(Long id, User user) {
        Todo todo = todoRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("Todo not found"));
        return todoMapper.toDTO(todo);
    }

    public TodoResponseDTO update(Long id, TodoUpdateDTO dto, User user) {
        Todo todo = todoRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("Todo not found"));

        todoMapper.updateEntity(todo, dto);
        Todo updatedTodo = todoRepository.save(todo);
        return todoMapper.toDTO(updatedTodo);
    }

    public void delete(Long id, User user) {
        Todo todo = todoRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("Todo not found"));
        todoRepository.delete(todo);
    }
}
