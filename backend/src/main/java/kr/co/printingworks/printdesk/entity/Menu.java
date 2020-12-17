package kr.co.printingworks.printdesk.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import kr.co.printingworks.printdesk.enumerate.BoolValue;
import kr.co.printingworks.printdesk.enumerate.PermissionType;
import lombok.*;
import org.hibernate.annotations.Where;

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
    private String newIcon;
    private Integer sort;

    @Enumerated(EnumType.STRING)
    private BoolValue refresh;

    @Enumerated(EnumType.STRING)
    private BoolValue isBase;

    private String identifier;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Menu parent;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    @Where(clause = "type='MENU'")
    @OrderBy("sort asc")
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private List<Menu> children;

    @Override
    public boolean equals(Object obj) {
        return getId().equals(((Menu) obj).getId());
    }
}
