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
public class BaseUserTableIdEntity extends BaseTableIdEntity {
    @Column(length = 50)
    private String userNo;
}
