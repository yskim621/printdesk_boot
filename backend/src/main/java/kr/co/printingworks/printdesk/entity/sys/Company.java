package kr.co.printingworks.printdesk.entity.sys;

import com.fasterxml.jackson.annotation.JsonInclude;
import kr.co.printingworks.printdesk.entity.basic.Department;
import kr.co.printingworks.printdesk.entity.basic.Employee;
import kr.co.printingworks.printdesk.entity.basic.Position;
import kr.co.printingworks.printdesk.enumerate.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "sys_company")
@ToString
@EntityListeners(AuditingEntityListener.class)
public class Company {
    @Id private Long id;

    @Column(nullable = false)
    private final Long version = 0L;

    private String address; // 환경설정 > 회사관리 > 회사주소
    @Column(length = 20) private String city; // ex) 선전시
    private Date closeTime; // ??
    @CreatedDate private Date createTime; // 가입일
    @Column(length = 20) private String linkman; // ??
    @Column(length = 20) String name; // 업체명
    @Column(length = 20) String province; // (행정단위)주[도] ex) 광둥
    @Column(length = 20) String serviceTel; // ??
    @Column(length = 20) String status; // ??

    @Column(length = 20)
    @Enumerated(EnumType.STRING)
    private CompanyType type;

    @Column(length = 50) private String createName; // ??
    @Column(length = 50) private String updateName; // 환경설정 > 회사관리 > 편집한 계정 id
    private Date updateTime; // 환경설정 > 회사관리 > 편집한 날짜
    @Column(length = 30) private String linkName; // 담당자

    @Column(length = 50)
    @Enumerated(EnumType.STRING)
    private CurrencyType standardCurrency; // 화폐 단위

    private Date expireTime; // 만기일자

    @Column(length = 20)
    @Enumerated(EnumType.STRING)
    private InitStep initStep; // 초기화진행여부

    @Column(length = 20) private String county; // 자치주[군]
    @Column(length = 20) private String fax; // 환경설정 > 회사관리 > 편집 > 회사팩스
    @Column(length = 20) private String tel; // 담당자 번호
    // TODO: 세금계산서 발행용 이메일주소로 변경
    @Column(length = 50) private String email; // 환경설정 > 회사관리 > 편집 > 회사메일

    @Column(length = 20)
    @Enumerated(EnumType.STRING)
    private BoolValue isFormal; // 정식사용여부

    private String website; // 환경설정 > 회사관리 > 편집 > 홈페이지
    @Column(length = 50) private String weixin; // 환경설정 > 회사관리 > 편집 > 위쳇번호
    private String introduction; // 환경설정 > 회사관리 > 편집 > 회사소개

    @Column(length = 20)
    @Enumerated(EnumType.STRING)
    private CompanyState state; // ??

    // TODO: 계약회사가 뭔지 알아내야됨.
    @Column(length = 50) private String contractCompanyName; // 계약회사명
    private Date contractTime; // 계약일??

    private Integer roleCountMax; // 환경설정 > 역활관리 > 역할 추가할수 있는 최대 갯수

    @OneToOne
    @JoinColumn(name = "register_user_id")
    private User registerUser;

    @ToString.Exclude
    @OneToMany(mappedBy = "company", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private List<User> userList;

//    private Long agentQuotientId; => ??
    private String ids;

    @ToString.Exclude
    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private List<Department> departmentList;

    @ToString.Exclude
    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private List<Position> positionList;

    @ToString.Exclude
    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private List<Employee> employeeList;
}
