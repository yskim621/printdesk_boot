package kr.co.printingworks.printdesk.service;

import kr.co.printingworks.printdesk.dto.RegisterDto;

public interface RegisterService {
    void register(RegisterDto registerDto);
    boolean checkUserName(String userName);
    boolean checkMobile(String mobile);
}
