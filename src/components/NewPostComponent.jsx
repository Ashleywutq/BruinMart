import React from 'react';
import { Button,Form, FormGroup, Label, Input, FormText ,Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ImageUpload from './ImageUploadComponent';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div>
        <Button style={{ background: "transparent" }} onClick={this.toggle}><span className="fa fa-plus fa-lg" /></Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-lg">
          <ModalHeader toggle={this.toggle}>New Post</ModalHeader>
          <ModalBody>
          <Form>
        <FormGroup>
          <Label for="Item">Item</Label>
          <Input type="text" name="item" id="itemName" placeholder="enter the name of the item you want to sell" />
        </FormGroup>
        <FormGroup>
          <Label for="Price">Price</Label>
          <Input type="text" name="price" id="itemPrice" placeholder="enter a number in US dollars" />
        </FormGroup>
        <FormGroup>
          <Label for="itemDes">Item Description</Label>
          <Input type="textarea" name="itemDes" id="itemDes" 
          placeholder="enter a few lines to describe your item and outline anything potential buyers may need to know" />
        </FormGroup>
        {/* <FormGroup>
          <Label for="exampleSelectMulti">Select Multiple</Label>
          <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Input>
        </FormGroup> */}
        <FormGroup>
          <Label for="exampleFile">File</Label>
          {/* <Input type="file" name="file" id="exampleFile" /> */}
          <ImageUpload />
          <FormText color="muted">
            Upload a picture for your item here.
          </FormText>
        </FormGroup>
        {/* <FormGroup tag="fieldset">
          <legend>Radio Buttons</legend>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="radio1" />{' '}
              Option one is this and that—be sure to include why it's great
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="radio1" />{' '}
              Option two can be something else and selecting it will deselect option one
            </Label>
          </FormGroup>
          <FormGroup check disabled>
            <Label check>
              <Input type="radio" name="radio1" disabled />{' '}
              Option three is disabled
            </Label>
          </FormGroup>
        </FormGroup> */}
        <FormGroup check>
          <Label check>
            <Input type="checkbox" />{' '}
            I understand that my information will only be provided to any potential buyers after they have reserved my item.
          </Label>
        </FormGroup>
      </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Post</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalExample;