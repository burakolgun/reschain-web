import chainConstant from '../../../Constant/chainConstant';

let initialState = {
    chains: {},
    loading: false,
};

export default function chainReducer(state = initialState, action) {
    switch (action.type) {
        case chainConstant.SET_CHAIN:
            return Object.assign({}, state, {
                chains: action.payload.chains,
                loading: action.payload.loading,
            });

        default: return state
    }
}
