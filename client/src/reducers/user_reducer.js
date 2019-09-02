export default function (state = {}, action) {
    switch (action.type) {
        case "USER_LOGIN":
            return {
                ...state, user: action.payload
            }
        case "CHECK_AUTH":
            return {
                ...state, user: action.payload
            }
        default: return state;
    }
}