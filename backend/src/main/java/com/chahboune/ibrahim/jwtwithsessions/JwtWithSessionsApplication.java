package com.chahboune.ibrahim.jwtwithsessions;

import com.chahboune.ibrahim.jwtwithsessions.model.Role;
import com.chahboune.ibrahim.jwtwithsessions.model.User;
import com.chahboune.ibrahim.jwtwithsessions.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
@RequiredArgsConstructor
public class JwtWithSessionsApplication implements CommandLineRunner {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    // Faire appel aux classes de configuration
    public static void main(String[] args) {
        SpringApplication.run(JwtWithSessionsApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        // Create a user with the role USER
        User user = User.builder()
                .email("ibrahimchahboune@gmail.com")
                .firstName("Ibrahim")
                .lastName("Chahboune")
                .password(passwordEncoder.encode("password"))
                .role(Role.USER)
                .build();

        // Create a user with the role USER
        User user2 = User.builder()
                .email("email@gmail.com")
                .firstName("Ibrahim")
                .lastName("Chahboune")
                .password(passwordEncoder.encode("password"))
                .role(Role.ADMIN)
                .build();

        // Save the user in the database
        userRepository.save(user);
        userRepository.save(user2);
    }
}
