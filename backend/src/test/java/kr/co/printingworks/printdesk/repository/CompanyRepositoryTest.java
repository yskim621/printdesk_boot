package kr.co.printingworks.printdesk.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import kr.co.printingworks.printdesk.entity.sys.Company;
import kr.co.printingworks.printdesk.entity.sys.QCompany;
import kr.co.printingworks.printdesk.enumerate.*;
import kr.co.printingworks.printdesk.repo.CompanyRepository;
import kr.co.printingworks.printdesk.utils.DateTimeUtil;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Date;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.is;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class CompanyRepositoryTest {
    @Autowired
    CompanyRepository companyRepository;

    @Autowired
    JPAQueryFactory jpaQueryFactory;

    @Test
    public void 회사정보_등록_테스트() {
        Company company = new Company();
        company.setId(99L);
        company.setName("프린팅웍스");
        company.setAddress("서울시 마포구");
        company.setType(CompanyType.NORMAL);
        company.setLinkName("신형섭");
        company.setStandardCurrency(CurrencyType.KRW);
        company.setInitStep(InitStep.OVER);
        company.setIsFormal(BoolValue.YES);
        company.setTel("01093442795");
        company.setState(CompanyState.ONSALING);
        company.setRoleCountMax(10);
        company.setEmail("hsshin@printingworks.co.kr");
        company.setExpireTime(DateTimeUtil.addDate(new Date(), 15));

        companyRepository.save(company);

        QCompany qCompany = QCompany.company;
        List<Company> result = jpaQueryFactory
                .selectFrom(qCompany)
                .where(qCompany.id.eq(99L))
                .fetch();

        assertThat(result.get(0).getId(), is(equalTo(company.getId())));
        assertThat(result.get(0).getName(), is(equalTo(company.getName())));
    }

    @AfterAll
    public void afterAll() {
        companyRepository.deleteAll();
    }
}
