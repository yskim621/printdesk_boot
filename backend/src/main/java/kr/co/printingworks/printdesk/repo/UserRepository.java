package kr.co.printingworks.printdesk.repo;

import kr.co.printingworks.printdesk.entity.sys.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long>, QuerydslPredicateExecutor<User> {
    Optional<User> findByUserName(String userName);
    User findByMobile(String mobile);
    Optional<User> findByUserNo(String userNo);
}
