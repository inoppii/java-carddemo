package com.carddemo.controller;

import com.carddemo.entity.AppUser;
import com.carddemo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@PreAuthorize("hasRole('ADMIN')")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<AppUser> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping
    public ResponseEntity<AppUser> createUser(@RequestBody AppUser user) {
        return ResponseEntity.ok(userService.createUser(user));
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable String userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{userId}/toggle-active")
    public ResponseEntity<AppUser> toggleUserActive(@PathVariable String userId) {
        return ResponseEntity.ok(userService.toggleUserActive(userId));
    }
}
