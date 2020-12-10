package kr.co.printingworks.printdesk.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import kr.co.printingworks.printdesk.dto.RegisterDto;
import kr.co.printingworks.printdesk.service.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

/**
 * 사용자 등록 컨트롤러
 * @param
 * @return
 * */
@Api
@RestController
@RequestMapping("api/v1/register")
public class RegisterController {
    @Autowired
    private RegisterService registerService;

    @ApiOperation(value = "user regist")
    @PostMapping(value = "register_submit", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> register(HttpServletRequest request, @RequestBody RegisterDto registerDto) {
        registerDto.setIp(request.getRemoteAddr());
        registerService.register(registerDto);
        return ResponseEntity.ok("success");
    }

    @ApiOperation(value = "username validation check")
    @GetMapping(value = "exist/userName/{userName}")
    public ResponseEntity<Boolean> checkUserName(@PathVariable String userName) {
        return ResponseEntity.ok(registerService.checkUserName(userName));
    }

    @ApiOperation(value = "mobile validation check")
    @GetMapping(value = "exist/mobile/{mobile}")
    public ResponseEntity<Boolean> checkMobile(@PathVariable String mobile) {
        return ResponseEntity.ok(registerService.checkMobile(mobile));
    }
}
