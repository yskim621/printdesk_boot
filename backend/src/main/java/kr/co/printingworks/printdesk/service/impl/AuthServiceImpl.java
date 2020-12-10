package kr.co.printingworks.printdesk.service.impl;

import kr.co.printingworks.printdesk.dto.LoginDto;
import kr.co.printingworks.printdesk.dto.UserDto;
import kr.co.printingworks.printdesk.entity.User;
import kr.co.printingworks.printdesk.mapper.UserMapper;
import kr.co.printingworks.printdesk.repo.UserRepository;
import kr.co.printingworks.printdesk.service.AuthService;
import kr.co.printingworks.printdesk.utils.JwtTokenProvider;
import kr.co.printingworks.printdesk.utils.UserUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthServiceImpl implements AuthService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Override
    public Map<String, Object> loginUser(LoginDto loginDto) {
        User user = userRepository.findByUserName(loginDto.getUserName());
        UserDto userDto = UserMapper.INSTANCE.toDto(user);

        Map<String, Object> map = new HashMap<>();
        if (user == null || !UserUtils.validatePassword(loginDto.getPassword(), userDto.getPassword())) {
            map.put("statusCode", 400);
        } else {
            map.put("statusCode", 200);
            map.put("token", createToken(userDto));
        }
        return map;
    }

    private String createToken(UserDto userDto) {
        return jwtTokenProvider.createToken(userDto);
    }
}
