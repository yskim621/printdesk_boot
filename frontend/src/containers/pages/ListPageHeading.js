import { useState } from 'react';
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

const ListPageHeading = ({ heading, match }) => {
  return (
    <Row>
      <Colxx xxs="12">
        <div className="mb-2">
          <h1>{heading}</h1>
          <div className="text-zero top-right-button-container">dddd</div>
          <Breadcrumb match={match} />
        </div>
        <div className="mb-2" />
        <Separator className="mb-5" />
      </Colxx>
    </Row>
  );
};

export default ListPageHeading;
