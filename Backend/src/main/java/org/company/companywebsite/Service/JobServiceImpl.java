package org.company.companywebsite.Service;

import lombok.AllArgsConstructor;
import org.company.companywebsite.Exception.NotFoundException;
import org.company.companywebsite.Model.Entity.Job;
import org.company.companywebsite.Model.Request.JobCreateRequest;
import org.company.companywebsite.Model.Request.JobUpdateRequest;
import org.company.companywebsite.Model.Response.ApiResponse;
import org.company.companywebsite.Repository.JobRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
public class JobServiceImpl implements JobService {

    private final JobRepository jobRepository;
    private final ModelMapper modelMapper;



    @Override
    public ApiResponse createJob(JobCreateRequest createRequest) {
       Job job =  modelMapper.map(createRequest,Job.class);
       job.setPostedAt(LocalDate.now());
       Job result = jobRepository.save(job);
        return new ApiResponse("Success","Job created",result);
    }

    @Override
    public ApiResponse updateJobDetails(Long id, JobUpdateRequest updateRequest) {
       Job job = jobRepository.findById(id).orElseThrow(() -> new NotFoundException("Job not found"));
        if (StringUtils.hasText(updateRequest.getTitle())) {
            job.setTitle(updateRequest.getTitle());
        }

        if (StringUtils.hasText(updateRequest.getDescription())) {
            job.setDescription(updateRequest.getDescription());
        }



        if (StringUtils.hasText(updateRequest.getLocation())) {
            job.setLocation(updateRequest.getLocation());
        }

        if (updateRequest.getExperience() != null) {
            job.setExperience(updateRequest.getExperience());
        }

        if (StringUtils.hasText(String.valueOf(updateRequest.getType()))) {
            job.setType(updateRequest.getType());
        }



        if (StringUtils.hasText(updateRequest.getResponsibility())) {
            job.setResponsibility(updateRequest.getResponsibility());
        }

        if (StringUtils.hasText(updateRequest.getQualifications())) {
            job.setQualifications(updateRequest.getQualifications());
        }

       Job result = jobRepository.save(job);
    return new ApiResponse("Success","Job Details update Successfully",result);
    }

    @Override
    public ApiResponse deleteJob(Long id) {
        Job job = jobRepository.findById(id).orElseThrow(() -> new NotFoundException("Job not found"));
         jobRepository.delete(job);
        return  new ApiResponse("Success","Job deleted",null);
    }

    @Override
    public ApiResponse getAllJobs() {
        List<Job> jobs =  jobRepository.findAll();
        return new ApiResponse("Success","Jobs found",jobs);
    }

    @Override
    public ApiResponse getJobDetails(Long id) {
       Job result =  jobRepository.findById(id).orElseThrow(() -> new NotFoundException("Job not found"));
        return new ApiResponse("Success","Job Details found",result);
    }
}
