package kr.co.printingworks.printdesk.enumerate;

import kr.co.printingworks.printdesk.utils.DateTimeUtil;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

public enum ResetCycle {
    YEAR("년"),
    MONTH("월"),
    DAY("일"),
    NERVER("NERVER");

    @Getter@Setter
    private String text;

    ResetCycle(String text) {
        this.text = text;
    }

    public String getCurrentDateNode() {
        if (this == ResetCycle.YEAR) {
            return DateTimeUtil.formatToStr(new Date(), "yyyy");
        } else if (this == ResetCycle.MONTH) {
            return DateTimeUtil.formatToStr(new Date(), "yyyy-MM");
        } else if (this == ResetCycle.DAY) {
            return DateTimeUtil.formatToStr(new Date(), "yyyy-MM-dd");
        } else {
            return "0";
        }
    }
}
