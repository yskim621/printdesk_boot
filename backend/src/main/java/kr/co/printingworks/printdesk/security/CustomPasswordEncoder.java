package kr.co.printingworks.printdesk.security;

import kr.co.printingworks.printdesk.utils.UserUtils;
import org.springframework.security.crypto.password.PasswordEncoder;

public class CustomPasswordEncoder implements PasswordEncoder {
    @Override
    public String encode(CharSequence rawPassword) {
        return UserUtils.encryptPassword(rawPassword.toString());
    }

    @Override
    public boolean matches(CharSequence rawPassword, String encodedPassword) {
        return UserUtils.validatePassword(rawPassword.toString(), encodedPassword);
    }
}
