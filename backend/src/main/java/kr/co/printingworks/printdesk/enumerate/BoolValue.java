package kr.co.printingworks.printdesk.enumerate;

import lombok.Getter;
import lombok.Setter;

public enum BoolValue {
    YES("YES", true),
    NO("NO", false);

    @Getter@Setter
    private String text;
    @Getter@Setter
    private Boolean value;

    BoolValue(String text, Boolean value) {
        this.text = text;
        this.value = value;
    }

    public static BoolValue valueOf(boolean value) {
        if (value) {
            return BoolValue.YES;
        } else {
            return BoolValue.NO;
        }
    }
}
