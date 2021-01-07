package kr.co.printingworks.printdesk.entity.basic;

import com.fasterxml.jackson.annotation.JsonInclude;
import kr.co.printingworks.printdesk.entity.sys.Company;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "basic_position")
@ToString
public class Position {
    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String memo;

    @Column(nullable = false)
    private final Long version = 0L;

    private Integer sort;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Company company;

    @Column(length = 50) private String code;
    @Column(length = 50) private String name;

    @OneToMany(mappedBy = "position", fetch = FetchType.LAZY)
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private List<Employee> employeeList;
}
