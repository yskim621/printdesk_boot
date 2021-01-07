package kr.co.printingworks.printdesk.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import kr.co.printingworks.printdesk.entity.sys.QUser;
import kr.co.printingworks.printdesk.entity.sys.User;
import kr.co.printingworks.printdesk.repo.UserRepository;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.is;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class UserRepositoryTest {
    @Autowired
    UserRepository userRepository;

    @Autowired
    JPAQueryFactory jpaQueryFactory;

    String userName = "admin";
    String password = "123456";
    String email = "hsshin@printingworks.co.kr";

    @Test
    public void 사용자_등록_테스트() {
        User user = new User();
        user.setId(99L);
        user.setUserName(userName);
        user.setEmail(email);
        user.setPassword(password);
        user.setCreateName(userName);
        user.setMobile("01093442795");

        userRepository.save(user);

        QUser qUser = QUser.user;

        List<User> result = jpaQueryFactory
                .selectFrom(qUser)
                .where(qUser.id.eq(99L))
                .fetch();

        assertThat(result.get(0).getId(), is(equalTo(user.getId())));
    }

    @AfterAll
    public void afterAll() {
        userRepository.deleteAll();
    }
}
