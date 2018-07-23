import React from 'react';
import { connect } from 'react-redux';

const mapDispatchToProps = function (dispatch) {
    return {
    };
}

const mapStateToProps = function (state) {
    return {
        users: state.game.users,
    };
}

class Users extends React.Component {

    constructor(props) {
        super();
    }

    // TODO:
    //shouldComponentUpdate(nextProps) {
    //    return this.props.camera.x !== nextProps.camera.x
    //        || this.props.camera.y !== nextProps.camera.y
    //        || this.props.camera.scale !== nextProps.camera.scale
    //        || this.props.camera.alpha !== nextProps.camera.alpha
    //        || this.props.cards !== nextProps.cards
    //        || this.props.decks.filter(i => i.active).length > 0
    //        || this.props.cards.filter(i => i.active).length > 0;
    //}
    
    render() {
        const users = this.props.users.map(i => {
            return (
                <li key={i.id}>
                    <span className="tt-userbadge" style={{ backgroundColor: i.color }}>
                        {i.name}
                    </span>
                </li>
            );
        });
        return (
            <ul className="tt-users">
                {users}
            </ul>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);