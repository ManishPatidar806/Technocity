package org.company.companywebsite.Security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import javax.crypto.SecretKey;


import java.util.Date;

@Component
@Slf4j
public class JwtConfig {

    private static final String key = "gdsfgdfgsdfgdfsgregfdgdfgfgfdgdfgfdgdfgdfggdgdfgdfgdfggreg";
    private static final SecretKey SECRET_KEY = Keys.hmacShaKeyFor(Decoders.BASE64.decode(key));
    private static final long EXPIRATION_TIME = 3600 * 1000;


public String generateJwtToken(String username) {
return Jwts.builder().subject(username)
        .issuedAt(new Date(System.currentTimeMillis()))
        .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
        .signWith(SECRET_KEY)
        .compact();
}

public boolean validateToken(String token ,String username) {
    try {
        Jwts.parser().verifyWith(SECRET_KEY).build().parseSignedClaims(token);
        return  extractUsername(token).equals(username);
    } catch (Exception e) {
        log.info(e.getMessage());
        return false;
    }
}
    public String extractUsername(String token) {
        return Jwts.parser()
                .verifyWith(SECRET_KEY)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

}
