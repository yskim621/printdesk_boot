package kr.co.printingworks.printdesk.service.impl;

import com.querydsl.jpa.impl.JPAQueryFactory;
import kr.co.printingworks.printdesk.dto.LoginDto;
import kr.co.printingworks.printdesk.dto.UserDto;
import kr.co.printingworks.printdesk.entity.sys.QUser;
import kr.co.printingworks.printdesk.entity.sys.User;
import kr.co.printingworks.printdesk.mapper.UserMapper;
import kr.co.printingworks.printdesk.repo.UserRepository;
import kr.co.printingworks.printdesk.service.AuthService;
import kr.co.printingworks.printdesk.security.JwtTokenProvider;
import kr.co.printingworks.printdesk.utils.UserUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AuthServiceImpl implements AuthService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    JPAQueryFactory jpaQueryFactory;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Override
    @Transactional
    public Map<String, Object> loginUser(LoginDto loginDto) {
        QUser qUser = QUser.user;
        List<User> userList = jpaQueryFactory
                .selectFrom(qUser)
                .where(qUser.userName.eq(loginDto.getUserName()))
                .fetch();
        Map<String, Object> map = new HashMap<>();
        User user = userList.get(0);

        if (user == null) {
            map.put("statusCode", 400);
        } else {
            // TODO: 로그인 성공, 실패시 시스템일지테이블에 기록되어야됨.
            if (!UserUtils.validatePassword(loginDto.getPassword(), user.getPassword())) {
                jpaQueryFactory
                        .update(qUser)
                        .where(qUser.id.eq(user.getId()))
                        .set(qUser.loginErrorCount, user.getLoginErrorCount() + 1)
                        .execute();
                map.put("statusCode", 400);
            } else {
                jpaQueryFactory
                        .update(qUser)
                        .where(qUser.id.eq(user.getId()))
                        .set(qUser.loginCount, user.getLoginCount() + 1)
                        .set(qUser.lastLoginTime, new Date())
                        .execute();

                UserDto userDto = UserMapper.INSTANCE.toDto(user);
                map.put("statusCode", 200);
                map.put("token", createToken(userDto));
            }
        }
        return map;
    }

    private String createToken(UserDto userDto) {
        return jwtTokenProvider.createToken(userDto);
    }
}
