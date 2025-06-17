package com.example.backend.model;


import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter

@Document(collection = "emergency_contacts")
public class EmergencyContact {
    @Id
    private String id; // Unique ID for the user
    private String userId; // User email or ID reference
    private List<Contact> contacts;

    public EmergencyContact(String userId) {
        this.userId = userId;
        this.contacts = new ArrayList<>();
    }
    @Getter
    @Setter
    public static class Contact {
        private String name; // Contact name
        private String phoneNumber;
        private String relationship;// Contact phone number
    }
}
