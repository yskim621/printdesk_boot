package kr.co.printingworks.printdesk.entity.basic;

import com.fasterxml.jackson.annotation.JsonInclude;
import kr.co.printingworks.printdesk.entity.sys.Company;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Setter
@Getter
@Table(name = "basic_department")
@ToString
public class Department {
    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String memo;

    @Builder.Default
    @Column(nullable = false)
    private final Long version = 0L;

    private Integer sort;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Company company;

    @Column(length = 50) private String code; // ?????????
    @Column(length = 50) private String name;

    @OneToMany(mappedBy = "department", fetch = FetchType.LAZY)
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private List<Employee> employeeList;
}
