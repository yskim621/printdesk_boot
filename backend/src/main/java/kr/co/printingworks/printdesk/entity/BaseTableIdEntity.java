package kr.co.printingworks.printdesk.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.MappedSuperclass;

@Getter
@Setter
@MappedSuperclass
@Inheritance(strategy = InheritanceType.JOINED)
public class BaseTableIdEntity extends AbstractTableIdEntity {
    @Column(length = 20)
    private String companyId;
}
