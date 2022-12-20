/* React */
import React, { Component } from "react";

/* Plugins */
import Button from  "react-bootstrap/Button";
import Modal from   "react-bootstrap/Modal";

/* CSS */
import "./create_message_modal.component.scss";

/** 
* @class 
* @extends Component
* This component class is being called on the /wall.jsx <br>
* All methods are related into creating message<br>
* Last Updated Date: December 20, 2022
*/
class CreateMessageModal extends Component {
    constructor(props){
        super(props)

        this.state = {
            message_content: {
                id: null,
                message: "",
                comments: []
            }
        }
    }

    /**
    * DOCU: This function will handle the textarea change, updates the state's value <br>
    * Triggered: render() <br>
    * Last Updated Date: December 20, 2022
    * @function
    * @memberOf Wall page
    * @param {object} textarea - Require input value
    * @author Renz
    */
    handleTextareaOnChange = (textarea) => {
        this.setState({
            message_content: {
                ...this.state.message_content,
                id: this.props.message_id + 1,
                message: textarea.value
            },
        })
    }

    /**
    * DOCU: This function will reset the message content and updates the state's value <br>
    * Triggered: render() <br>
    * Last Updated Date: December 20, 2022
    * @function
    * @memberOf Wall page
    * @author Renz
    */
    resetCreateMessageForm = () => {
        this.setState({
            message_content: {
                ...this.state.message_content,
                id: null,
                message: ""
            }
        });
    }

    /**
    * DOCU: This function will submits creating of message form <br>
    * Triggered: render() <br>
    * Last Updated Date: December 20, 2022
    * @function
    * @memberOf Wall page
    * @param {object} event - Require form event.
    * @author Renz
    */
    handleOnFormSubmit = (event) => {
        event.preventDefault();
        this.props.handleOnAddMessage(this.state.message_content);
        this.resetCreateMessageForm();
    }
    
    /**
    * DOCU: This function will toggle the create message modal and reset the textarea form <br>
    * Triggered: render() <br>
    * Last Updated Date: December 20, 2022
    * @function
    * @memberOf Wall page
    * @author Renz
    */
    closeCreateModal = () =>{
        this.props.toggleShowModal();
        this.resetCreateMessageForm();
    }

    render() {
        let {is_show} = this.props;
        let {message_content} = this.state;  
        return (
            <Modal 
                show={is_show}
                onHide={() => this.closeCreateModal()}
                size="lg"
                id="create_message_modal"
                centered
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <form method="post" id="create_message_form" onSubmit={this.handleOnFormSubmit}>
                <h5>Create a Message</h5>
                <Modal.Body>
                    <textarea 
                        id="create_message_textarea" 
                        placeholder="Type your message here."
                        value={message_content.message}
                        onChange={(event) => this.handleTextareaOnChange(event.target)}></textarea>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => this.closeCreateModal()} type="button">Cancel</Button>
                    <Button
                        className={`${(message_content.message === "") && "disabled disable_button" }`} 
                        type="submit">Post Messages</Button> 
                </Modal.Footer>
                </form>
            </Modal>
        );
    }
}

export default CreateMessageModal;