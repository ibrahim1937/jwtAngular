package com.chahboune.ibrahim.jwtwithsessions.controller;

import com.chahboune.ibrahim.jwtwithsessions.dto.AuthenticationRequest;
import com.chahboune.ibrahim.jwtwithsessions.dto.AuthenticationResponse;
import com.chahboune.ibrahim.jwtwithsessions.dto.RegisterRequest;
import com.chahboune.ibrahim.jwtwithsessions.model.User;
import com.chahboune.ibrahim.jwtwithsessions.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authService;

    private Logger logger = LoggerFactory.getLogger(AuthenticationController.class);


    @PostMapping("/register")
    public ResponseEntity<User> register(
            @RequestBody RegisterRequest request
    ){
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request,
            HttpServletResponse response){


        return ResponseEntity.ok(authService.authenticate(request, response));
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthenticationResponse> refresh(
            HttpServletResponse response
    ){
        return ResponseEntity.ok(authService.refresh(response));
    }


}
