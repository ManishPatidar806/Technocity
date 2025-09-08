package org.company.companywebsite.Model.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.company.companywebsite.Model.Enum.JobType;
import java.time.LocalDate;
import java.util.List;

@Data
@Entity
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private JobType type;
    private String location;
    private String experience;
    @Column(length = 1000)
    private String description;
    @Column(length = 1000)
    private String responsibility;
    @Column(length = 1000)
    private String qualifications;
    private LocalDate postedAt;
    @JsonIgnore
    @OneToMany(mappedBy = "job" , cascade = CascadeType.ALL)
    private List<Applicant>applicants;

}
