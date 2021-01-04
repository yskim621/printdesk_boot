// import { useState } from 'react';
// import {
//   Row,
//   Button,
//   ButtonDropdown,
//   UncontrolledDropdown,
//   DropdownMenu,
//   DropdownItem,
//   DropdownToggle,
//   CustomInput,
//   Collapse,
// } from 'reactstrap';

// import { Colxx, Separator } from '../../components/common/CustomBootstrap';
// import Breadcrumb from '../navs/Breadcrumb';

// const ListPageHeading = ({
//   displayMode,
//   changeDisplayMode,
//   handleChangeSelectAll,
//   changeOrderBy,
//   changePageSize,
//   selectedPageSize,
//   totalItemCount,
//   selectedOrderOption,
//   match,
//   startIndex,
//   endIndex,
//   selectedItemsLength,
//   itemsLength,
//   onSearchKey,
//   orderOptions,
//   pageSizes,
//   toggleModal,
//   heading, }) => {
//   const [dropdownSplitOpen, setDropdownSplitOpen] = useState(false);
//   const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);
//   return (
//     <Row>
//       <Colxx xxs="12">
//         <div className="mb-2">
//           <h1>{heading}</h1>
//           <div className="text-zero top-right-button-container">
//             <Button
//               color="primary"
//               size="lg"
//               className="top-right-button"
//               // onClick={() => toggleModal()}
//             >
//               ADD NEW
//             </Button>
//           </div>
//         <Breadcrumb match={match} />
//         </div>
//         <div className="mb-2" />
//         <Separator className="mb-5" />
//       </Colxx>
//     </Row>
//   );
// };

// export default ListPageHeading;
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
  // const [dropdownSplitOpen, setDropdownSplitOpen] = useState(false);
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
             Add new
              {/* ADD NEW 글자 */}
            </Button>
          </div>
          {/* <Breadcrumb match={match} /> */}
        </div>
        <div className="mb-2" />
        <Separator className="mb-5" />
      </Colxx>
    </Row>
  );
};

export default ListPageHeading;