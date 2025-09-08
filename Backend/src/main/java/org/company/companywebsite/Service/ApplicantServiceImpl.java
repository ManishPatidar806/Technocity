package org.company.companywebsite.Service;

import lombok.AllArgsConstructor;
import org.company.companywebsite.Exception.NotFoundException;
import org.company.companywebsite.Model.Entity.Applicant;
import org.company.companywebsite.Model.Entity.Job;
import org.company.companywebsite.Model.Request.ApplicationRequest;
import org.company.companywebsite.Model.Response.ApiResponse;
import org.company.companywebsite.Repository.ApplicantRepository;
import org.company.companywebsite.Repository.JobRepository;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@Service
public class ApplicantServiceImpl implements ApplicantService {

    private final ApplicantRepository applicantRepository;
    private final JobRepository jobRepository;
    private final ResumeService resumeService;

    @Override
    public ApiResponse addApplicant(ApplicationRequest request, Long jobId) throws IOException {
        Job job = jobRepository.findById(jobId).orElseThrow(() ->  new NotFoundException("Job not found"));
        Applicant applicant = new Applicant();
        applicant.setJob(job);
        applicant.setAppliedAt(LocalDate.now());
        applicant.setApplicantName(request.getName());
        applicant.setEmail(request.getEmail());
//        String path = resumeService.uploadResume(request.getResume());
        applicant.setResumeLink(request.getResumeLink());
        applicantRepository.save(applicant);
        return new ApiResponse("Success","Applied Successfully",applicant) ;
    }

    @Override
    public ApiResponse getApplicants(Long id) {
        List<Applicant> applicants = applicantRepository.findAllByJob_Id(id);
        if(applicants.isEmpty()){
            throw new NotFoundException("Applicant not found");
        }
        return new ApiResponse("Success","Applicant Successfully",applicants) ;
    }
}
