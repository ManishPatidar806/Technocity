package org.company.companywebsite.Model.Request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PasswordChangeRequest {
    @NotBlank(message = "username must be present")
    private String username;
    @NotBlank(message = "Old Password must be valid")
    private String oldPassword;
    @NotBlank(message = "new Password must be Valid String")
    private String newPassword;

}
