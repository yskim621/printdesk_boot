package kr.co.printingworks.printdesk.enumerate;

import lombok.Getter;
import lombok.Setter;

public enum InitStep {
    INIT_COMPANY("회사정보"),
    INIT_BASIC("기본설정"),
    OVER("완료");

    @Getter@Setter
    private String text;

    InitStep(String text) {
        this.text = text;
    }
}
