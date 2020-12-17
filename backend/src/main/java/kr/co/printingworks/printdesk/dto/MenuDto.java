package kr.co.printingworks.printdesk.dto;

import kr.co.printingworks.printdesk.enumerate.BoolValue;
import kr.co.printingworks.printdesk.enumerate.PermissionType;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class MenuDto {
    private Long id;
    private String name;
    private PermissionType type;
    private String url;
    private String newIcon;
    private BoolValue refresh;
    private BoolValue isBase;
    private String identifier;
    private List<MenuDto> children;
}
