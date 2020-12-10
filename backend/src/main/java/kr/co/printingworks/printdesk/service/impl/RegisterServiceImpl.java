package kr.co.printingworks.printdesk.service.impl;

import kr.co.printingworks.printdesk.dto.RegisterDto;
import kr.co.printingworks.printdesk.entity.Company;
import kr.co.printingworks.printdesk.entity.User;
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
        System.out.println(registerDto);
//        String plainPassword = registerDto.getPassword();
//        String password = UserUtils.encryptPassword(plainPassword);
//        registerDto.setPassword(password);
//
//        User user = UserMapper.INSTANCE.toEntity(registerDto);
//
//        Company company = new Company();
//        company.setId(UserUtils.createCompanyId());
//        company.setExpireTime(DateTimeUtil.addDate(new Date(), companyTrydayNum));
//        company.setCreateTime(new Date());
//        company.setState(CompanyState.ONSALING);
//        company.setIsFormal(BoolValue.NO);
//        company.setInitStep(InitStep.INIT_COMPANY);
//        company.setStandardCurrency(CurrencyType.RMB);
//        company.setType(CompanyType.NORMAL);
//        company.setTel(registerDto.getMobile());
//        company = companyRepository.save(company);
//
//        user.setCompanyId(company.getId());
//        user.setUserNo(UserUtils.createUserNo(company.getId()));
//
//        userRepository.save(user);
//
//        company = companyRepository.findById(company.getId());
//        company.setRegisterUserId(user.getId());
//        company.setCreateName(user.getUserName());
//        companyRepository.save(company);
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
