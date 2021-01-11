import React from 'react';
import { Card, CustomInput, Badge, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../components/common/CustomBootstrap';

const DataListView = ({ product, isSelect, onCheckItem,toggleModal}) => {
  
  return (
    <Colxx xxs="12" className="mb-3">
      <ContextMenuTrigger id="menu_id" data={product.index}>
        <Card
          onClick={(event) => onCheckItem(event, product.index)}
          className={classnames('d-flex flex-row', {
          active: isSelect,
          })}
        >
          
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <p className="list-item-heading mb-1 truncate">
                {product.index}
              </p>
              <p className="list-item-heading mb-1 truncate">
                {product.name}
              </p>
              <p className="list-item-heading mb-1 truncate">
                {product.remark}
              </p>
              <div>
                <a href={toggleModal} onClick={() => toggleModal()}>
                  <i className="iconsminds-pen"/>
                </a>
                
                <i className="iconsminds-eraser-2"/>
                
              </div>
            </div>
            <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
              <CustomInput
                className="item-check mb-0"
                type="checkbox"
                id={`check_${product.index}`}
                checked={isSelect}
                onChange={() => {}}
                label=""
              />
            </div>
          </div>
        </Card>
       
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(DataListView);
