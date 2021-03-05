interface Action {
    type: string;
    payload: any
}
type User = {
    [key: string]: any;
}

type AuthState = {
    user: User,
    loading: boolean,
    error: any
}

export const authDataInitialState: AuthState = {
    user: {},
    loading: false,
    error: null
}
const AuthData = (state: typeof authDataInitialState, action: Action) => {
    switch (action.type) {
        case "SIGN_UP":
            return {
                ...state,
                user: action.payload
            }
        case "SIGN_IN":
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }


}

export default AuthData