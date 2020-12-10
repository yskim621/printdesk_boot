package kr.co.printingworks.printdesk.enumerate;

public enum State {
    NORMAL("정상"), CLOSED("정지");

    private String text;

    State(String text) {
        this.text = text;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
