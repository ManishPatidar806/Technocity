package org.company.companywebsite.Controller;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import org.company.companywebsite.Model.Request.JobCreateRequest;
import org.company.companywebsite.Model.Request.JobUpdateRequest;
import org.company.companywebsite.Model.Response.ApiResponse;
import org.company.companywebsite.Service.JobService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/api/v1")
@AllArgsConstructor
public class JobController {

    private final JobService jobService;

    @PostMapping("/job")
    public ResponseEntity<ApiResponse> createJob(@RequestBody @Valid JobCreateRequest createRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(jobService.createJob(createRequest));
    }

    @PatchMapping("/job/{id}")
    public ResponseEntity<ApiResponse> updateJob(@RequestBody @Valid JobUpdateRequest updateRequest, @PathVariable @NotNull Long id) {
        return ResponseEntity.ok(jobService.updateJobDetails(id,updateRequest));
    }

    @DeleteMapping("/job/{id}")
    public ResponseEntity<ApiResponse> deleteJob(@PathVariable @NotNull Long id)
    {
        jobService.deleteJob(id);
        return ResponseEntity.noContent().build();
    }


    @GetMapping("/job")
    public ResponseEntity<ApiResponse> getJobs() {
        return ResponseEntity.ok(jobService.getAllJobs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getJobDetail(@PathVariable @NotNull Long id) {
        return ResponseEntity.ok(jobService.getJobDetails(id));
    }

}
