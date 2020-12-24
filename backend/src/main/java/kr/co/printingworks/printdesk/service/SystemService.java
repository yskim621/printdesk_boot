package kr.co.printingworks.printdesk.service;

import kr.co.printingworks.printdesk.dto.CompanyDto;

import java.util.List;

public interface SystemService {
    List<CompanyDto> getCompanyList();
    CompanyDto getCompany(String companyId);
}
