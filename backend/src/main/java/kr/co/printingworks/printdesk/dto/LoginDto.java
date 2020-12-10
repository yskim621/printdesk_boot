package kr.co.printingworks.printdesk.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor(staticName = "of")
public class LoginDto {
    String userName;
    String password;
    boolean autoLogin;
}
