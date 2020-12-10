package kr.co.printingworks.printdesk.utils;

import java.text.DecimalFormat;

public class NumberUtil {
    public static String formatToStr(Long num, String format) {
        DecimalFormat df = new DecimalFormat(format);
        return df.format(num);
    }
}
