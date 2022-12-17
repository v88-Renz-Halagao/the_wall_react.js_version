/* React */
import React, { Component } from "react";

/* Plugins */
import Button from  "react-bootstrap/Button";
import Modal from   "react-bootstrap/Modal";

/* CSS */ 
import "./delete_comment_modal.component.scss";

class DeleteCommentModal extends Component {
    constructor(props){
        super(props);

        this.state = {
            delete_comment_by_id: props.delete_comment_by_id
        }
    }

    componentDidUpdate(prevProps){
        if(this.props.delete_comment_by_id !== prevProps.delete_comment_by_id){
            this.setState({
                delete_comment_by_id: this.props.delete_comment_by_id
            });
        }
    }

    handleOnFormSubmit = (event) => {
        event.preventDefault();
        this.props.handleOnDeleteComment(this.state.delete_comment_by_id);
    }

    render() {
        let {is_show, closeDeleteCommentModal} = this.props;
        let {delete_comment_by_id} = this.state;  
        return (
            <Modal 
                show={is_show}
                onHide={closeDeleteCommentModal}
                id="delete_comment_modal"
                centered
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <form method="post" id="delete_message_form" onSubmit={this.handleOnFormSubmit}>
                <h5>Confirm Delete Comment</h5> 
                <Modal.Body>
                    <p>Are you sure you want to remove this comment? This action cannot be undone.</p>
                    <input type="hidden" name="comment_item" value={delete_comment_by_id}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" onClick={closeDeleteCommentModal}>Cancel</Button>
                    <Button type="submit">Yes, Remove it.</Button>
                </Modal.Footer>
                </form>
            </Modal>
        );
    }
}

export default DeleteCommentModal;