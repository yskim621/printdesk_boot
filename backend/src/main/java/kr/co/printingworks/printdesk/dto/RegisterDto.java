package kr.co.printingworks.printdesk.dto;

import lombok.*;

@Getter
@Setter
@ToString
public class RegisterDto {
    private String userName;
    private String password;
    private String ip;
    private String email;

    private String companyName; // 업체명
    private String companyNumber; // 사업자 등록번호
    private String representativeName; // 대표자명
    // TODO: select box로 만드는거 어떤지 물어보기
    private String businessCondition; // 업태
    private String sectors; // 업종
    private String address; // 사업장 소재지
    // TODO: 가입화면에 설명 써줄필요있음
    private String taxBill; // 세금계산서 발행용 이메일
    private String manager; // 담당자명
    private String tel; // 사무실전화
}
