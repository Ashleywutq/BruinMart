import React from 'react';
import { Button, Label, FormText, Modal, ModalHeader, ModalBody, Col, Row } from 'reactstrap';
import ImageUpload from './ImageUploadComponent';
import { Control, Form, Errors } from 'react-redux-form';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
];

class ModalExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleSubmit(values) {
        this.props.resetNewPostForm();
        this.props.postItem({
            name: values.itemName,
            price: parseInt(values.itemPrice),
            picture:
                'https://s7d4.scene7.com/is/image/roomandboard/?layer=0&size=498,400&scl=1&src=964101_wood_W&layer=comp&$prodzoom0$',
            reserved: false,
            seller: 'Joe Bruin',
            time: new Date().toISOString(),
            detail: values.itemDes
        });
        this.toggleModal();
    }

    render() {
        return (
            <div>
                <Button style={{ background: 'transparent' }} onClick={this.toggleModal}>
                    <span className="fa fa-plus fa-lg" />
                </Button>
                <Modal className="modal-lg" isOpen={this.state.modal} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>New Post</ModalHeader>
                    <ModalBody>
                        <Form model="newPost" onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor=".itemName" md={2}>
                                    Name
                                </Label>
                                <Col md={10}>
                                    <Control.text
                                        model=".itemName"
                                        id="itemName"
                                        name="itemName"
                                        placeholder="Enter the name of the item you want to sell"
                                        className="form-control"
                                        // validators={{
                                        //     required,
                                        //     minLength: minLength(3),
                                        //     maxLength: maxLength(15)
                                        // }}
                                    />
                                    {/* <Errors
                                        className="text-danger"
                                        model=".itemName"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    /> */}
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor=".itemPrice" md={2}>
                                    Price
                                </Label>
                                <Col md={10}>
                                    <Control.text
                                        model=".itemPrice"
                                        id="itemPrice"
                                        name="itemPrice"
                                        placeholder="Enter your price in US dollars"
                                        className="form-control"
                                        // validators={{
                                        //     required,
                                        //     minLength: minLength(3),
                                        //     maxLength: maxLength(15)
                                        // }}
                                    />
                                    {/* <Errors
                                    className="text-danger"
                                    model=".lastName"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                /> */}
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor=".itemDes" md={2}>
                                    Item Description
                                </Label>
                                <Col md={10}>
                                    <Control.textarea
                                        model=".itemDes"
                                        id="itemDes"
                                        name="itemDes"
                                        placeholder="Enter a few lines to describe your item and outline anything potential buyers may need to know"
                                        className="form-control"
                                        rows="4"
                                    />
                                </Col>
                            </Row>
                            {/* <FormGroup>
          <Label htmlFor="exampleSelectMulti">Select Multiple</Label>
          <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Input>
        </FormGroup> */}
                            <Row className="form-group">
                                <Label htmlFor=".pictures" md={2}>
                                    Pictures
                                </Label>
                                {/* <Input type="file" name="file" id="exampleFile" /> */}
                                <Col md={10}>
                                    <ImageUpload />
                                    <FormText color="muted">Upload a picture for your item here.</FormText>
                                </Col>
                            </Row>
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
                            <Row className="form-group">
                                <Col>
                                    <div className="form-check">
                                        <Label check>
                                            <Control.checkbox
                                                model=".agreeTerms"
                                                name="agreeTerms"
                                                className="form-check-input"
                                            />{' '}
                                            I understand that my information will only be provided to any potential
                                            buyers after they have reserved my item.
                                        </Label>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{ size: 4, offset: 2 }}>
                                    <Button block type="submit" value="submit" color="primary">
                                        Post
                                    </Button>
                                </Col>
                                <Col md={{ size: 4, offset: 2 }}>
                                    <Button block color="secondary" onClick={this.toggleModal}>
                                        Cancel
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default ModalExample;
