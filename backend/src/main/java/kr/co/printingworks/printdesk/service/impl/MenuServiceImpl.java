package kr.co.printingworks.printdesk.service.impl;

import com.querydsl.jpa.impl.JPAQueryFactory;
import kr.co.printingworks.printdesk.dto.MenuDto;
import kr.co.printingworks.printdesk.entity.Menu;
import kr.co.printingworks.printdesk.entity.QMenu;
import kr.co.printingworks.printdesk.enumerate.PermissionType;
import kr.co.printingworks.printdesk.mapper.MenuMapper;
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
    private static final QMenu Q_MENU = QMenu.menu;


    @Override
    @Transactional
    public List<MenuDto> getMenu() {
        List<Menu> menuList = jpaQueryFactory
                .selectFrom(Q_MENU)
                .where(Q_MENU.parent.isNull(), Q_MENU.type.eq(PermissionType.MENU))
                .groupBy(Q_MENU)
                .orderBy(Q_MENU.sort.asc())
                .fetch();

        List<MenuDto> menuDtoList = new ArrayList<>();

        for (Menu entity : menuList) {
            MenuDto dto = MenuMapper.INSTANCE.toDto(entity);
            menuDtoList.add(dto);
        }

        return menuDtoList;
    }
}
