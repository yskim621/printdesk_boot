package kr.co.printingworks.printdesk.service.basic.impl;

import com.querydsl.jpa.impl.JPAQueryFactory;
import io.jsonwebtoken.Claims;
import kr.co.printingworks.printdesk.dto.basic.DepartmentDto;
import kr.co.printingworks.printdesk.entity.basic.Department;
import kr.co.printingworks.printdesk.entity.basic.QDepartment;
import kr.co.printingworks.printdesk.entity.sys.Company;
import kr.co.printingworks.printdesk.entity.sys.QCompany;
import kr.co.printingworks.printdesk.mapper.DepartmentMapper;
import kr.co.printingworks.printdesk.repo.basic.DepartmentRepository;
import kr.co.printingworks.printdesk.service.basic.DepartmentService;
import kr.co.printingworks.printdesk.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class DepartmentServiceImpl implements DepartmentService {
    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    JPAQueryFactory jpaQueryFactory;

    @Autowired
    DepartmentRepository departmentRepository;

    @Override
    public List<DepartmentDto> getDepartmentList(String authorization) {
        String jwt = authorization.replace("Bearer ", "");
        Claims claims = jwtTokenProvider.getClaims(jwt);

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
                .orderBy(qDepartment.sort.asc())
                .fetch();

        List<DepartmentDto> departmentDtoList = new ArrayList<>();
        for (Department department : departmentList) {
            DepartmentDto dto = DepartmentMapper.INSTANCE.toDto(department);
            departmentDtoList.add(dto);
        }

        return departmentDtoList;
    }

    @Override
    public void addDepartment(String authorization, DepartmentDto departmentDto) {
        String jwt = authorization.replace("Bearer ", "");
        Claims claims = jwtTokenProvider.getClaims(jwt);
        Long companyId = claims.get("companyId", Long.class);

        Department department = DepartmentMapper.INSTANCE.toEntity(departmentDto);

        QCompany qCompany = QCompany.company;
        List<Company> companyList = jpaQueryFactory
                .selectFrom(qCompany)
                .where(qCompany.id.eq(companyId))
                .fetch();

        Company company = companyList.get(0);

        QDepartment qDepartment = QDepartment.department;
        List<Department> departmentList = jpaQueryFactory
                .selectFrom(qDepartment)
                .where(qDepartment.company.eq(company))
                .fetch();

        department.setCompany(company);
        department.setSort(departmentList.size() + 1);

        departmentRepository.save(department);
    }

    @Override
    public void updateDepartment(DepartmentDto departmentDto) {
        QDepartment qDepartment = QDepartment.department;
        List<Department> departmentList = jpaQueryFactory
                .selectFrom(qDepartment)
                .where(qDepartment.id.eq(departmentDto.getId()))
                .fetch();

        Department department = departmentList.get(0);
        department.setName(departmentDto.getName());
        department.setMemo(departmentDto.getRemark());

        departmentRepository.save(department);
    }

    @Override
    @Transactional
    public void deleteDepartment(DepartmentDto departmentDto) {
        QDepartment qDepartment = QDepartment.department;
        jpaQueryFactory
                .delete(qDepartment)
                .where(qDepartment.id.eq(departmentDto.getId()))
                .execute();
    }
}
