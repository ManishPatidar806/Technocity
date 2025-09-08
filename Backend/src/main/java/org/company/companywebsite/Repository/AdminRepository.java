package org.company.companywebsite.Repository;

import org.company.companywebsite.Model.Entity.Admin;
import org.company.companywebsite.Model.Request.LoginRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin,Long> {


    Optional<Admin> findByUsername(String username);
}
