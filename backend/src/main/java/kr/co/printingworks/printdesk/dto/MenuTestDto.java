package kr.co.printingworks.printdesk.dto;

import kr.co.printingworks.printdesk.enumerate.PermissionType;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class MenuTestDto {
    Long id;
    String menuName;
    List<MenuTestDto> children;
    int sort;
    PermissionType type;
}
