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
    @GeneratedValue(strategy = GenerationType.TABLE, generator = "TABLESEQ")
    @TableGenerator(name = "TABLESEQ", table = "TABLE_SEQUENCES", allocationSize = 100, pkColumnName = "TABLENAME", valueColumnName = "COUNTSEQ")
    private Long id;
    private String memo;

    @Column(nullable = false)
    private final Long version = 0L;

    private Integer sort;

    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "company_id")
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Company company;

    @Column(length = 50) private String code; // ?????????
    @Column(length = 50) private String name;

    @ToString.Exclude
    @OneToMany(mappedBy = "department", fetch = FetchType.LAZY)
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private List<Employee> employeeList;
}
