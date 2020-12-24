package kr.co.printingworks.printdesk.entity;

import kr.co.printingworks.printdesk.enumerate.*;
import lombok.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
//@Setter
@Builder(toBuilder = true)
@Table(name = "sys_company")
@NoArgsConstructor
@AllArgsConstructor
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Company extends AbstractEntity {
    @Id
    private String id;
    private String address;
    @Column(length = 20)
    private String city;
    private Date closeTime;
    @Column(length = 50)
    private String createName;
    private Date createTime;
    @Column(length = 20)
    private String linkman; // ????
    @Column(length = 20)
    private String name;
    @Column(length = 20)
    private String province;
    @Column(length = 20)
    private String serviceTel;
    @Column(length = 20)
    private String status;
    @Column(length = 20)
    @Enumerated(EnumType.STRING)
    private CompanyType type;
    @Column(length = 50)
    private String updateName;
    private Date updateTime;
    @Column(length = 30)
    private String linkName; // 담당자
    @Column(length = 50)
    @Enumerated(EnumType.STRING)
    private CurrencyType standardCurrency;
    private Date expireTime;
    @Column(length = 20)
    @Enumerated(EnumType.STRING)
    private InitStep initStep; // 초기화진행여부
    @Column(length = 20)
    private String county;
    @Column(length = 20)
    private String fax;
    @Column(length = 20)
    private String tel;
    @Column(length = 50)
    private String email;
    @Column(length = 20)
    @Enumerated(EnumType.STRING)
    private BoolValue isFormal; // 정식사용여부
    private String website;
    @Column(length = 50)
    private String weixin;
    private String introduction;
    @Column(length = 20)
    @Enumerated(EnumType.STRING)
    private CompanyState state;
    @Column(length = 50)
    private String contractCompanyName; // 계약회사명 ????
    private Date contractTime;

    // one to many
    private Long registerUserId;
    private Integer roleCountMax;
    private Long agentQuotientId;
    private String ids;
}
