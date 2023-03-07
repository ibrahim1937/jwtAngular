package com.chahboune.ibrahim.jwtwithsessions.service;

import com.chahboune.ibrahim.jwtwithsessions.dto.AuthenticationRequest;
import com.chahboune.ibrahim.jwtwithsessions.dto.AuthenticationResponse;
import com.chahboune.ibrahim.jwtwithsessions.dto.RegisterRequest;
import com.chahboune.ibrahim.jwtwithsessions.model.Role;
import com.chahboune.ibrahim.jwtwithsessions.model.User;
import com.chahboune.ibrahim.jwtwithsessions.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    private final Logger logger = LoggerFactory.getLogger(AuthenticationService.class);


    public User register(RegisterRequest request) {
        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        return repository.save(user);
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request, HttpServletResponse response) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        repository.save(user);


        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);

        // Create HttpOnly cookie
        Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setHttpOnly(true);

        // Add cookie to response
        response.addCookie(refreshTokenCookie);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }


    public AuthenticationResponse refresh(HttpServletResponse response) {
        // Get user from the context
        User user = null;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            String currentUserName = authentication.getName();
            user = repository.findByEmail(currentUserName)
                    .orElseThrow();
        }
        logger.info("User: " + user);

        // Generate new token
        var jwtToken = jwtService.generateToken(user);

        // return new token
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
