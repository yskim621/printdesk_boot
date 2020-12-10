package kr.co.printingworks.printdesk.entity;

import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import javax.persistence.Column;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.MappedSuperclass;
import java.io.Serializable;

@MappedSuperclass
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class AbstractEntity implements Serializable {

    @Getter@Setter
    @Column(nullable = false)
    private Long version = 0L;

    public abstract Object getId();

    public String toString()
    {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.MULTI_LINE_STYLE);
    }
}
