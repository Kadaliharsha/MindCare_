package com.example.backend.controller;

import com.example.backend.DTO.LoginResponse;
import com.example.backend.model.LoginRequest;
import com.example.backend.model.Therapist;
import com.example.backend.model.Users;
import com.example.backend.repository.TherapistRepository;
import com.example.backend.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Array;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TherapistRepository therapistRepository;

    // Register a new user
    @PostMapping("/signUp/user")
    public ResponseEntity<?> registerAsUser(@RequestBody Users user) {
        // Check if the email already exists
        if (usersRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User with this email already exists.");
        }

        // Validate input
        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            return ResponseEntity.badRequest().body("Password cannot be null or empty.");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword())); // Hash the password
        user.setRoles(Collections.singletonList("USER")); // Standardized role prefix
        user.setProfilePicture("http://res.cloudinary.com/dwcqn9ilb/image/upload/v1733560697/wczploctk3ioxtndygve.png"); // Default value (could be a base64 image or URL in a real app)
        usersRepository.save(user);

        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully.");
    }

    @PostMapping("/signUp/therapist")
    public ResponseEntity<?> registerAsTherapist(@RequestBody Therapist therapist) {
        // Check if the email already exists
        if (therapistRepository.findByEmail(therapist.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Therapist with this email already exists.");
        }

        // Validate input
        if (therapist.getPassword() == null || therapist.getPassword().isEmpty()) {
            return ResponseEntity.badRequest().body("Password cannot be null or empty.");
        }

        therapist.setPassword(passwordEncoder.encode(therapist.getPassword())); // Hash the password
        therapist.setRoles(Collections.singletonList("THERAPIST")); // Standardized role prefix
        therapist.setProfilePicture("http://res.cloudinary.com/dwcqn9ilb/image/upload/v1733560697/wczploctk3ioxtndygve.png"); // Default value
        therapistRepository.save(therapist);

        return ResponseEntity.status(HttpStatus.CREATED).body("Therapist registered successfully.");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        if (loginRequest.getEmail() == null || loginRequest.getPassword() == null) {
            return ResponseEntity.badRequest().body("Email and password must not be null.");
        }

        Optional<Users> userOpt = usersRepository.findByEmail(loginRequest.getEmail());
        if (userOpt.isPresent()) {
            Users user = userOpt.get();
            if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                // Returning user roles and name in a Map
                Map<String, Object> response = new HashMap<>();
                response.put("roles", user.getRoles());
                response.put("name", user.getName());
                return ResponseEntity.ok(response);  // Respond with roles and name
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials for user.");
            }
        }

        Optional<Therapist> therapistOpt = therapistRepository.findByEmail(loginRequest.getEmail());
        if (therapistOpt.isPresent()) {
            Therapist therapist = therapistOpt.get();
            if (passwordEncoder.matches(loginRequest.getPassword(), therapist.getPassword())) {
                // Returning therapist roles and name in a Map
                Map<String, Object> response = new HashMap<>();
                response.put("roles", therapist.getRoles());
                response.put("name", therapist.getName());
                return ResponseEntity.ok(response);  // Respond with roles and name
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials for therapist.");
            }
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User or therapist not found.");
    }


}