package org.company.companywebsite.Repository;

import org.company.companywebsite.Model.Entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobRepository  extends JpaRepository<Job , Long> {
}
