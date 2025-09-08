package org.company.companywebsite.Service;

import org.company.companywebsite.Model.Request.JobCreateRequest;
import org.company.companywebsite.Model.Request.JobUpdateRequest;
import org.company.companywebsite.Model.Response.ApiResponse;
import org.springframework.stereotype.Service;


@Service
public interface JobService {

    public ApiResponse createJob(JobCreateRequest  createRequest);

    public ApiResponse updateJobDetails(Long id , JobUpdateRequest updateRequest);
    public ApiResponse deleteJob(Long id);
    public ApiResponse getAllJobs();

    public ApiResponse getJobDetails(Long id);


}
