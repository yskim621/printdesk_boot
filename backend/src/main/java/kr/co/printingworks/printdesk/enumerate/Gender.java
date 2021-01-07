package kr.co.printingworks.printdesk.enumerate;

import lombok.Getter;
import lombok.Setter;

public enum Gender {
    MAN("남"),

    WOMAN("여"),

    UNKOWN("미상");

    @Getter@Setter
    private String text;

    Gender(String text) {
        this.text = text;
    }
}
