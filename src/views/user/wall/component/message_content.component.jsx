/* React */
import React, { Component } from "react";

/* Component */
import CommentContent from      "./../component/comment_content.component";
import DeleteCommentModal from  "./../component/delete_comment_modal.component";

/* CSS */
import "./message_content.component.scss";

class MessageContent extends Component {
    constructor(props){
        super(props); 

        this.state = {
            is_show_comment_form: false,
            message_comments_content: props.messages.comments,
            message_id: props.messages.id,
            comment_id: 0,
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

    toggleCommentForm = () => {
        this.setState({
            is_show_comment_form: !this.state.is_show_comment_form
        }); 
    }

    toggleEditForm = () => {
        this.setState({
            is_show_edit_form: !this.state.is_show_edit_form
        });
    }

    showDeleteCommentModal = (comment) => {
        this.setState({
            is_show_delete_comment_modal: true,
            delete_comment_by_id: comment.id
        });
    }

    closeDeleteCommentModal = () => {
        this.setState({
            is_show_delete_comment_modal: false
        });
    }

    handleTextareaOnChange = (textarea) => {
        this.setState({
            comment_content: {
                ...this.state.comment_content,
                id: this.state.comment_id,
                comment: textarea.value
            }
        });
    }

    handleEditFormOnChange = (textarea_edit) => {
        this.setState({
            update_message: {
                ...this.state.update_message,
                message: textarea_edit.value
            }
        });
    }

    handleOnFormSubmit = (event) => {
        event.preventDefault();
        let comment_details = this.state;
        this.props.handleOnAddComment(comment_details.comment_content, comment_details.message_id);
        this.setState(prevState => ({
            message_comments_content: [...prevState.message_comments_content, comment_details.comment_content],
            comment_id: this.state.comment_id + 1,
            total_comment: this.state.total_comment+1,
            comment_content: {
                ...this.state.comment_content,
                id: null,
                comment: ""
            }
        }));
    }

    handleOnEditFormSubmit = (event) => {
        event.preventDefault(); 
        this.toggleEditForm();
        this.props.handleOnUpdateMessage(this.state.update_message); 
    }

    handleOnUpdateComment = (updated_comment) => {
        this.setState(prevState => ({
            message_comments_content: prevState.message_comments_content.map((comment) => {
                if(comment.id === parseInt(updated_comment.id)){
                    return {
                        ...comment,
                        comment: updated_comment.comment
                    }
                }
                else{
                    return comment;
                }
            })
        }));
    } 

    handleOnDeleteComment = (comment_id) => {
        console.log(comment_id, this.state.message_id); 
        const updated_comments = this.state.message_comments_content.filter(comment => comment.id !== parseInt(comment_id));
        this.setState({
            message_comments_content: updated_comments,
            delete_comment_by_id: 0,
            total_comment: this.state.total_comment-1,
            is_show_delete_comment_modal: false
        });
    }

    render() {
        let {messages, showDeleteMessageModal} = this.props; 
        let {is_show_comment_form, message_comments_content, total_comment, comment_content, is_show_edit_form, is_show_delete_comment_modal, delete_comment_by_id} = this.state;  
        return (
           <li className="message_item" id={messages.id}>
                { (is_show_edit_form === false) &&
                    <React.Fragment>
                        <p>{messages.message}</p>
                        <ul className="action_list">
                            <li>
                                <button className={`comment_button ${(total_comment !== 0) ? "has_comment" : "" }`} id={messages.id} type="button" onClick={(event) => this.toggleCommentForm(event.target)}>
                                    <span className="action_icon"></span>
                                    <span className="comment_count">{total_comment}</span>
                                    Comment
                                </button>
                            </li>
                            <li>
                                <button onClick={() => this.toggleEditForm()} className="edit_button" type="button">
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
                        <button onClick={() => this.toggleEditForm()} type="button">Cancel</button>
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
                        {message_comments_content.map((comment) => (
                            <CommentContent
                                comment={comment}
                                showDeleteCommentModal={this.showDeleteCommentModal}
                                handleOnUpdateComment={this.handleOnUpdateComment}>
                            </CommentContent>
                        ))}
                    </ul>
                }
                <DeleteCommentModal
                    is_show={is_show_delete_comment_modal}
                    closeDeleteCommentModal={this.closeDeleteCommentModal}
                    delete_comment_by_id={delete_comment_by_id}
                    handleOnDeleteComment={this.handleOnDeleteComment}
                >
                </DeleteCommentModal>
           </li>
        );
    }
}

export default MessageContent;