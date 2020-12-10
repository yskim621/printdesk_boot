package kr.co.printingworks.printdesk.service.impl;

import kr.co.printingworks.printdesk.dto.UserDto;
import kr.co.printingworks.printdesk.entity.Menu;
import kr.co.printingworks.printdesk.service.MenuService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class MenuServiceImpl implements MenuService {

    @Override
    @Transactional
    public List<Menu> getMenu(UserDto userDto) {
        return new ArrayList<>();
    }

}
