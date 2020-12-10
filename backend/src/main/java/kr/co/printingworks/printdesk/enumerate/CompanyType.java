package kr.co.printingworks.printdesk.enumerate;

public enum CompanyType {
    NORMAL("일반공장");

    private String text;

    CompanyType(String text) {
        this.text = text;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
