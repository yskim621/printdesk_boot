package kr.co.printingworks.printdesk.enumerate;

import lombok.Getter;
import lombok.Setter;

public enum CurrencyType {
    RMB("rmb", "위안", 1),
    USD("usd", "달러", 2),
    GBP("gbp", "파운드", 3),
    ERU("eru", "유로", 4),
    HKD("hkd", "홍콩달러", 5),
    JPY("jpy", "엔화", 7),
    KRW("krw", "원", 6);

    @Getter@Setter
    private String value;
    @Getter@Setter
    private String text;
    @Getter@Setter
    private int sort;

    CurrencyType(String value, String text, int sort) {
        this.value = value;
        this.text = text;
        this.sort = sort;
    }
}
