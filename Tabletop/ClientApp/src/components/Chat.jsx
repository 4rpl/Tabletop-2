import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { sendMessage } from '../store/table/TableActions';

const mapStateToProps = (state) => {
    return {
        chat: state.game.chat,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSendMessage: (message) => {
            dispatch(sendMessage(message));
        },
    };
}

class Chat extends React.Component {

    constructor(props) {
        super();
        this.sendMessage = this.sendMessage.bind(this);
    }

    sendMessage() {
        const { onSendMessage } = this.props;
        onSendMessage('lol');
    }

    render() {
        const { chat } = this.props;
        const messages = chat.map(i => {
            const sender = <span><span className="tt-chat-sender" style={{ color: i.color }}>{i.from}</span>:</span>;
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
                <div className="tt-chat-messages">
                    <div className="tt-chat-messages-wrapper">
                        {messages}
                    </div>
                </div>
                <div className="tt-chat-input">
                    <input />
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