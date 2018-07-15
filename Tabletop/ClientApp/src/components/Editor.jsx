import { connect } from 'react-redux';

const mapStateToProps = function (state) {
    return {
        state: state
    };
}

const mapDispatchToProps = function (dispatch) {
    return {

    };
}

const MainMenu = () => {
    return null;
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainMenu);