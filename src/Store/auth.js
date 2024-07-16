import { createSlice } from '@reduxjs/toolkit'


const initialAuthState = { token: '', isLoggedin: false }
const AuthSlice = createSlice({
    name: 'Authentication',
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            state.isLoggedin = true
            state.token = action.payload
            localStorage.setItem('Token', state.token)
        },
        logout(state) {
            state.isLoggedin = false
            state.token = ''
            localStorage.removeItem('Token')
        }
    }
})

export const AuthAction = AuthSlice.actions
export default AuthSlice
