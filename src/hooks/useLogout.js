import { useAuthContext } from "./useAuthContext"


export const useLogout = () => {
    const { dispatch } = useAuthContext()

    const logout = () => {
        // delete token from local storage
        localStorage.removeItem('user');
        localStorage.removeItem('videoIndex');

        // dispatch logout action
        dispatch({ type: 'LOGOUT' })
    }

    return { logout };
}