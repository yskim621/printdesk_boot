package kr.co.printingworks.printdesk.service;

import kr.co.printingworks.printdesk.dto.UserDto;
import kr.co.printingworks.printdesk.entity.Menu;

import java.util.List;

public interface MenuService {
    List<Menu> getMenu(UserDto userDto);
}
