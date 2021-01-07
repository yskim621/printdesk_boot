package kr.co.printingworks.printdesk.repo;

import kr.co.printingworks.printdesk.entity.sys.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long>, QuerydslPredicateExecutor<Company> {
}
