import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table , Button} from 'reactstrap';

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


  const [isLoaded, setIsLoaded] = useState(false);
  const [displayMode, setDisplayMode] = useState('list');
  // page에 관련된 것은 ListPageHeading 과 ListPageListing에 있는 함수에 영향을 줍니다.
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(8);
  const [selectedOrderOption, setSelectedOrderOption] = useState({
    column: 'title',
    label: 'Product Name',
  });
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [lastChecked, setLastChecked] = useState(null);

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

 
  const pageSizes = [4, 8, 12, 20];

  const startIndex = (currentPage - 1) * selectedPageSize;
  const endIndex = currentPage * selectedPageSize;

  const add = (e) => {
    e.preventDefault();
    const index = form.current.index.value;
    const name = form.current.name.value;
    const remark = form.current.remark.value;
    addDepartment(index, name, remark);
  };


  const getIndex = (value, arr, prop) => {
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i][prop] === value) {
        return i;
      }
    }
    return -1;
  };
  // 체크박스를 활성화 시켜주는 함수입니다. DataListView에서 선택된 카드의 체크박스를 활성화 시켜 줍니다.
  const onCheckItem = (event, id) => {
    if (
      event.target.tagName === 'A' ||
      (event.target.parentElement && event.target.parentElement.tagName === 'A')
    ) {
      return true;
    }
    if (lastChecked === null) {
      setLastChecked(id);
    }

    let selectedList = [...selectedItems];
    if (selectedList.includes(id)) {
      selectedList = selectedList.filter((x) => x !== id);
    } else {
      selectedList.push(id);
    }
    setSelectedItems(selectedList);

    if (event.shiftKey) {
      let newItems = [...departmentList];
      const start = getIndex(id, newItems, 'id');
      const end = getIndex(lastChecked, newItems, 'id');
      newItems = newItems.slice(Math.min(start, end), Math.max(start, end) + 1);
      selectedItems.push(
        ...newItems.map((item) => {
          return item.id;
        })
      );
      selectedList = Array.from(new Set(selectedItems));
      setSelectedItems(selectedList);
    }
    document.activeElement.blur();
    return false;
  };

  // ListPageHeading에서 체크박스를 전체 활성화 시켜 주는 함수입니다.
  const handleChangeSelectAll = (isToggle) => {
    if (selectedItems.length >= departmentList.length) {
      if (isToggle) {
        setSelectedItems([]);
      }
    } else {
      setSelectedItems(departmentList.map((x) => x.index));
    }
    document.activeElement.blur();
    return false;
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
        {/* 부서정보에서 헤더에 해당합니다.  */}
        <ListPageHeading
          heading="부서정보"
          match={match}
          handleChangeSelectAll={handleChangeSelectAll}
          itemsLength={departmentList ? departmentList.length : 0}
          selectedItemsLength={selectedItems ? selectedItems.length : 0}
          toggleModal={() => setModalOpen(!modalOpen)}
          pageSizes={pageSizes}
          onSearchKey={(e) => {
            if (e.key === 'Enter') {
              setSearch(e.target.value.toLowerCase());
            }
          }}
          changePageSize={setSelectedPageSize}
          selectedPageSize={selectedPageSize}
          totalItemCount={departmentList ? departmentList.length : 0}
          selectedOrderOption={selectedOrderOption}
          startIndex={startIndex}
          endIndex={endIndex}/>
        {/* {`기초설정 > 부서/직원 > 부서정보`} */}

        {/* 부서정보에서 부서추가 버튼을 클릭할때 나오는 모달입니다. */}
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
        </Table>
      
        {/* 부서정보의 본문을 담당하는 함수입니다.  */}
        {departmentList &&
          <ListPageListing
            items = {departmentList}
            selectedItems={selectedItems}
            onCheckItem={onCheckItem}
            toggleModal={() => setModalOpen(!modalOpen)}

          >
        </ListPageListing>
        }
        
      </div>
    </AppLayout>
  );
};

export default BasicDepartmentList;
