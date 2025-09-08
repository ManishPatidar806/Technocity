package org.company.companywebsite.Controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.company.companywebsite.Model.Request.LoginRequest;
import org.company.companywebsite.Model.Request.PasswordChangeRequest;
import org.company.companywebsite.Model.Response.ApiResponse;
import org.company.companywebsite.Service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/admin")
public class AdminController {

    private final AdminService adminService;


    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(adminService.login(loginRequest));
    }

    @PostMapping("/changepassword")
    public ResponseEntity<ApiResponse> changePassword(@Valid @RequestBody PasswordChangeRequest passwordChangeRequest) {
        return ResponseEntity.ok(adminService.updatePassword(passwordChangeRequest));
    }

}
