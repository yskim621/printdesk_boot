package kr.co.printingworks.printdesk.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api
@RestController
@RequestMapping("api/v1/dashboard")
public class DashboardController {

    @ApiOperation(value = "menu")
    @PostMapping("menu")
    public ResponseEntity getMenu() {
        System.out.println("ddddd");
        return ResponseEntity.ok("ddd");
    }
}
