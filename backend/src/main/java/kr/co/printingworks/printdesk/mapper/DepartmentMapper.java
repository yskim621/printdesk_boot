package kr.co.printingworks.printdesk.mapper;

import kr.co.printingworks.printdesk.dto.basic.DepartmentDto;
import kr.co.printingworks.printdesk.entity.basic.Department;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface DepartmentMapper {
    DepartmentMapper INSTANCE = Mappers.getMapper(DepartmentMapper.class);

    @Mapping(source = "memo", target = "remark")
    @Mapping(expression = "java(CompanyMapper.INSTANCE.toDto(department.getCompany()))", target = "companyDto")
    DepartmentDto toDto(Department department);

    @Mapping(source = "remark", target = "memo")
    Department toEntity(DepartmentDto departmentDto);
}
