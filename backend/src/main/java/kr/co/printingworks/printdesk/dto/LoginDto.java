package kr.co.printingworks.printdesk.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class LoginDto {
    String userName;
    String password;
}
