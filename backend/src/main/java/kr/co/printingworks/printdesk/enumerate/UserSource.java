package kr.co.printingworks.printdesk.enumerate;

public enum UserSource {
    WEB("WEB회원가입"), MOBILE("핸드폰회원가입"), INNER("내부추가");

    private String text;

    UserSource(String text) {
        this.text = text;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
