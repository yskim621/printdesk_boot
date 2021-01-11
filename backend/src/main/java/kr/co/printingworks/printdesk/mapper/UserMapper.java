package kr.co.printingworks.printdesk.mapper;

import kr.co.printingworks.printdesk.dto.RegisterDto;
import kr.co.printingworks.printdesk.dto.UserDto;
import kr.co.printingworks.printdesk.entity.sys.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    @Mapping(
            expression = "java(CompanyMapper.INSTANCE.toDto(user.getCompany()))",
            target = "companyDto"
    )
    UserDto toDto(User user);

    User toEntity(RegisterDto registerDto);
}
