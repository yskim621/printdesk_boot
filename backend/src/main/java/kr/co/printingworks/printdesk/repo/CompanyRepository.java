package kr.co.printingworks.printdesk.repo;

import kr.co.printingworks.printdesk.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
    Company findById(String id);
}
