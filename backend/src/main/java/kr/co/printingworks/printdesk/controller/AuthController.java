package kr.co.printingworks.printdesk.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import kr.co.printingworks.printdesk.dto.LoginDto;
import kr.co.printingworks.printdesk.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * 사용자 인증 컨트롤러러
 * @param
 * @return
 * */
@Api
@RestController
@RequestMapping("api/v1/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    /**
     * 로그인 요청
     * */
    @ApiOperation(value = "request login")
    @PostMapping(value = "/login", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> login(@RequestBody LoginDto loginDto) {
        Map<String, Object> responseMap = authService.loginUser(loginDto);

        if ((int)responseMap.get("statusCode") == 400) {
            return new ResponseEntity<>("", HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(responseMap.get("token"), HttpStatus.OK);
        }
    }
}
