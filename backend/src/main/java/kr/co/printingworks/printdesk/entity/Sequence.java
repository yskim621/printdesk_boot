package kr.co.printingworks.printdesk.entity;

import kr.co.printingworks.printdesk.enumerate.ResetCycle;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "sys_sequence")
public class Sequence {
    @Id
    @Column(length = 100)
    private String name;
    private Long version;
    private Integer cacheCount;
    private String currentDateNode;
    @Column(length = 20)
    @Enumerated(EnumType.STRING)
    private ResetCycle cycle;
    private Long indexNum;
    private Long modMaxNum;
}
