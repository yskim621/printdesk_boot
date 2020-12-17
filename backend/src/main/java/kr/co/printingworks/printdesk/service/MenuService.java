package kr.co.printingworks.printdesk.service;

import kr.co.printingworks.printdesk.dto.MenuDto;

import java.util.List;

public interface MenuService {
    // TODO: 파라미터로 user 추가해줘야됨.
    List<MenuDto> getMenu();
}
