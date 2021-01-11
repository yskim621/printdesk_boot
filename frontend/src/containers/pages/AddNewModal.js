import React from 'react';
import {
  CustomInput,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
} from 'reactstrap';
// import Select from 'react-select';
// import CustomSelectInput from '../../components/common/CustomSelectInput';


const AddNewModal = ({ modalOpen, toggleModal, OnClickCansle, onClickSubmit }) => {
  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName="modal-right"
      backdrop="static"
    >
      <ModalHeader toggle={toggleModal}>
        Add New Item
      </ModalHeader>
      <ModalBody>
        <Label>
          순서:
        </Label>
        <Input />
        <Label className="mt-4">
          부서명칭:
        </Label>
        <Input />
        <Label className="mt-4">
          비고:
        </Label>
        <Input type="textarea" name="text" id="exampleText" />
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" outline onClick={toggleModal}>
          취소
        </Button>
        <Button color="primary" onClick={onClickSubmit}>
          저장
        </Button>{' '}
      </ModalFooter>
    </Modal>
  );
};

export default AddNewModal;
