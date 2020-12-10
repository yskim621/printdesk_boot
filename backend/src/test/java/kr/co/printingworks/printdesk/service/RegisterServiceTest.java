package kr.co.printingworks.printdesk.service;

import kr.co.printingworks.printdesk.dto.RegisterDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class RegisterServiceTest {
    @Autowired
    RegisterService registerService;

    @Test
    public void 사용자등록테스트() {
        RegisterDto registerDto = RegisterDto.builder()
                .userName("hsshin2")
                .password("123456")
                .mobile("8201093442796")
                .ip("0.0.0.0")
                .validCode("1234")
                .email("hsshin@printingworks.co.kr")
                .build();

        registerService.register(registerDto);
    }

//    @Test
    public void 사용자명중복검사() {
        boolean validUserName = registerService.checkUserName("admin");
        System.out.println(validUserName);
    }

//    @Test
    public void 휴대폰번호중복검사() {
        boolean validMobile = registerService.checkMobile("1234");
        System.out.println(validMobile);
    }
}
