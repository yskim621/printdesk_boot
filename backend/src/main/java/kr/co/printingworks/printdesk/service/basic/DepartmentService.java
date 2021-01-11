package kr.co.printingworks.printdesk.service.basic;

import kr.co.printingworks.printdesk.dto.basic.DepartmentDto;

import java.util.List;

public interface DepartmentService {
    List<DepartmentDto> getDepartmentList(String authorization);
    void addDepartment(DepartmentDto departmentDto);
}
