package kr.co.printingworks.printdesk;

import com.querydsl.jpa.impl.JPAQueryFactory;
import kr.co.printingworks.printdesk.entity.MenuTest;
import kr.co.printingworks.printdesk.entity.QMenuTest;
import kr.co.printingworks.printdesk.repo.MenuTestRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@SpringBootTest
public class SelfJoinQueryTest {
    @Autowired
    MenuTestRepository repository;

    @Autowired
    JPAQueryFactory jpaQueryFactory;

    @Test
    @Transactional
    public void selfJoinTest() {
        QMenuTest parent = QMenuTest.menuTest;
        QMenuTest children = new QMenuTest("children");

        List<MenuTest> list = jpaQueryFactory
                .selectFrom(parent)
                .leftJoin(children).on(children.parent.eq(parent))
                .where(parent.parent.isNull())
                .groupBy(parent)
                .fetch();

        System.out.println(list);
    }
}
