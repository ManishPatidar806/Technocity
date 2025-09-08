package org.company.companywebsite.Model.Entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class Applicant {
@Id
@GeneratedValue(strategy= GenerationType.IDENTITY)
private Long id;

private String applicantName;
private String email;
private String role;

private String resumeLink;
private LocalDate appliedAt;

@JsonIgnore
@ManyToOne
@JoinColumn(name = "job_foreign_key", nullable = false)
private Job job;

}
