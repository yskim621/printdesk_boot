package kr.co.printingworks.printdesk.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import kr.co.printingworks.printdesk.dto.basic.DepartmentDto;
import kr.co.printingworks.printdesk.service.basic.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@Api
@RestController
@RequestMapping("api/v1/basic")
public class BasicController {
    @Autowired
    DepartmentService departmentService;

    @ApiOperation(value = "get department list")
    @GetMapping("department/list")
    public ResponseEntity<?> getDepartmentList(@ApiIgnore @RequestHeader String authorization) {
        List<DepartmentDto> departmentDtoList = departmentService.getDepartmentList(authorization);
        return ResponseEntity.ok(departmentDtoList);
    }

    @ApiOperation(value = "add department")
    @PostMapping("department/save")
    public ResponseEntity<?> addDepartment(
            @ApiIgnore @RequestHeader String authorization,
            @RequestBody DepartmentDto departmentDto) {
        departmentService.addDepartment(authorization, departmentDto);
        return ResponseEntity.ok(null);
    }

    @ApiOperation(value = "update department")
    @PutMapping("department/update")
    public ResponseEntity<?> updateDepartment(@RequestBody DepartmentDto departmentDto) {
        departmentService.updateDepartment(departmentDto);
        return ResponseEntity.ok(null);
    }

    @ApiOperation(value = "delete department")
    @DeleteMapping("department/delete")
    public ResponseEntity<?> deleteDepartment(@RequestBody DepartmentDto departmentDto) {
        departmentService.deleteDepartment(departmentDto);
        return ResponseEntity.ok(null);
    }
}
