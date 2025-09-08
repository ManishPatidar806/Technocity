package org.company.companywebsite.Service;

import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import org.company.companywebsite.Model.Entity.Admin;
import org.company.companywebsite.Repository.AdminRepository;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserDetailService implements UserDetailsService {

    private final AdminRepository adminRepository;

    @SneakyThrows
    @Override
    public UserDetail loadUserByUsername(String username){
        Optional<Admin> admin = adminRepository.findByUsername(username);
        admin.orElseThrow(ChangeSetPersister.NotFoundException::new);
        return new UserDetail(admin.get());
    }
}
