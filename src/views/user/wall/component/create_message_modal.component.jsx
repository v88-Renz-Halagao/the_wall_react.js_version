/* React */
import React, { Component } from "react";

/* Plugins */
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

/* CSS */
import "./create_message_modal.component.scss";

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

    handleTextareaOnChange = (textarea) => {
        this.setState({
            message_content: {
                ...this.state.message_content,
                id: this.props.message_id + 1,
                message: textarea.value
            },
        })
    }

    resetCreateMessageForm = () => {
        this.setState({
            message_content: {
                ...this.state.message_content,
                id: null,
                message: ""
            }
        });
    }

    handleOnFormSubmit = (event) => {
        event.preventDefault();
        this.props.handleOnAddMessage(this.state.message_content);
        this.resetCreateMessageForm();
    }
    
    closeCreateModal = () =>{
        this.props.closeCreateMessageModal();
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
                        className={`${(message_content.message === "") ? "disabled disable_button" : "" }`} 
                        type="submit">Post Messages</Button>
                </Modal.Footer>
                </form>
            </Modal>
        );
    }
}

export default CreateMessageModal;