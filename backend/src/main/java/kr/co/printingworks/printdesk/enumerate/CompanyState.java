package kr.co.printingworks.printdesk.enumerate;

import lombok.Getter;
import lombok.Setter;

public enum CompanyState {
    CLOSED("닫기"),
    NOTOPEN("미개통"),
    ONSALING("정상"),
    PAUSE("정지");

    @Getter@Setter
    private String text;

    CompanyState(String text) {
        this.text = text;
    }
}
