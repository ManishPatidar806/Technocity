package org.company.companywebsite.Model.Request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ApplicationRequest {
    @NotBlank(message = "Name must be present")
    private String name;
    @NotBlank(message = "Email can not be blank or null")
    @Email(message = "Enter email into valid format")
    private String email;
    @NotBlank(message = "Role can not be blank or null")
    private String role;
    @NotBlank(message = "Resume link can not be blank or null")
    private String resumeLink;

}
