package org.company.companywebsite.Security;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@AllArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    private static final String[] allowUrls = {
            "/api/v1/admin/**","/api/v1/applicant/{id}",
            "/v3/api-docs/**",
            "/swagger-ui/**",
            "/swagger-ui.html",
            "/swagger-resources/**",
            "/webjars/**",
            "/configuration/ui",
            "/configuration/security"

    };

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http.csrf(AbstractHttpConfigurer::disable).
                authorizeHttpRequests(
                        authorizeRequests -> authorizeRequests
                                .requestMatchers(HttpMethod.GET , "/api/v1/job" ,"/api/v1/job/{id}").permitAll()
                                .requestMatchers(allowUrls).permitAll()
                                .requestMatchers(HttpMethod.OPTIONS , "/**").permitAll()
                                .anyRequest().authenticated())
                .sessionManagement(sessionManagement ->sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtFilter , UsernamePasswordAuthenticationFilter.class).build();

    }


}
