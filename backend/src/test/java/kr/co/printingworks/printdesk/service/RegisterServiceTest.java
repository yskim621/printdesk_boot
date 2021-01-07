package kr.co.printingworks.printdesk.service;

import kr.co.printingworks.printdesk.dto.RegisterDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.equalTo;

// TODO: repository -> mockRepository 찾아보기
@SpringBootTest
public class RegisterServiceTest {
    @Autowired
    RegisterService registerService;

    String userName = "hsshin";

    @Test
    public void 사용자등록테스트() {
        RegisterDto registerDto = new RegisterDto();
        registerDto.setUserName(userName);
        registerDto.setPassword("123456");
        registerDto.setEmail("hsshin@printingworks.co.kr");
        registerDto.setIp("127.0.0.1");
        registerDto.setCompanyName("프린팅웍스");
        registerDto.setRepresentativeName("조완준");
        registerDto.setAddress("서울시 마포구");
        registerDto.setTaxBill("hsshin@printingworks.co.kr");
        registerDto.setManager("신형섭");
        registerDto.setTel("01093442795");

        registerService.register(registerDto);
    }

    @Test
    public void 아이디_중복_테스트() {
        boolean result = registerService.checkUserName(userName);
        assertThat(result, is(equalTo(false)));
    }
}
