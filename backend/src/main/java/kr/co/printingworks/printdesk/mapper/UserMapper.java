package kr.co.printingworks.printdesk.mapper;

import kr.co.printingworks.printdesk.dto.RegisterDto;
import kr.co.printingworks.printdesk.dto.UserDto;
import kr.co.printingworks.printdesk.entity.sys.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserDto toDto(User user);

    User toEntity(RegisterDto registerDto);
}
