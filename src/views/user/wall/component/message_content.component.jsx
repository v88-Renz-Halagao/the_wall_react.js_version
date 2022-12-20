/* React */
import React, { Component } from "react";

/* Helpers */
import { toggleShowModal, generateId } from './../../../__helpers/helpers';

/* Component */
import CommentContent from      "./../component/comment_content.component";
import DeleteCommentModal from  "./../component/delete_comment_modal.component";

/* CSS */
import "./message_content.component.scss";

/** 
* @class 
* @extends Component
* This component class is being called on the /wall.jsx <br>
* All methods are related to message content<br>
* Last Updated Date: December 20, 2022
*/
class MessageContent extends Component {
    constructor(props){
        super(props); 

        this.state = {
            is_show_comment_form: false,
            message_id: props.messages.id,
            comment_id: "c-"+generateId(),
            total_comment: props.messages.comments.length,
            comment_content: {
                id: null,
                comment: ""
            },
            update_message: {
                id: props.messages.id,
                message: ""
            },
            is_show_edit_form: false,
            is_show_delete_comment_modal: false,
            delete_comment_by_id: 0
        }
    }

    componentDidUpdate(prevProps){
        if(this.props.messages.id !== prevProps.messages.id){
            console.log(this.props.messages.comments);
            this.setState({
                is_show_comment_form: false,
                message_id: this.props.messages.id,
                total_comment: this.props.messages.comments.length,
            });
        }
    }

    /**
    * DOCU: This function will toggle comment form, sets the id of message and updates the state's value <br>
    * Triggered: render() <br>
    * Last Updated Date: December 20, 2022
    * @function
    * @memberOf Wall page
    * @param {integer} messages_id - message id.
    * @author Renz
    */
    toggleCommentForm = (messages_id) => {
        this.setState({
            message_id: messages_id,
            is_show_comment_form: !this.state.is_show_comment_form
        }); 
    }

    /**
    * DOCU: This function will show edit form, and set the message id and updates the state's value <br>
    * Triggered: render() <br>
    * Last Updated Date: December 20, 2022
    * @function
    * @memberOf Wall page
    * @param {integer} messages_id - message id.
    * @author Renz
    */
    showEditForm = (messages_id) => {
        this.setState({
            is_show_edit_form: !this.state.is_show_edit_form,
            update_message: {
                ...this.state.update_message, 
                id: messages_id
            }
        });
    } 

    /**
    * DOCU: This function will show delete comment modal, set the comment id and updates the state's value <br>
    * Triggered: render() <br>
    * Last Updated Date: December 20, 2022
    * @function
    * @memberOf Wall page
    * @param {object} comment - comment data.
    * @author Renz
    */
    showDeleteCommentModal = (comment) => {
        this.setState({
            is_show_delete_comment_modal: true,
            delete_comment_by_id: comment.id
        });
    }

    /**
    * DOCU: This function will handle the textarea change on adding comment to a message, updates the state's value <br>
    * Triggered: render() <br>
    * Last Updated Date: December 20, 2022
    * @function
    * @memberOf Wall page
    * @param {object} textarea - Require input value
    * @author Renz
    */
    handleTextareaOnChange = (textarea) => {
        this.setState({
            comment_content: {
                ...this.state.comment_content,
                id: this.state.comment_id,
                comment: textarea.value
            }
        });
    }

    /**
    * DOCU: This function will handle the textarea change on editing a message, updates the state's value <br>
    * Triggered: render() <br>
    * Last Updated Date: December 20, 2022
    * @function
    * @memberOf Wall page
    * @param {object} textarea_edit - Require input value
    * @author Renz
    */
    handleEditFormOnChange = (textarea_edit) => {
        this.setState({
            update_message: {
                ...this.state.update_message,
                message: textarea_edit.value
            }
        });
    }

    /**
    * DOCU: This function will submits comments form <br>
    * Triggered: render() <br>
    * Last Updated Date: December 20, 2022
    * @function
    * @memberOf Wall page
    * @param {object} event - Require form event.
    * @author Renz
    */
    handleOnFormSubmit = (event) => {
        event.preventDefault();
        let comment_details = this.state;
        this.props.handleOnAddComment(comment_details.comment_content, comment_details.message_id);
        this.setState(prevState => ({
            comment_id: "c-"+generateId(),
            total_comment: this.state.total_comment+1,
            comment_content: {
                ...this.state.comment_content,
                id: null,
                comment: ""
            }
        }));
    }

    /**
    * DOCU: This function will submits edit message form <br>
    * Triggered: render() <br>
    * Last Updated Date: December 20, 2022
    * @function
    * @memberOf Wall page
    * @param {object} event - Require form event.
    * @author Renz
    */
    handleOnEditFormSubmit = (event) => {
        event.preventDefault(); 
        this.setState({is_show_edit_form: !this.state.is_show_edit_form})
        this.props.handleOnUpdateMessage(this.state.update_message); 
    }

    /**
    * DOCU: This function will handle the deleting of comment of a message.<br>
    * Triggered: render() <br>
    * Last Updated Date: December 20, 2022
    * @function
    * @memberOf Wall page
    * @param {integer} comment_id - comment id.
    * @author Renz
    */
    handleOnDeleteComment = (comment_id) => { 
        this.props.handleOnDeleteCommentOfMessage(comment_id, this.state.message_id); 
        this.setState({
            delete_comment_by_id: 0,
            total_comment: this.state.total_comment-1,
            is_show_delete_comment_modal: false
        });
    }

    render() {
        let {messages, showDeleteMessageModal, handleOnUpdateComment} = this.props; 
        let {is_show_comment_form, total_comment, comment_content, is_show_edit_form, is_show_delete_comment_modal, delete_comment_by_id} = this.state;  
        return (
           <li className="message_item" id={messages.id}>
                { (is_show_edit_form === false) &&
                    <React.Fragment>
                        <p>{messages.message}</p>
                        <ul className="action_list">
                            <li>
                                <button className={`comment_button ${(total_comment !== 0) ? "has_comment" : "" }`} id={messages.id} type="button" onClick={(event) => this.toggleCommentForm(messages.id)}>
                                    <span className="action_icon"></span>
                                    <span className="comment_count">{total_comment}</span>
                                    Comment
                                </button>
                            </li>
                            <li>
                                <button onClick={() => this.showEditForm(messages.id)} className="edit_button" type="button">
                                    <span className="action_icon"></span> 
                                    <span></span>
                                    Edit
                                </button>
                            </li>
                            <li>
                                <button onClick={(event) => showDeleteMessageModal(event.target)} className="delete_button" id={messages.id} type="button">
                                    <span className="action_icon"></span>
                                    <span></span>
                                    Delete
                                </button>
                            </li>
                            <li>
                                <span className="action_icon"></span>
                                <span className="user">You</span> - Few seconds ago
                            </li>
                        </ul>
                    </React.Fragment>
                }
                { (is_show_edit_form) &&
                    <form className="edit_form" onSubmit={this.handleOnEditFormSubmit}>
                        <textarea onChange={(event) => this.handleEditFormOnChange(event.target)} name="edit_textarea" defaultValue={messages.message}></textarea>
                        <button type="submit">Update Message</button>
                        <button onClick={() => this.setState({is_show_edit_form: !this.state.is_show_edit_form})} type="button">Cancel</button>
                    </form>
                }
                { (is_show_comment_form) &&
                    <form className="post_comment_form" method="post" onSubmit={this.handleOnFormSubmit}>
                        <textarea name="textarea_comment" value={comment_content.comment} onChange={(event) => this.handleTextareaOnChange(event.target)}></textarea>
                        <button className={`${(comment_content.comment === "")? "disable disable_button" : "" }`} type="submit">Post Comment</button>
                    </form>
                }
                { (is_show_comment_form && total_comment !== 0) &&
                    <ul className="comment_container_list">
                        {messages.comments.map((comment) => (
                            <CommentContent 
                                message_id = {messages.id}
                                comment={comment}
                                showDeleteCommentModal={this.showDeleteCommentModal}
                                handleOnUpdateComment={handleOnUpdateComment}>
                            </CommentContent>
                        ))}
                    </ul>
                }
                <DeleteCommentModal
                    is_show={is_show_delete_comment_modal}
                    toggleShowModal={() => toggleShowModal(this, "is_show_delete_comment_modal", false)}
                    delete_comment_by_id={delete_comment_by_id}
                    handleOnDeleteComment={this.handleOnDeleteComment}
                >
                </DeleteCommentModal>
           </li>
        );
    }
}

export default MessageContent;