package org.company.companywebsite.Service;

import org.company.companywebsite.Model.Entity.Applicant;
import org.company.companywebsite.Model.Request.ApplicationRequest;
import org.company.companywebsite.Model.Response.ApiResponse;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public interface ApplicantService {
    public ApiResponse addApplicant(ApplicationRequest request, Long id) throws IOException;
    public ApiResponse getApplicants(Long id);
}
