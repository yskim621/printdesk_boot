package kr.co.printingworks.printdesk.dto;

import lombok.*;

@Getter
@Setter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RegisterDto {
    private String userName;
    private String password;
    private String ip;
    private String email;

    private String companyName; // 업체명
    private String companyNumber; // 사업자 등록번호
    private String representativeName;
    private String businessCondition;
    private String sectors;
    private String address;
    private String taxBill;
    private String manager;
    private String tel;
}
