package kr.co.printingworks.printdesk;

import com.querydsl.jpa.impl.JPAQueryFactory;
import kr.co.printingworks.printdesk.entity.Menu;
import kr.co.printingworks.printdesk.entity.QMenu;
import kr.co.printingworks.printdesk.enumerate.PermissionType;
import kr.co.printingworks.printdesk.repo.MenuRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@SpringBootTest
public class MenuRepositoryTest {
    @Autowired
    MenuRepository menuRepository;

    @Autowired
    JPAQueryFactory jpaQueryFactory;

    @Test
    @Transactional
    public void getMenuTest(){

        QMenu p = QMenu.menu;
        QMenu c = new QMenu("c");

//        List<Menu> menuList = jpaQueryFactory
//                                        .selectFrom(p)
////                                        .from(p)
//                                        .leftJoin(p.children, c)
////                                        .where(p.type.eq(PermissionType.MENU), c.type.eq(PermissionType.MENU))
//                                        .fetch();
        List<Menu> menuList = jpaQueryFactory.selectFrom(p).leftJoin(c, p).where((p.type.eq(PermissionType.MENU))).fetch();
        System.out.println(menuList);

//        List<Menu> menuList = menuRepository.findMenuByTypeEqualsOrderBySortAsc(PermissionType.MENU);
//        System.out.println(menuList);
    }
}
