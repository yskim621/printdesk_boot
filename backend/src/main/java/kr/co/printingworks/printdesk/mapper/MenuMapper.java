package kr.co.printingworks.printdesk.mapper;

import kr.co.printingworks.printdesk.dto.MenuDto;
import kr.co.printingworks.printdesk.entity.Menu;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface MenuMapper {
    MenuMapper INSTANCE = Mappers.getMapper(MenuMapper.class);

    MenuDto toDto(Menu entity);
}
