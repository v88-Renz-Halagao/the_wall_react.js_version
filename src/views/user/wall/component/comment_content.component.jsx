/* React */
import React, { Component } from "react";

/* CSS */
import "./comment_content.component.scss";

/** 
* @class 
* @extends Component
* This component class is being called on the /message_content.component.jsx <br>
* All methods are related to comment content<br>
* Last Updated Date: December 20, 2022
*/
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

    /**
    * DOCU: This function will show edit form, and set the comment id and updates the state's value <br>
    * Triggered: render() <br>
    * Last Updated Date: December 20, 2022
    * @function
    * @memberOf Wall page
    * @param {integer} comment_id - comment id.
    * @author Renz
    */
    showEditForm = (comment_id) => {
        this.setState({
            is_show_edit_comment_form: !this.state.is_show_edit_comment_form,
            update_comment: {
                ...this.state.update_comment, 
                id: comment_id
            }
        });
    }

    /**
    * DOCU: This function will handle the textarea change on editing a comment, updates the state's value <br>
    * Triggered: render() <br>
    * Last Updated Date: December 20, 2022
    * @function
    * @memberOf Wall page
    * @param {object} textarea_edit - Require input value
    * @author Renz
    */
    handleEditCommentOnChange = (textarea_edit) => {
        this.setState({
            update_comment: {
                ...this.state.update_comment,
                comment: textarea_edit.value
            }
        });
    }

    /**
    * DOCU: This function will submits edit comment form <br>
    * Triggered: render() <br>
    * Last Updated Date: December 20, 2022
    * @function
    * @memberOf Wall page
    * @param {object} event - Require form event.
    * @author Renz
    */
    handleOnEditCommentSubmit = (event) => {
        event.preventDefault(); 
        this.setState({is_show_edit_comment_form: !this.state.is_show_edit_comment_form})
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
                        <button onClick={() => this.setState({is_show_edit_comment_form: !this.state.is_show_edit_comment_form})} type="button">Cancel</button>
                    </form>
                }
           </li>
        );
    }
}

export default CommentContent;