package org.company.companywebsite.Service;

import org.company.companywebsite.Model.Request.LoginRequest;
import org.company.companywebsite.Model.Request.PasswordChangeRequest;
import org.company.companywebsite.Model.Response.ApiResponse;
import org.springframework.stereotype.Service;

@Service
public interface AdminService {
    public ApiResponse login(LoginRequest loginRequest);

    public ApiResponse updatePassword(PasswordChangeRequest passwordChangeRequest);
}
