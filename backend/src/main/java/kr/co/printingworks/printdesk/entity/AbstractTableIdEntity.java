package kr.co.printingworks.printdesk.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@MappedSuperclass
@Inheritance(strategy = InheritanceType.JOINED)
public class AbstractTableIdEntity extends AbstractEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE, generator = "TABLESEQ")
    @TableGenerator(name = "TABLESEQ", table = "TABLE_SEQUENCES", allocationSize = 100, pkColumnName = "TABLENAME", valueColumnName = "COUNTSEQ")
    private Long id;

    private String memo;
}
