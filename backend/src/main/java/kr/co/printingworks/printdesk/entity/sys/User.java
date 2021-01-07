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

    @Column(length = 10)
    @Enumerated(EnumType.STRING)
    private final State state = State.NORMAL;

    @Column(length = 10)
    @Enumerated(EnumType.STRING)
    private UserSource resource; // ??

    private String lastLoginIp;
    private Date lastLoginTime; // 최근 접속일

    private Integer loginCount; // 로그인 횟수
    private Integer loginErrorCount; // 로그인 실패 횟수
    @Column(length = 50) private String createName; // 해당계정 생성한 사람의 계정명
    @Column(length = 50) private String updateName; // 해당계정 수정한 사람의 계정명

    @CreatedDate
    @Column(updatable = false)
    private Date createTime;

//    @LastModifiedDate
    private Date updateTime;

    @ToString.Exclude
    @OneToOne(mappedBy = "registerUser", fetch = FetchType.LAZY)
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Company companyOfRegisterUser;

    @ToString.Exclude
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Company company;

    @ToString.Exclude
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id")
    private Employee employee;
}
