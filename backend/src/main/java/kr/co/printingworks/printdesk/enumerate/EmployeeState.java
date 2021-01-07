package kr.co.printingworks.printdesk.enumerate;

import lombok.Getter;
import lombok.Setter;

public enum EmployeeState {
    NORMAL("정상"),

    HOLIDAY("휴가"),

    LEAVEJOB("퇴사");

    @Getter@Setter
    private String text;

    EmployeeState(String text)
    {
        this.text = text;
    }
}
