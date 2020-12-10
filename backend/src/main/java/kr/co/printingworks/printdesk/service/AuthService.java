package kr.co.printingworks.printdesk.service;

import kr.co.printingworks.printdesk.dto.LoginDto;

import java.util.Map;

public interface AuthService {
    Map<String, Object> loginUser(LoginDto loginDto);
}
