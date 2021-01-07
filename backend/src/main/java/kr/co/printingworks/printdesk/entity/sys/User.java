package kr.co.printingworks.printdesk.entity.sys;

import com.fasterxml.jackson.annotation.JsonInclude;
import kr.co.printingworks.printdesk.entity.basic.Employee;
import kr.co.printingworks.printdesk.enumerate.State;
import kr.co.printingworks.printdesk.enumerate.UserSource;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "sys_user")
@ToString
@EntityListeners(AuditingEntityListener.class)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE, generator = "TABLESEQ")
    @TableGenerator(name = "TABLESEQ", table = "TABLE_SEQUENCES", allocationSize = 100, pkColumnName = "TABLENAME", valueColumnName = "COUNTSEQ")
    private Long id;
    private String memo;

    @Column(nullable = false)
    private final Long version = 0L;

    @Column(length = 50) private String userNo;

    @Column(length = 30, unique = true) private String userName; // 로그인 id
    private String password; // 로그인 비밀번호
    @Column(length = 20, unique = true) private String mobile; // ??
    @Column(length = 20) private String phone; // ??
    @Column(length = 30) private String email;
    @Column(length = 20) private String realName; // 사원이름인데 사원 id로 참조하기때문에 필요없음

//    @Builder.Default
    @Column(length = 10)
    @Enumerated(EnumType.STRING)
    private final State state = State.NORMAL;

    @Column(length = 10)
    @Enumerated(EnumType.STRING)
    private UserSource resource; // ??

    private String lastLoginIp;
    private Date lastLoginTime; // 최근 접속일

    private final Integer loginCount = 0; // 로그인 횟수
    private final Integer loginErrorCount = 0; // 로그인 실패 횟수
    @Column(length = 50) private String createName; // 계정 생성한 사람의 계정(환경설정 > 사용자관리 > 계정추가 할 당시 로그인한 사용자)
    @Column(length = 50) private String updateName;

    @CreatedDate
    @Column(updatable = false)
    private Date createTime;

//    @LastModifiedDate
    private Date updateTime;

    @OneToOne(mappedBy = "registerUser")
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Company companyOfRegisterUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Company company;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id")
    private Employee employee;
}
