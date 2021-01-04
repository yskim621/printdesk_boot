import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'reactstrap';

import {
  addDepartmentAction,
  getDepartmentListAction,
} from '../../../src/store/Basic/actions';
import {
  loadingSelector,
  departmentListSelector,
} from '../../../src/store/Basic/selectors';
import AppLayout from '../../../src/containers/layout/app';
import ListPageHeading from '../../../src/containers/pages/ListPageHeading';
import AddNewModal from '../../../src/containers/pages/AddNewModal';
import ListPageListing from '../../../src/containers/pages/ListPageListing'

const BasicDepartmentList = ({ match }) => {
  const dispatch = useDispatch();
  const form = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const addDepartment = (index, name, remark) => {
    dispatch(addDepartmentAction(index, name, remark));
  };
  const getDepartmentList = () => {
    dispatch(getDepartmentListAction());
  };
  const loading = useSelector(loadingSelector());
  const departmentList = useSelector(departmentListSelector());

  useEffect(() => {
    getDepartmentList();
  }, []);

  const add = (e) => {
    e.preventDefault();

    const index = form.current.index.value;
    const name = form.current.name.value;
    const remark = form.current.remark.value;
    addDepartment(index, name, remark);
  };

  const departmentListMap =
    departmentList &&
    departmentList.map((department) => (
      <tr key={department.name}>
        <th scope="row">{department.index}</th>
        <td>{department.name}</td>
        <td>{department.remark}</td>
        <td>
          <button type="button">수정</button>
          <button type="button">삭제</button>
        </td>
      </tr>
    ));

  return (
    <AppLayout>
      {loading && <div className="loading" />}
  
      <div className="disable-text-selection">
        <ListPageHeading
          heading="부서정보"
          match={match}
          toggleModal={() => setModalOpen(!modalOpen)}/>
        {/* {`기초설정 > 부서/직원 > 부서정보`} */}

        <AddNewModal
          modalOpen={modalOpen}
          toggleModal={() => setModalOpen(!modalOpen)}
        />
        <Table>
          <thead>
            <tr>
              <th>번호</th>
              <th>부서명칭</th>
              <th>비고</th>
              <th>처리</th>
            </tr>
          </thead>
          <tbody>{departmentList && departmentListMap}</tbody>
        </Table>
      </div>
    </AppLayout>
  );
};

export default BasicDepartmentList;
