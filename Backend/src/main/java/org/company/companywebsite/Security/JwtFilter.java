package org.company.companywebsite.Security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.company.companywebsite.Service.UserDetail;
import org.company.companywebsite.Service.UserDetailService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@Component
public class JwtFilter extends OncePerRequestFilter {

    private static final Set<String> mixedUrl = new HashSet<>(
            Arrays.asList(
                    "/api/v1/admin/**",
                    "/v3/api-docs/**",
                    "/swagger-ui/**",
                    "/swagger-resources/**",
                    "/webjars/**"
            )
    );

    private static final Set<String> fixedUrl = new HashSet<>(
            Arrays.asList(
                    "/api/v1/applicant/{id}", "/swagger-ui.html", "/configuration/ui",
                    "/configuration/security"
            )
    );
    private static final Set<String> methodUrl = new HashSet<>(
            Arrays.asList("/api/v1/job", "/api/v1/job/{id}")
    );

    private final JwtConfig jwtConfig;
    private final UserDetailService userDetailService;
    private final AntPathMatcher pathMatcher = new AntPathMatcher();

    private boolean isPublicUrl(String uri, Set<String> publcUrl) {
        return publcUrl.stream().anyMatch(pattern -> pathMatcher.match(pattern, uri));
    }


    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            filterChain.doFilter(request, response);
            return;
        }

        String uri = request.getRequestURI();
        String method = request.getMethod();

        if (isPublicUrl(uri, mixedUrl)) {
            filterChain.doFilter(request, response);
            return;
        }

        if (isPublicUrl(uri, fixedUrl)) {
            filterChain.doFilter(request, response);
            return;
        }
        if (method.equals("GET") && isPublicUrl(uri, methodUrl)) {
            filterChain.doFilter(request, response);
            return;
        }


        if (SecurityContextHolder.getContext().getAuthentication() != null) {
            filterChain.doFilter(request, response);
            return;
        }

        String authorization = request.getHeader("Authorization");
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authorization header missing or invalid");
            return;
        }

        String token = authorization.substring(7).trim();
        String username;

        try {
            username = jwtConfig.extractUsername(token);
        } catch (Exception e) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token format");
            return;
        }

        if (username != null) {
            UserDetail userDetail = userDetailService.loadUserByUsername(username);
            if (jwtConfig.validateToken(token, userDetail.getUsername())) {
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(userDetail, null, userDetail.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            } else {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token is not valid");
                return;
            }
        }

        filterChain.doFilter(request, response);
    }
}
