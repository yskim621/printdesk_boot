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
    @Transactional
    public void register(RegisterDto registerDto) {
        String plainPassword = registerDto.getPassword();
        String password = UserUtils.encryptPassword(plainPassword);
        registerDto.setPassword(password);

        User user = UserMapper.INSTANCE.toEntity(registerDto);

        // registerDto -> companyNumber(사업자 등록번호), representativeName(대표자명), businessCondition(업태), sectors(업종)
        Company company = Company.builder()
                .id(UserUtils.createCompanyId())
                .expireTime(DateTimeUtil.addDate(new Date(), companyTrydayNum))
                .createTime(new Date())
                .state(CompanyState.ONSALING)
                .isFormal(BoolValue.NO)
                .standardCurrency(CurrencyType.RMB)
                .type(CompanyType.NORMAL) // 유형
                .tel(registerDto.getTel())
                .address(registerDto.getAddress())
                .linkName(registerDto.getManager())
                .name(registerDto.getCompanyName())
                .email(registerDto.getTaxBill())
                .build();
        company = companyRepository.save(company);

        user = user.toBuilder()
                .companyId(company.getId())
                .userNo(UserUtils.createUserNo(company.getId()))
                .build();

        userRepository.save(user);

        company = companyRepository.findById(company.getId());
        company = company.toBuilder()
                .registerUserId(user.getId())
                .createName(user.getUserName())
                .build();
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
