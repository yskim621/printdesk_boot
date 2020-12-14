package kr.co.printingworks.printdesk.mapper;

import kr.co.printingworks.printdesk.dto.MenuTestDto;
import kr.co.printingworks.printdesk.entity.MenuTest;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface MenuTestMapper {
    MenuTestMapper INSTANCE = Mappers.getMapper(MenuTestMapper.class);

    MenuTestDto toDto(MenuTest entity);
}
