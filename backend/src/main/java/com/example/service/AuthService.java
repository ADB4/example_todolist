package com.todoapp.service;

import com.todoapp.dto.AuthResponseDTO;
import com.todoapp.dto.UserLoginDTO;
import com.todoapp.dto.UserRegisterDTO;
import com.todoapp.dto.UserResponseDTO;
import com.todoapp.entity.User;
import com.todoapp.mapper.UserMapper;
import com.todoapp.repository.UserRepository;
import com.todoapp.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    public AuthResponseDTO register(UserRegisterDTO dto) {
        if (userRepository.existsByUsername(dto.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = userMapper.toEntity(dto);
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        User savedUser = userRepository.save(user);

        String token = jwtUtil.generateToken(savedUser.getUsername());
        UserResponseDTO userResponse = userMapper.toDTO(savedUser);

        return new AuthResponseDTO(token, userResponse);
    }

    public AuthResponseDTO login(UserLoginDTO dto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.getUsername(), dto.getPassword())
        );

        User user = userRepository.findByUsername(dto.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtUtil.generateToken(user.getUsername());
        UserResponseDTO userResponse = userMapper.toDTO(user);

        return new AuthResponseDTO(token, userResponse);
    }
}
