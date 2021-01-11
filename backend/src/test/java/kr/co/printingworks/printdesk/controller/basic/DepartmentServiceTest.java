package kr.co.printingworks.printdesk.controller.basic;

import kr.co.printingworks.printdesk.service.basic.DepartmentService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class DepartmentServiceTest {
    @Autowired
    DepartmentService departmentService;

    @Test
    public void test() {
        String token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyTm8iOiJVMjEwMDA0MDIxMDEwNzAwMDE2IiwidXNlck5hbWUiOiJhZG1pbiIsImVtYWlsIjoid2pjaG9AcHJpbnRpbmd3b3Jrcy5jby5rciIsImNvbXBhbnlJZCI6MjEwMDA0MCwiaWF0IjoxNjEwMjQ3NjQ3LCJleHAiOjE2NDE3ODM2NDd9.OTzy_lG7kaf7ZHL0dmdkNEJwKt9WlEH3ZT3a1f0whak";
        departmentService.getDepartmentList(token);
    }
}
