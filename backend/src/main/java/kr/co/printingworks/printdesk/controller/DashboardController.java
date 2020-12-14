package kr.co.printingworks.printdesk.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import kr.co.printingworks.printdesk.dto.MenuTestDto;
import kr.co.printingworks.printdesk.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api
@RestController
@RequestMapping("api/v1/dashboard")
public class DashboardController {
    @Autowired
    MenuService menuService;

    @ApiOperation(value = "get menu list")
    @PostMapping("menu")
    public ResponseEntity<List<MenuTestDto>> getMenuTest() {
        return ResponseEntity.ok(menuService.getMenuTest());
    }
}
