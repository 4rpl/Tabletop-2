import React from 'react';
import { connect } from 'react-redux';
import Hud from './Hud';
import Table from './Table';

const mapDispatchToProps = function (dispatch) {
    return {
    };
}

const mapStateToProps = function (state) {
    return {
    };
}

class Game extends React.Component {

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
            <div className="tt-game">
                <Table></Table>
                <Hud></Hud>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);