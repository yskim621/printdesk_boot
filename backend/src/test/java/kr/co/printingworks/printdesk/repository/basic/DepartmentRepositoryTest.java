package kr.co.printingworks.printdesk.repository.basic;

import com.querydsl.jpa.impl.JPAQueryFactory;
import kr.co.printingworks.printdesk.entity.basic.Department;
import kr.co.printingworks.printdesk.entity.basic.QDepartment;
import kr.co.printingworks.printdesk.entity.sys.Company;
import kr.co.printingworks.printdesk.entity.sys.QCompany;
import kr.co.printingworks.printdesk.repo.basic.DepartmentRepository;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.equalTo;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class DepartmentRepositoryTest {
    @Autowired
    DepartmentRepository departmentRepository;

    @Autowired
    JPAQueryFactory jpaQueryFactory;

    Company company;
    QDepartment qDepartment = QDepartment.department;

    @BeforeEach
    public void setup() {
        QCompany qCompany = QCompany.company;
        List<Company> companyList = jpaQueryFactory
                .selectFrom(qCompany)
                .where(qCompany.id.eq(2100040L))
                .fetch();

        this.company = companyList.get(0);
    }

    @Test
    @Order(1)
    public void 부서_등록_테스트() {
        Department department1 = new Department();
        department1.setId(98L);
        department1.setSort(1);
        department1.setName("기업부설연구소");
        department1.setCompany(company);
        departmentRepository.save(department1);

        Department department2 = new Department();
        department2.setId(99L);
        department2.setSort(2);
        department2.setName("경영지원");
        department2.setCompany(company);
        departmentRepository.save(department2);
    }

    @Test
    @Order(2)
    public void 부서_전체목록_가져오기_테스트() {
        List<Department> departmentList = jpaQueryFactory
                .selectFrom(qDepartment)
                .where(qDepartment.company.eq(company))
                .fetch();

        assertThat(departmentList.size(), is(equalTo(2)));
    }

    @Test
    @Order(3)
    @Transactional
    public void 부서_삭제_테스트() {
        jpaQueryFactory
                .delete(qDepartment)
                .where(qDepartment.company.eq(company))
                .where(qDepartment.id.eq(99L))
                .execute();

        List<Department> departmentList = jpaQueryFactory
                .selectFrom(qDepartment)
                .where(qDepartment.company.eq(company))
                .fetch();

        assertThat(departmentList.size(), is(equalTo(1)));
        assertThat(departmentList.get(0).getId(), is(equalTo(98L)));
    }

    @Test
    @Order(4)
    @Transactional
    public void 부서_편집_테스트() {
        List<Department> departmentList = jpaQueryFactory
                .selectFrom(qDepartment)
                .where(qDepartment.company.eq(company))
                .where(qDepartment.id.eq(98L))
                .fetch();

        Department department = departmentList.get(0);

        jpaQueryFactory
                .update(qDepartment)
                .set(qDepartment.name, "개발팀")
                .where(qDepartment.eq(department))
                .execute();

        departmentList = jpaQueryFactory
                .selectFrom(qDepartment)
                .where(qDepartment.company.eq(company))
                .where(qDepartment.id.eq(98L))
                .where(qDepartment.name.eq("개발팀"))
                .fetch();

        assertThat(departmentList.size(), is(equalTo(1)));
    }

    @AfterAll
    public void afterAll() {
        departmentRepository.deleteAll();
    }
}
