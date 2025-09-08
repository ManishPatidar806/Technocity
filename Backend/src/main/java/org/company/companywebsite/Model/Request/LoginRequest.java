package org.company.companywebsite.Model.Request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {
    @NotBlank(message = "Username must be present")
    private String username;
    @NotBlank(message = "password must be present")
    private String password;
}
