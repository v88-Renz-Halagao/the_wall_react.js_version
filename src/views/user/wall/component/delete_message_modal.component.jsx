/* React */
import React, { Component } from "react";

/* Plugins */
import Button from  "react-bootstrap/Button";
import Modal from   "react-bootstrap/Modal";

/* CSS */ 
import "./delete_message_modal.component.scss";

/** 
* @class 
* @extends Component
* This component class is being called on the /wall.jsx <br>
* All methods are related into deleting message<br>
* Last Updated Date: December 20, 2022
*/
class DeleteMessageModal extends Component {
    constructor(props){
        super(props);

        this.state = {
            delete_message_by_id: props.delete_message_by_id
        }
    }

    componentDidUpdate(prevProps){
        if(this.props.delete_message_by_id !== prevProps.delete_message_by_id){
            this.setState({
                delete_message_by_id: this.props.delete_message_by_id
            });
        }
    }

    /**
    * DOCU: This function will submits deleting of message form <br>
    * Triggered: render() <br>
    * Last Updated Date: December 20, 2022
    * @function
    * @memberOf Wall page
    * @param {object} event - Require form event.
    * @author Renz
    */
    handleOnFormSubmit = (event) => {
        event.preventDefault();
        this.props.handleOnDeleteMessage(this.state.delete_message_by_id);
    }

    render() {
        let {is_show, toggleShowModal} = this.props;
        let {delete_message_by_id} = this.state;   
        return (
            <Modal 
                show={is_show}
                onHide={toggleShowModal}
                id="delete_message_modal"
                centered
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <form method="post" id="delete_message_form" onSubmit={this.handleOnFormSubmit}>
                <h5>Confirm Delete Message</h5> 
                <Modal.Body>
                    <p>Are you sure you want to remove this message? This action cannot be undone.</p>
                    <input type="hidden" name="message_item" value={delete_message_by_id}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" onClick={toggleShowModal}>Cancel</Button>
                    <Button type="submit">Yes, Remove it.</Button>
                </Modal.Footer>
                </form>
            </Modal>
        );
    }
}

export default DeleteMessageModal;