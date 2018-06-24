import React from 'react';
import { connect } from 'react-redux';
import Card from './Card';
import Deck from './Deck';
import { addCard } from '../store/table/TableActions';

const mapDispatchToProps = function (dispatch) {
    return {
        onAddCard: () => {
            dispatch(addCard(
                null, 0, 0, 0, 0, 142, 102, false, false,
                'CardTop1.png',
                'CardBottom1.jpg'
            ));
        }
    }
}

const mapStateToProps = function (state) {
    return {
        state: state.game
    };
}

const Table = ({ state, onAddCard }) => {

    let cards = state.cards.map(card => {
        return (
            <div key={card.id}>
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
                    content={card.content}
                    visible={card.visible} />
            </div>
        );
    });

    let decks = state.decks.map(function (deck) {
        return (
            <div key={deck.id}>
                <Deck
                    id={deck.id}
                    x={deck.x}
                    y={deck.y}
                    mx={deck.mx}
                    my={deck.my}
                    z={deck.z}
                    h={deck.h}
                    w={deck.w}
                    active={deck.active}
                    length={deck.length}
                    content={deck.content} />
            </div>
        )
    });

    return (
        <div className="table">
            <button onClick={onAddCard}>Add Card</button>
            {decks}
            {cards}
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);