package org.company.companywebsite.Repository;

import org.company.companywebsite.Model.Entity.Applicant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicantRepository extends JpaRepository<Applicant,Long> {
    List<Applicant> findAllByJob_Id(Long id);
}
