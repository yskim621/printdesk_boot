package kr.co.printingworks.printdesk.security;

import kr.co.printingworks.printdesk.entity.sys.User;
import kr.co.printingworks.printdesk.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUserName(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with username : " + username)
                );

        return UserPrincipal.create(user);
    }

    @Transactional
    public UserDetails loadUserByUserNo(String userNo) {
        User user = userRepository.findByUserNo(userNo).orElseThrow(
                () -> new UsernameNotFoundException("User not found with userNo : " + userNo)
        );

        return UserPrincipal.create(user);
    }
}
