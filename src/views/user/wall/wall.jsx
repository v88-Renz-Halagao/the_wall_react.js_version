/* React */
import React, { Component } from "react";

/* Component */
import Header from "./component/header.component";
import CreateMessageModal from "./component/create_message_modal.component";
import MessageContent from "./component/message_content.component";
import DeleteMessageModal from "./component/delete_message_modal.component";

/* Prototype Data */
import { messagesContent } from "./message_content_prototype_data";

/* CSS */
import "./wall.scss";

/* Images */
import Empty_post from "../../../assets/images/empty_post.png";

class Wall extends Component {
    constructor(props){
        super(props)

        this.state = {
            total_messages: 0,
            messages_content: messagesContent,
            message_id: 0,
            delete_message_by_id: 0,
            is_show_create_modal: false,
            is_show_delete_message_modal: false
        }
    }

    showCreateMessageModal = () => {
        this.setState({
            is_show_create_modal: true
        });
    }

    showDeleteMessageModal = (message) => {
        this.setState({
            is_show_delete_message_modal: true,
            delete_message_by_id: message.id
        });
    }

    closeCreateMessageModal = () => {
        this.setState({
            is_show_create_modal: false
        });
    }

    closeDeleteMessageModal = () => {
        this.setState({
            is_show_delete_message_modal: false
        });
    }

    handleOnAddMessage = (message) => {
        this.setState(prevState => ({
            messages_content: [...prevState.messages_content, message],
            total_messages: this.state.messages_content.length+1,
            message_id: this.state.message_id+1, 
            is_show_create_modal: false
        })); 
    }

    handleOnUpdateMessage = (updated_message) => {
        this.setState(prevState => ({
            messages_content: prevState.messages_content.map((message) => {
                if(message.id === parseInt(updated_message.id)){
                    return {
                        ...message,
                        message: updated_message.message
                    }
                }
                else{
                    return message;
                }
            })
        }));
    }

    handleOnDeleteMessage = (message_id) => {
        const updated_messages = this.state.messages_content.filter(message => message.id !== parseInt(message_id));
        this.setState({
            messages_content: updated_messages,
            delete_message_by_id: 0,
            total_messages: this.state.total_messages-1,
            is_show_delete_message_modal: false
        });
    }

    handleOnAddComment = (comment, message_id) => {
        this.setState(prevState => ({
            messages_content: prevState.messages_content.map((message) => {
                if(message.id === parseInt(message_id)){
                    return {
                        ...message,
                        comments: [...message.comments, comment]
                    }
                }
                else{
                    return message;
                }
            })
        }));
    }

    render() {
        let {total_messages, is_show_create_modal, is_show_delete_message_modal, message_id, delete_message_by_id, messages_content} = this.state;
        return (
            <React.Fragment> 
                <Header></Header> 
                <section id="content_container">
                    <h4><span id="total_messages">{total_messages}</span> messages arranged by latest posted</h4>
                    <button onClick={this.showCreateMessageModal} id="create_message_modal_button">Create Message</button>
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
                                    handleOnAddComment={this.handleOnAddComment}>
                                </MessageContent>
                            ))}
                        </ul>
                    }
                    <CreateMessageModal
                        is_show={is_show_create_modal}
                        closeCreateMessageModal={this.closeCreateMessageModal}
                        handleOnAddMessage={this.handleOnAddMessage}
                        message_id={message_id}
                    ></CreateMessageModal>
                    <DeleteMessageModal
                        is_show={is_show_delete_message_modal}
                        closeDeleteMessageModal={this.closeDeleteMessageModal}
                        delete_message_by_id={delete_message_by_id}
                        handleOnDeleteMessage={this.handleOnDeleteMessage}
                    ></DeleteMessageModal>
                </section>
            </React.Fragment>
        );
    }
}
 
export default Wall;