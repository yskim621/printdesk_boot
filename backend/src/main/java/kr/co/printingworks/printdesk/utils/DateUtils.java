package kr.co.printingworks.printdesk.utils;

import org.apache.commons.lang3.time.DateFormatUtils;

import java.util.Date;

public class DateUtils {
    public static String formatDate(Date date, Object... pattern) {
        String formatDate = null;
        if (pattern != null && pattern.length > 0) {
            formatDate = DateFormatUtils.format(date, pattern[0].toString());
        } else {
            formatDate = DateFormatUtils.format(date, "yyyy-MM-dd");
        }
        return formatDate;
    }
}
