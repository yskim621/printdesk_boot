package kr.co.printingworks.printdesk.repo;

import kr.co.printingworks.printdesk.entity.Menu;
import kr.co.printingworks.printdesk.enumerate.PermissionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Long>, QuerydslPredicateExecutor<Menu> {
    List<Menu> findMenuByTypeEqualsOrderBySortAsc(PermissionType type);
}
