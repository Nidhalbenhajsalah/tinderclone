import ActionTypes from './constants';

const defaultState = {
    user: 'no user',
}

export default function homePageRducer(state = defaultState, action) {
    switch (action.type) {
        case ActionTypes.SET_USER:
            return { ...state, user: action.payload }
        default:
            return state;
    }
}