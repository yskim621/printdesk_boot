package kr.co.printingworks.printdesk.mapper;

import kr.co.printingworks.printdesk.dto.CompanyDto;
import kr.co.printingworks.printdesk.dto.basic.DepartmentDto;
import kr.co.printingworks.printdesk.entity.sys.Company;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CompanyMapper {
    CompanyMapper INSTANCE = Mappers.getMapper(CompanyMapper.class);

    @Mapping(source = "id", target = "companyId")
    CompanyDto toDto(Company company);
    CompanyDto toDto(DepartmentDto departmentDto);
}
