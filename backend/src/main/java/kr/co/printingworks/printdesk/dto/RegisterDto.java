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
    private String mobile;
    private String password;
    private String validCode;
    private String ip;
    private String email;
}
