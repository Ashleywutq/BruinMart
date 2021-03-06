import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
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
                <Button block color="danger" className="item-button" onClick={this.toggle}>
                    Save
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Save Item</ModalHeader>
                    <ModalBody>
                        You are about to save the item "{this.props.item.name}" from {this.props.item.seller.name}.<br />
                        You will be able to view this item under "<span className="fa fa-heart-o fa-lg fa-fw" /> Saved Items"
                        in the sidebar.
                        <br /> <br />
                        Saving will not reserve this item for you.
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>
                            Confirm
                        </Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ModalExample;
