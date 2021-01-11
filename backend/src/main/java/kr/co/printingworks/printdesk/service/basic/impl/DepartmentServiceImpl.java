package kr.co.printingworks.printdesk.service.basic.impl;

import com.querydsl.jpa.impl.JPAQueryFactory;
import io.jsonwebtoken.Claims;
import kr.co.printingworks.printdesk.dto.basic.DepartmentDto;
import kr.co.printingworks.printdesk.entity.basic.Department;
import kr.co.printingworks.printdesk.entity.basic.QDepartment;
import kr.co.printingworks.printdesk.entity.sys.Company;
import kr.co.printingworks.printdesk.entity.sys.QCompany;
import kr.co.printingworks.printdesk.mapper.DepartmentMapper;
import kr.co.printingworks.printdesk.service.basic.DepartmentService;
import kr.co.printingworks.printdesk.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DepartmentServiceImpl implements DepartmentService {
    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    JPAQueryFactory jpaQueryFactory;

    @Override
    public List<DepartmentDto> getDepartmentList(String authorization) {
        String jwt = authorization.replace("Bearer ", "");
        Claims claims = jwtTokenProvider.getClaims(jwt);
        Map<String, Object> response = new HashMap<>();
        List<DepartmentDto> departmentDtoList = new ArrayList<>();
        if (claims == null) {
            response.put("code", 401);
        } else {
            Long companyId = claims.get("companyId", Long.class);

            QCompany qCompany = QCompany.company;
            List<Company> companyList = jpaQueryFactory
                    .selectFrom(qCompany)
                    .where(qCompany.id.eq(companyId))
                    .fetch();

            QDepartment qDepartment = QDepartment.department;
            List<Department> departmentList = jpaQueryFactory
                    .selectFrom(qDepartment)
                    .where(qDepartment.company.eq(companyList.get(0)))
                    .fetch();

            for (Department department : departmentList) {
                DepartmentDto dto = DepartmentMapper.INSTANCE.toDto(department);
                departmentDtoList.add(dto);
            }
        }

        return departmentDtoList;
    }

    @Override
    public void addDepartment(DepartmentDto departmentDto) {
        System.out.println(departmentDto);
    }
}
