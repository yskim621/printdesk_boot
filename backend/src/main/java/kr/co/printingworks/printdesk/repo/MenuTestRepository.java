package kr.co.printingworks.printdesk.repo;

import kr.co.printingworks.printdesk.entity.MenuTest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface MenuTestRepository extends JpaRepository<MenuTest, Long>, QuerydslPredicateExecutor<MenuTest> {
}
