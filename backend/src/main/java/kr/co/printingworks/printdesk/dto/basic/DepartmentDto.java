package kr.co.printingworks.printdesk.dto.basic;

import kr.co.printingworks.printdesk.dto.CompanyDto;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class DepartmentDto {
    Long id;
    String name;
    Integer sort;
    String remark;
    CompanyDto companyDto;
}
