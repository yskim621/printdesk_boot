package kr.co.printingworks.printdesk.entity;

import kr.co.printingworks.printdesk.enumerate.State;
import kr.co.printingworks.printdesk.enumerate.UserSource;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Table(name = "sys_user")
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class User extends BaseUserTableIdEntity implements AuditedEntity {
    @Column(length = 50)
    private String userNo;

    @Column(length = 30, unique = true)
    private String userName; // 로그인할때 입력하는 아이디

    private String password;

    @Column(length = 20, unique = true)
    private String mobile;

    @Column(length = 20)
    private String phone;

    @Column(length = 30)
    private String email;

    @Column(length = 20)
    private String companyId;

    private Long employeeId;

    @Column(length = 20)
    private String realName;

    @Column(length = 10, columnDefinition = "varchar(10) default 'NORMAL'")
//    @Column(length = 10)
    @Enumerated(EnumType.STRING)
    private State state = State.NORMAL;

    @Column(length = 10)
    @Enumerated(EnumType.STRING)
    private UserSource resource;

    private String lastLoginIp;

    private Date LastLoginTime;

    @Column(columnDefinition = "integer default 1")
    private Integer loginCount;

    @Column(columnDefinition = "integer default 0")
    private Integer loginErrCount;

    @Column(length = 50)
    private String createName; // 사용자명(닉네임같은거인듯??)

    @Column(length = 50)
    private String updateName;

    @CreatedDate
    @Column(updatable = false)
    private Date createTime;

    @LastModifiedDate
    private Date updateTime;

//    @Transient
//    private Company company;
}
