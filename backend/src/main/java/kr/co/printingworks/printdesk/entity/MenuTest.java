package kr.co.printingworks.printdesk.entity;

import kr.co.printingworks.printdesk.enumerate.PermissionType;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "menu_test")
@Getter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "parent")
public class MenuTest {
    @Id
    @Column(name = "id")
    private Long id;

    private String menuName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private MenuTest parent;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    @OrderBy("sort asc")
    private List<MenuTest> children;

    private int sort;

    @Enumerated(EnumType.STRING)
    private PermissionType type;
}
