package org.company.companywebsite.Controller;


import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import org.company.companywebsite.Model.Request.ApplicationRequest;
import org.company.companywebsite.Model.Response.ApiResponse;
import org.company.companywebsite.Service.ApplicantService;
import org.company.companywebsite.Service.ResumeService;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Validated
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/applicant")
public class ApplicantController {
   private final ResumeService resumeService;
    private final ApplicantService applicantService;

/*
   Here I Submit resume and store into our project dir usign "upload/pdfs"
   @PostMapping(value = "/{id}" , consumes = "multipart/form-data")
    public ResponseEntity<ApiResponse> addApplicant(@Valid @ModelAttribute ApplicationRequest request, @PathVariable @NotNull Long id) throws IOException {
        return ResponseEntity.ok(applicantService.addApplicant(request,id)) ;
    }*/

    @PostMapping(value = "/{id}")
    public ResponseEntity<ApiResponse> addApplicant(@Valid @RequestBody ApplicationRequest request, @PathVariable @NotNull Long id) throws IOException {
        return ResponseEntity.ok(applicantService.addApplicant(request,id)) ;
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getApplicants(@RequestParam @NotNull Long id){
        return ResponseEntity.ok(applicantService.getApplicants(id));
    }

    @GetMapping("/getResume")
    public ResponseEntity<Resource> downloadPdf(@RequestParam @NotBlank String fileName) throws IOException {

    Resource resource = resumeService.getResumePdf(fileName);
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }



}
