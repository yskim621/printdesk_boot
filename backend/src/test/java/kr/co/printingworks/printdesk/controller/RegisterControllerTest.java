package kr.co.printingworks.printdesk.controller;

import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

// TODO: service -> mockService로 바꿔서 테스트하는방법 찾기
@SpringBootTest
@ExtendWith(SpringExtension.class)
public class RegisterControllerTest {

    MockMvc mockMvc;

    @Autowired
    private WebApplicationContext context;

    @BeforeEach
    void setup() {
        mockMvc = MockMvcBuilders
                .webAppContextSetup(context)
                .addFilters(new CharacterEncodingFilter("UTF-8", true))
                .build();
    }

    @Test
    public void login() throws Exception {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("userName", "admin")
                .put("password", "123456")
                .put("email", "hsshin@printingworks.co.kr")
                .put("companyName", "프린팅웍스")
                .put("companyNumber", "")
                .put("representativeName", "조완준")
                .put("businessCondition", "")
                .put("sectors", "")
                .put("address", "서울시 마포구")
                .put("taxBill", "help@printingworks.co.kr")
                .put("manager", "신형섭")
                .put("tel", "0264550216");

        String requestParam = jsonObject.toString();

        mockMvc.perform(
                    post("/api/v1/register/register_submit")
                            .content(requestParam)
                            .contentType(MediaType.APPLICATION_JSON_VALUE)
                )
                .andExpect(status().isOk())
                .andDo(print());
    }
}
