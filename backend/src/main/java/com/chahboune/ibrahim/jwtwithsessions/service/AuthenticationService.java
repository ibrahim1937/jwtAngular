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
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final Environment env;

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
        refreshTokenCookie.setMaxAge(Integer.parseInt(env.getProperty("REFRESH_TOKEN_VALIDITY_SECONDS"))); // 30 days

        // Add cookie to response
        response.addCookie(refreshTokenCookie);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }


    public AuthenticationResponse refresh(HttpServletRequest request) {
        // Get Refresh token from cookie
//        User user = null;
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        if (!(authentication instanceof AnonymousAuthenticationToken)) {
//            String currentUserName = authentication.getName();
//            user = repository.findByEmail(currentUserName)
//                    .orElseThrow();
//        }
//        logger.info("User: " + user);

        AuthenticationResponse A = null;
        String refreshToken = extractRefreshToken(request);
        if(refreshToken == null) {
            return ResponseEntity.badRequest().body(A).getBody();
        }

        // Get username from token
        String username = jwtService.extractUsername(refreshToken);

        // Get user from database
        var user = repository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found with username : " + username));

        // Generate new token
        var jwtToken = jwtService.generateToken(user);

        // return new token
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    private String extractRefreshToken(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("refreshToken")) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
}
