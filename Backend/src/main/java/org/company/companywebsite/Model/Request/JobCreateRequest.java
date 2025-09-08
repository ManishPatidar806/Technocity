package org.company.companywebsite.Model.Request;

import jakarta.validation.constraints.*;
import lombok.Data;
import org.company.companywebsite.Model.Enum.JobType;


@Data
public class JobCreateRequest {
    @NotBlank(message = "Title must be Valid")
    private String title;
    @NotNull(message = "Type must be []")
    private JobType type;
    @NotBlank(message = "location must be valid")
    private String location;
    @NotBlank(message = "experience must be present")
    private String experience;
    @NotBlank(message = "Description must be present")
    private String description;
    @NotBlank(message = "responsibility must be present")
    private String responsibilities;
    @NotBlank(message = "Qualification must be present")
    private String qualifications;


}
