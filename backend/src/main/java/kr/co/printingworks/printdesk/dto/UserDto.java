package kr.co.printingworks.printdesk.dto;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor(staticName = "of") // UserDto.of(id, userName, ...)
public class UserDto {
    private Long id;
    private String userName;
    private String password;
    private String userNo;
    private String mobile;
    private String email;
    private CompanyDto companyDto;
    private String createName;
    private String updateName;
    private Date createTime;
    private Date updateTime;
}
