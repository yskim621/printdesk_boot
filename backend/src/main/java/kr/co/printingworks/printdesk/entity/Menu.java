package kr.co.printingworks.printdesk.entity;

import kr.co.printingworks.printdesk.enumerate.BoolValue;
import kr.co.printingworks.printdesk.enumerate.PermissionType;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "sys_menu")
@ToString(exclude = "parent")
public class Menu extends AbstractEntity {
    @Id
    private Long id;

    @Column(length = 50)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(length = 10, nullable = false)
    private PermissionType type;

    private String url;
    private String icon;
    private Integer sort;

    @Enumerated(EnumType.STRING)
    private BoolValue refresh;

    @Enumerated(EnumType.STRING)
    private BoolValue isBase;

    private String identifier;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Menu parent;

    @OneToMany(mappedBy = "parent")
    private List<Menu> children;

    @Override
    public boolean equals(Object obj) {
        return getId().equals(((Menu) obj).getId());
    }
}
