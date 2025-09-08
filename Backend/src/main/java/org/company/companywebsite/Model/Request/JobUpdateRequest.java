package org.company.companywebsite.Model.Request;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.company.companywebsite.Model.Enum.JobType;


@Getter
@Setter
@Data
public class JobUpdateRequest {

    private String title;

    private JobType type;

    private String location;

    private String experience;


    private String description;

    private String responsibility;

    private String qualifications;


}
