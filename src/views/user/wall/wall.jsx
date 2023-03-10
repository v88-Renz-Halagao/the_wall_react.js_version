/* React */
import React, { Component } from "react";

/* Helpers */
import { toggleShowModal, generateId } from '../../__helpers/helpers';

/* Component */
import Header from              "./component/header.component";
import CreateMessageModal from  "./component/create_message_modal.component";
import MessageContent from      "./component/message_content.component";
import DeleteMessageModal from  "./component/delete_message_modal.component";

/* Prototype Data */
import { messagesContent } from "./message_content_prototype_data";

/* CSS */
import "./wall.scss";

/* Images */
import Empty_post from "../../../assets/images/empty_post.png"; 

/** 
* @class 
* @extends Component
* This component class is being called on the /layouts/user.layout.jsx <br>
* This is class component is responsible for Wall page. <br>
* Last Updated Date: December 20, 2022
*/
class Wall extends Component {
    constructor(props){
        super(props)

        this.state = {
            total_messages: 0,
            messages_content: messagesContent,
            message_id: generateId(),
            delete_message_by_id: 0,
            is_show_create_modal: false,
            is_show_delete_message_modal: false
        }
    }

    /**
    * DOCU: This function will show delete message, sets the id of message and updates the state's value <br>
    * Triggered: render() <br>
    * Last Updated Date: December 20, 2022
    * @function
    * @memberOf Wall page
    * @param {object} message - message id.
    * @author Renz
    */
    showDeleteMessageModal = (message) => {
        this.setState({
            is_show_delete_message_modal: true,
            delete_message_by_id: message.id
        });
    }

    /**
    * DOCU: This function will add message, sets the id of message and updates the state's value <br>
    * Triggered: render() <br> 
    * Last Updated Date: December 20, 2022
    * @function
    * @memberOf Wall page
    * @param {object} message - message data.
    * @author Renz
    */
    handleOnAddMessage = (message) => {
        this.setState(prevState => ({
            messages_content: [message, ...prevState.messages_content],
            total_messages: this.state.messages_content.length+1, 
            message_id: generateId(), 
            is_show_create_modal: false
        })); 
    }

    /**
    * DOCU: This function will update message and updates the state's value <br>
    * Triggered: render() <br>
    * Last Updated Date: December 20, 2022
    * @function
    * @memberOf Wall page
    * @param {object} updated_message - updated message data.
    * @author Renz
    */
    handleOnUpdateMessage = (updated_message) => {
        let { messages_content } = this.state;
        
        messages_content.map( message_item =>  {
            if(message_item.id === updated_message.id){
                return message_item.message = updated_message.message;
            }
            return message_item;
        });
        
        this.setState({messages_content});
    }

    /**
    * DOCU: This function will delete message and updates the state's value <br>
    * Triggered: render() <br>
    * Last Updated Date: December 20, 2022
    * @function
    * @memberOf Wall page
    * @param {integer} message_id - message id.
    * @author Renz
    */
    handleOnDeleteMessage = (message_id) => {
        const updated_messages = this.state.messages_content.filter(message => message.id !== message_id);
        this.setState({
            messages_content: updated_messages,
            delete_message_by_id: 0,
            total_messages: this.state.total_messages-1,
            is_show_delete_message_modal: false
        });
    }

    /**
    * DOCU: This function will add comment from a message and updates the state's value <br>
    * Triggered: render() <br>
    * Last Updated Date: December 20, 2022
    * @function
    * @memberOf Wall page
    * @param {object} comment - comment data.
    * @param {integer} message_id - message id.
    * @author Renz
    */
    handleOnAddComment = (comment, message_id) => {
        this.setState(prevState => ({
            messages_content: prevState.messages_content.map((message) => {
                if(message.id === message_id){
                    return {...message, comments: [comment, ...message.comments]}
                }
                return message;
            })
        }));
    }

    /**
    * DOCU: This function will delete comment from a message and updates the state's value <br>
    * Triggered: render() <br>
    * Last Updated Date: December 20, 2022
    * @function
    * @memberOf Wall page
    * @param {integer} comment_id - comment id.
    * @param {integer} message_id - message id.
    * @author Renz
    */
    handleOnDeleteCommentOfMessage = (comment_id, message_id) => {
        let { messages_content } = this.state;
        
        messages_content.map( message_item =>  {
            if(message_item.id === message_id){
                const updated_comments = message_item.comments.filter(comments => comments.id !== comment_id);
                return message_item.comments = updated_comments;
            }
            return message_item;
        });
        
        this.setState({messages_content});
    }

    /**
    * DOCU: This function will update comment from a message and updates the state's value <br>
    * Triggered: render() <br>
    * Last Updated Date: December 20, 2022
    * @function
    * @memberOf Wall page
    * @param {object} updated_comment - updated comment data.
    * @param {integer} message_id - message id.
    * @author Renz
    */
    handleOnUpdateComment = (updated_comment, message_id) => {
        let { messages_content } = this.state;
        
        messages_content.map( message_item =>  {
            if(message_item.id === message_id){
                let comments = message_item.comments.map((comment_item) => {
                        if (comment_item.id === updated_comment.id) {
                            return comment_item.comment = updated_comment.comment;
                        }
                        return comment_item;
                });
                return message_item = comments;
            }
            return message_item;
        });
        
        this.setState({messages_content});

    }

    render() {
        let {total_messages, is_show_create_modal, is_show_delete_message_modal, message_id, delete_message_by_id, messages_content} = this.state;
        return (
            <React.Fragment> 
                <Header></Header> 
                <section id="content_container"> 
                    <h4><span id="total_messages">{total_messages}</span> messages arranged by latest posted</h4>
                    <button onClick={() => this.setState({ is_show_create_modal: true })} id="create_message_modal_button">Create Message</button>
                    {(total_messages === 0) &&
                        <div id="empty_message_container">
                            <img src={Empty_post} alt="Empty Post" />
                            <p>No Posted Message Yet.</p>
                        </div>
                    }
                    {(total_messages !== 0) &&
                        <ul id="message_container_list">
                            {messages_content.map((messages) => (
                                <MessageContent
                                    messages={messages}
                                    showDeleteMessageModal={this.showDeleteMessageModal}
                                    handleOnUpdateMessage={this.handleOnUpdateMessage}
                                    handleOnAddComment={this.handleOnAddComment}
                                    handleOnUpdateComment={this.handleOnUpdateComment}
                                    handleOnDeleteCommentOfMessage={this.handleOnDeleteCommentOfMessage}>
                                </MessageContent>
                            ))}
                        </ul>
                    }
                    <CreateMessageModal
                        is_show={is_show_create_modal}
                        toggleShowModal={() => toggleShowModal(this, "is_show_create_modal", false)}
                        handleOnAddMessage={this.handleOnAddMessage}
                        message_id={message_id}
                    ></CreateMessageModal>
                    <DeleteMessageModal
                        is_show={is_show_delete_message_modal}
                        toggleShowModal={() => toggleShowModal(this, "is_show_delete_message_modal", false)} 
                        delete_message_by_id={delete_message_by_id}
                        handleOnDeleteMessage={this.handleOnDeleteMessage}
                    ></DeleteMessageModal>
                </section> 
            </React.Fragment>
        );
    }
}
 
export default Wall;