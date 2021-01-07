package kr.co.printingworks.printdesk.repo;

import kr.co.printingworks.printdesk.entity.sys.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long>, QuerydslPredicateExecutor<User> {
    User findByUserName(String userName);
    User findByMobile(String mobile);
}
