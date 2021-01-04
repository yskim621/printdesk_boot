package kr.co.printingworks.printdesk.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api
@RestController
@RequestMapping("api/v1/basic")
public class BasicController {
    @ApiOperation(value = "get department list")
    @PostMapping("department/list")
    public ResponseEntity getDepartmentList(@RequestHeader String authorization) {
        System.out.println(authorization);
        return ResponseEntity.ok(null);
    }
}
