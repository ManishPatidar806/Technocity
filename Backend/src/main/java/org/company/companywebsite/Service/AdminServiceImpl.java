package org.company.companywebsite.Service;


import lombok.AllArgsConstructor;
import org.company.companywebsite.Model.Entity.Admin;
import org.company.companywebsite.Model.Request.LoginRequest;
import org.company.companywebsite.Model.Request.PasswordChangeRequest;
import org.company.companywebsite.Model.Response.ApiResponse;
import org.company.companywebsite.Repository.AdminRepository;
import org.company.companywebsite.Security.JwtConfig;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;
    private final JwtConfig jwtConfig;

    /*
     * Here we should hash the password
     * */

    @Override
    public ApiResponse login(LoginRequest loginRequest) {
        Admin admin = adminRepository.findByUsername(loginRequest.getUsername()).orElseThrow(() -> new UsernameNotFoundException("Username not found"));
        if (!admin.getPassword().equals(loginRequest.getPassword())) {
            throw new BadCredentialsException("Wrong password");
        }
        String token = jwtConfig.generateJwtToken(admin.getUsername());
        return new ApiResponse("Success","Login Successfully",token );
    }

    @Override
    public ApiResponse updatePassword(PasswordChangeRequest passwordChangeRequest) {
        Admin admin = adminRepository.findByUsername(passwordChangeRequest.getUsername()).orElseThrow(() -> new UsernameNotFoundException("Username not found"));
        if (!admin.getPassword().equals(passwordChangeRequest.getOldPassword())) {
            throw new BadCredentialsException("Old password not match");
        }
        admin.setPassword(passwordChangeRequest.getNewPassword());
        adminRepository.save(admin);

        return new ApiResponse("Success","Password changed successfully",null);
    }
}
