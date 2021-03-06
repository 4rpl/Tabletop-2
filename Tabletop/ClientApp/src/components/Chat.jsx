﻿import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { sendMessage, changeChatInput } from '../store/table/TableActions';

const mapStateToProps = (state) => {
    return {
        chat: state.game.chat,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeInput: (value) => {
            dispatch(changeChatInput(value));
        },
        onSendMessage: (message) => {
            dispatch(sendMessage(message));
        },
    };
}

class Chat extends React.Component {

    constructor(props) {
        super();
        this.sendMessage = this.sendMessage.bind(this);
        this.changeInput = this.changeInput.bind(this);
        this.onInputKeyDown = this.onInputKeyDown.bind(this);
    }

    sendMessage() {
        const { onSendMessage, chat } = this.props;

        if (chat.value) {
            onSendMessage(chat.value);
        }
        this.refs.input.focus();
    }

    changeInput(event) {
        const { onChangeInput } = this.props;
        onChangeInput(event.target.value);
    }

    onInputKeyDown(e) {
        switch (e.keyCode) {
            case 13: {
                const { chat } = this.props;
                this.sendMessage(chat.value);
                break;
            }
            default: {
                break;
            }
        }
    }

    componentDidUpdate() {
        const { log, msgWrapper } = this.refs;
        if (msgWrapper.children.length > 0) {
            // Первый, т.к. расположены column-reversed
            const lastChildHeight = msgWrapper.children[0].scrollHeight;
            const contentHeight = log.children[0].offsetHeight;
            const windowHeigth = log.offsetHeight;
            if (log.scrollTop + windowHeigth + lastChildHeight >= contentHeight) {
                log.scrollTop = contentHeight;
            }
        }
    }

    render() {
        const { chat } = this.props;
        const messages = chat.log.map(i => {
            const sender = <span><span className="tt-chat-sender" style={{ background: i.color }}>{i.from}</span>:</span>;
            const date = <span className="tt-chat-date">{moment(i.date).format('HH:mm:ss')}</span>;
            const msg = <span className="tt-chat-message">{i.message}</span>;
            return (
                <span key={i.date + i.from}>
                    {date} {sender} {msg}
                </span>
            );
        });
        return (
            <div className="tt-chat">
                <div ref="log" className="tt-chat-messages">
                    <div ref="msgWrapper" className="tt-chat-messages-wrapper">
                        {messages}
                    </div>
                </div>
                <div className="tt-chat-input">
                    <input ref="input" onChange={this.changeInput} onKeyDown={this.onInputKeyDown} value={chat.value} />
                    <button onClick={this.sendMessage}>Отправить</button>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chat);