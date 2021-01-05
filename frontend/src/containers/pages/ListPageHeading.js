import React, { useState } from 'react';
import {
  Row,
  Button,
  ButtonDropdown,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  CustomInput,
  Collapse,
} from 'reactstrap';

import { Colxx, Separator } from '../../components/common/CustomBootstrap';
import Breadcrumb from '../navs/Breadcrumb';

const ListPageHeading = ({
  handleChangeSelectAll,
  changeOrderBy,
  changePageSize,
  selectedPageSize,
  totalItemCount,
  selectedOrderOption,
  match,
  startIndex,
  endIndex,
  selectedItemsLength,
  itemsLength,
  onSearchKey,
  orderOptions,
  pageSizes,
  toggleModal,
  heading,
}) => {
  const [dropdownSplitOpen, setDropdownSplitOpen] = useState(false);
  // const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);
  

  return (
    <Row>
      <Colxx xxs="12">
        <div className="mb-2">
          <h1>
            {heading}
          </h1>

          <div className="text-zero top-right-button-container">
            <Button
              color="primary"
              size="lg"
              className="top-right-button"
              onClick={() => toggleModal()}
            >
              부서추가
              {/* ADD NEW 글자 */}
            </Button>
            {/* 전체 선택을 가능하게 해주는 기능 */}
            <ButtonDropdown
              isOpen={dropdownSplitOpen}
              toggle={() => setDropdownSplitOpen(!dropdownSplitOpen)}
            >
              <div className="btn btn-primary btn-lg pl-4 pr-0 check-button check-all">
                <CustomInput
                  className="custom-checkbox mb-0 d-inline-block"
                  type="checkbox"
                  id="checkAll"
                  checked={selectedItemsLength >= itemsLength}
                  onChange={() => handleChangeSelectAll(true)}
                  label={
                    <span
                      className={`custom-control-label ${
                        selectedItemsLength > 0 &&
                        selectedItemsLength < itemsLength
                          ? 'indeterminate'
                          : ''
                      }`}
                    />
                  }
                />
              </div>
                
              <DropdownToggle
                caret
                color="primary"
                className="dropdown-toggle-split btn-lg"
              />
              <DropdownMenu right>
                <DropdownItem>
                  삭제
                </DropdownItem>
                <DropdownItem>
                  수정
                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </div>
          {/* <Breadcrumb match={match} /> */}
          
        </div>
        <div className="d-block d-md-inline-block pt-1">
            <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
              <input
                type="text"
                name="keyword"
                id="search"
                placeholder="입력부서명칭"
                onKeyPress={(e) => onSearchKey(e)}
              />
            </div>
        </div>
        
        <div className="float-md-right pt-1">
          <span className="text-muted text-small mr-1">{`${startIndex}-${endIndex} of ${totalItemCount} `}</span>
          <UncontrolledDropdown className="d-inline-block">
            <DropdownToggle caret color="outline-dark" size="xs">
              {selectedPageSize}
            </DropdownToggle>
            <DropdownMenu right>
              {pageSizes.map((size, index) => {
                return (
                  <DropdownItem
                    key={index}
                    onClick={() => changePageSize(size)}
                  >
                    {size}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>

        <div className="mb-2" />
        <Separator className="mb-5" />
      </Colxx>
    </Row>
  );
};

export default ListPageHeading;