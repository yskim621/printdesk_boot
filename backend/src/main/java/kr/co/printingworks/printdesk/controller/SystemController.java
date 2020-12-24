package kr.co.printingworks.printdesk.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import kr.co.printingworks.printdesk.dto.CompanyDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api
@RestController
@RequestMapping("api/v1/sys")
public class SystemController {
    @ApiOperation(value = "get company list")
    @PostMapping(value = "/company/list")
    public ResponseEntity<List<CompanyDto>> getCompany() {
        System.out.println("dddddddd");
        return null;
    }
}
