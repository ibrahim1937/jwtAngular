package com.chahboune.ibrahim.jwtwithsessions.config;

import com.chahboune.ibrahim.jwtwithsessions.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthentificationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal
            (
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        final String jwt;
        String userEmail;
        final String refreshToken;


        // Extracting the access Token
        jwt = extractAccessToken(request);
        refreshToken = extractRefreshToken(request);
        if(jwt == null || refreshToken == null) {
            filterChain.doFilter(request, response);
            return;
        }


        try {
            userEmail = jwtService.extractUsername(jwt);
            if(userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null){
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
                if(jwtService.isTokenValid(jwt, userDetails)){
                    // log error
                    setUserToContext(userDetails, request);
                }
            }
        } catch (Exception e) {

            try {
                userEmail = jwtService.extractUsername(refreshToken);
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
                if (jwtService.isTokenValid(refreshToken,userDetails)){

                    setUserToContext(userDetails, request);
                    String newAccessToken = jwtService.generateToken(userDetails);
                    response.setHeader("new_access_token", newAccessToken);

                }

            } catch (Exception ex) {
                filterChain.doFilter(request, response);
                return;
            }
//            userEmail = jwtService.extractUsername(refreshToken);
//            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
//            if (jwtService.isTokenValid(refreshToken,userDetails)){
//
//                setUserToContext(userDetails, request);
//                String newAccessToken = jwtService.generateToken(userDetails);
//                response.setHeader("new_access_token", newAccessToken);
//
//            }

        }


        filterChain.doFilter(request, response);
    }


    private void setUserToContext(UserDetails userDetails, HttpServletRequest request) {
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.getAuthorities()
        );
        authToken.setDetails(
                new WebAuthenticationDetailsSource().buildDetails(request)
        );
        SecurityContextHolder.getContext().setAuthentication(authToken);
    }

    private String extractAccessToken(HttpServletRequest request) {
        final String authHeader = request.getHeader("Authorization");
        if(authHeader == null || !authHeader.startsWith("Bearer ")){
            return null;
        } else {
            return authHeader.substring(7);
        }
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
