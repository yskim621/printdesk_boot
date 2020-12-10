package kr.co.printingworks.printdesk.enumerate;

public enum PermissionType {
    MENU("메뉴"), FUNCTION("기능");

    private String text;

    PermissionType(String text) { this.text = text; }

    public String getText() { return text; }

    public void setText(String text) { this.text = text; }
}
