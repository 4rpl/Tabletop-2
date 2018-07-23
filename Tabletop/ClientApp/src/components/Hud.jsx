import React from 'react';
import { connect } from 'react-redux';
import Chat from './Chat';
import Users from './Users';

const mapDispatchToProps = function (dispatch) {
    return {
    };
}

const mapStateToProps = function (state) {
    return {
    };
}

class Hud extends React.Component {

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
        return (
            <div className="tt-hud">
                <div className="tt-hud-top">
                    <Users></Users>
                </div>
                <div className="tt-hud-bottom">
                    <Chat></Chat>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Hud);