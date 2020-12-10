package kr.co.printingworks.printdesk.entity;

import java.io.Serializable;

public interface AuditedEntity extends Serializable {
    public Object getId();
}
