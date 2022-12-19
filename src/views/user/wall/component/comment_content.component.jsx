/* React */
import React, { Component } from "react";

/* CSS */
import "./comment_content.component.scss";

class CommentContent extends Component {
    constructor(props){
        super(props); 

        this.state = {
            message_id: props.message_id,
            is_show_edit_comment_form: false,
            update_comment: {
                id: null,
                comment: ""
            },
        }
    }

    componentDidUpdate(prevProps){
        if(this.props.message_id !== prevProps.message_id){
            this.setState({
                message_id: this.props.message_id
            });
        }
    }

    showEditForm = (comment_id) => {
        this.setState({
            is_show_edit_comment_form: !this.state.is_show_edit_comment_form,
            update_comment: {
                ...this.state.update_comment, 
                id: comment_id
            }
        });
    }

    hideEditForm = () => {
        this.setState({
            is_show_edit_comment_form: !this.state.is_show_edit_comment_form
        });
    }

    handleEditCommentOnChange = (textarea_edit) => {
        this.setState({
            update_comment: {
                ...this.state.update_comment,
                comment: textarea_edit.value
            }
        });
    }

    handleOnEditCommentSubmit = (event) => {
        event.preventDefault(); 
        this.hideEditForm();
        this.props.handleOnUpdateComment(this.state.update_comment, this.state.message_id);   
    }

    render() {
        let {comment, showDeleteCommentModal} = this.props;
        let {is_show_edit_comment_form} = this.state;
        return (
           <li className="comment_item" id={comment.id}> 
            { (is_show_edit_comment_form === false) &&
                    <React.Fragment> 
                        <p>{comment.comment}</p>
                        <ul className="action_list">
                            <li>
                                <button onClick={() => this.showEditForm(comment.id)} className="edit_button" type="button">
                                    <span className="action_icon"></span>
                                    <span></span>
                                    Edit
                                </button>
                            </li>
                            <li>
                                <button onClick={(event) => showDeleteCommentModal(event.target)} className="delete_button" id={comment.id} type="button">
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
                { (is_show_edit_comment_form) &&
                    <form className="edit_form" onSubmit={this.handleOnEditCommentSubmit}>
                        <textarea onChange={(event) => this.handleEditCommentOnChange(event.target)} name="edit_textarea" defaultValue={comment.comment}></textarea>
                        <button type="submit">Update Comment</button>
                        <button onClick={() => this.hideEditForm()} type="button">Cancel</button>
                    </form>
                }
           </li>
        );
    }
}

export default CommentContent;