package kr.co.printingworks.printdesk.entity.basic;

import com.fasterxml.jackson.annotation.JsonInclude;
import kr.co.printingworks.printdesk.entity.sys.Company;
import kr.co.printingworks.printdesk.entity.sys.User;
import kr.co.printingworks.printdesk.enumerate.EmployeeState;
import kr.co.printingworks.printdesk.enumerate.Gender;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.util.Date;

@Entity
@Setter
@Getter
@Table(name = "basic_employee")
@ToString
public class Employee {
    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String memo;

    @Column(nullable = false)
    private final Long version = 0L;

    private Integer sort;

    @ToString.Exclude
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Company company;

    @Column(length = 50) String code;
    @Column(length = 20) String name;
    @Column(length = 20) String mobile;

    @Column(length = 20)
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(length = 40) private String email;

    @ToString.Exclude
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "position_id")
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Position position;

    @ToString.Exclude
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Department department;

    @Column(length = 20)
    @Enumerated(EnumType.STRING)
    private EmployeeState state;

    private Date entryTime; // 입사일
    private Date departureTime; // 퇴사일
    @Column(length = 50) private String createName;
    @Column(length = 50) private String updateName;

    @CreatedDate
    @Column(updatable = false)
    private Date createTime;

    @LastModifiedDate
    private Date updateTime;

    @ToString.Exclude
    @OneToOne(mappedBy = "employee")
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private User user;
}
