import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut} from '../features/auth/authSlice'
import { RootState } from './store'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8180/auth-api/',
    credentials: 'include',
    prepareHeaders: (headers, { getState }: any) => {
        const token = (getState()as RootState).auth.token
        if (token) {
            headers.set(`Authorization`, `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async ({args, api, extraOptions}: any) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {
        console.log('sending refresh token frontend')
        
        // send refresh token to get new access token
        const refreshResult = await baseQuery('user/refresh', api, extraOptions)

        console.log(refreshResult)

        if(refreshResult?.data) {
            // const user = api.getState().auth.id

            const email = api.getState().auth.email // pode ser isso

            const user = api.getState().auth.user

            // store the new token
            api.dispatch(setCredentials({ ...refreshResult.data, user }))

            //retry the original query with new access token
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut({}))
        }
    }
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})