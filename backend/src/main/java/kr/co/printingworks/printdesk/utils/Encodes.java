package kr.co.printingworks.printdesk.utils;

import org.apache.commons.codec.DecoderException;
import org.apache.commons.codec.binary.Hex;
import org.apache.commons.text.StringEscapeUtils;

public class Encodes {
    public static String unescapeHtml(String htmlEscaped) {
        return StringEscapeUtils.unescapeHtml4(htmlEscaped);
    }

    public static String encodeHex(byte[] input) {
        return new String(Hex.encodeHex(input));
    }

    public static byte[] decodeHex(String input) {
        try {
            return Hex.decodeHex(input.toCharArray());
        } catch (DecoderException e) {
            throw Exceptions.unchecked(e);
        }
    }
}
