package kr.co.printingworks.printdesk.service.impl;

import com.querydsl.jpa.impl.JPAQueryFactory;
import kr.co.printingworks.printdesk.dto.MenuTestDto;
import kr.co.printingworks.printdesk.dto.UserDto;
import kr.co.printingworks.printdesk.entity.Menu;
import kr.co.printingworks.printdesk.entity.MenuTest;
import kr.co.printingworks.printdesk.entity.QMenuTest;
import kr.co.printingworks.printdesk.mapper.MenuTestMapper;
import kr.co.printingworks.printdesk.repo.MenuTestRepository;
import kr.co.printingworks.printdesk.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class MenuServiceImpl implements MenuService {
    @Autowired
    JPAQueryFactory jpaQueryFactory;

    @Autowired
    MenuTestRepository menuTestRepository;

    @Override
    @Transactional
    public List<Menu> getMenu(UserDto userDto) {
        return new ArrayList<>();
    }

    @Override
    @Transactional
    public List<MenuTestDto> getMenuTest() {
        QMenuTest parent = QMenuTest.menuTest;
        QMenuTest children = new QMenuTest("children");

        List<MenuTest> list = jpaQueryFactory
                .selectFrom(parent)
                .leftJoin(children).on(children.parent.eq(parent))
                .where(parent.parent.isNull())
                .groupBy(parent)
                .fetch();

//        System.out.println(list);

        List<MenuTestDto> menuList = new ArrayList<>();

        for (MenuTest entity : list) {
            MenuTestDto dto = MenuTestMapper.INSTANCE.toDto(entity);
            menuList.add(dto);
        }

        System.out.println(menuList);

        return menuList;
    }
}
