package kr.co.printingworks.printdesk.service;

import kr.co.printingworks.printdesk.dto.LoginDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class AuthServiceTest {
    @Autowired
    AuthService authService;

    @Test
    public void test() {
        LoginDto loginDto = new LoginDto();
        loginDto.setUserName("admin");
        loginDto.setPassword("123456");
        authService.loginUser(loginDto);
    }
}
