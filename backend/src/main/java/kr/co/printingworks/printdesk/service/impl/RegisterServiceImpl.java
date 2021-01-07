package kr.co.printingworks.printdesk.service.impl;

import kr.co.printingworks.printdesk.dto.RegisterDto;
import kr.co.printingworks.printdesk.entity.sys.Company;
import kr.co.printingworks.printdesk.entity.sys.User;
import kr.co.printingworks.printdesk.enumerate.*;
import kr.co.printingworks.printdesk.mapper.UserMapper;
import kr.co.printingworks.printdesk.repo.CompanyRepository;
import kr.co.printingworks.printdesk.repo.UserRepository;
import kr.co.printingworks.printdesk.service.RegisterService;
import kr.co.printingworks.printdesk.utils.DateTimeUtil;
import kr.co.printingworks.printdesk.utils.UserUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;

@Service
@PropertySource("classpath:constants.yml")
public class RegisterServiceImpl implements RegisterService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    CompanyRepository companyRepository;

    @Value("${company-tryday-num}")
    Integer companyTrydayNum;

    @Override
    public void register(RegisterDto registerDto) {
        String plainPassword = registerDto.getPassword();
        String password = UserUtils.encryptPassword(plainPassword);
        registerDto.setPassword(password);

        // TODO: 사업자 등록번호, 대표자명, 업태, 업종 컬럼 추가하면되는지 물어보기
        Company company = new Company();
        company.setId(Long.parseLong(UserUtils.createCompanyId()));
        company.setExpireTime(DateTimeUtil.addDate(new Date(), companyTrydayNum));
        company.setCreateTime(new Date());
        company.setState(CompanyState.ONSALING); // TODO: state에 업태 넣으면되는지 물어보고 맞으면 셀렉트박스로 바꿀지 물어보기
        company.setIsFormal(BoolValue.NO);
        company.setStandardCurrency(CurrencyType.RMB);
        company.setType(CompanyType.NORMAL);
        company.setTel(registerDto.getTel());
        company.setAddress(registerDto.getAddress());
        company.setLinkName(registerDto.getManager());
        company.setName(registerDto.getCompanyName());
        company.setEmail(registerDto.getTaxBill());

        companyRepository.save(company);

        User user = UserMapper.INSTANCE.toEntity(registerDto);
        user.setCompany(company);
        user.setUserNo(UserUtils.createUserNo(company.getId() + ""));

        userRepository.save(user);

        company.setRegisterUser(user);
        company.setCreateName(user.getUserName());

        companyRepository.save(company);
    }

    @Override
    public boolean checkUserName(String userName) {
        User user = userRepository.findByUserName(userName);
        return user == null;
    }

    @Override
    public boolean checkMobile(String mobile) {
        User user = userRepository.findByMobile(mobile);
        return user == null;
    }
}
