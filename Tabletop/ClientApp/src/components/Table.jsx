import React from 'react';
import { connect } from 'react-redux';
import Card from './Card';

const mapStateToProps = function (state) {
    return {
        state: state.game
    };
}

const Table = ({ state }) => {
    let cards = state.cards.map(card => {
        return (
            <div key={'card_' + card.id}>
                <Card
                    id={card.id}
                    x={card.x}
                    y={card.y}
                    mx={card.mx}
                    my={card.my}
                    z={card.z}
                    h={card.h}
                    w={card.w}
                    active={card.active}
                    contentTop={card.contentTop}
                    contentBottom={card.contentBottom}
                    visible={card.visible} />
            </div>
        );
    });

    return (
        <div className="table">
            {cards}
        </div >
    );
}

export default connect(mapStateToProps)(Table);