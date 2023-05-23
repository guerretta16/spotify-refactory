import {AccessTokenRequest, RequiredToken} from "../interfaces/spotifyAuthType.ts";

export const getTokenParams = (token: Partial<RequiredToken>, tokenType: string): AccessTokenRequest => ({
    ...token,
    grant_type: tokenType,
    client_id: import.meta.env.VITE_CLIENT_ID,
    client_secret: import.meta.env.VITE_CLIENT_SECRET,
    redirect_uri: import.meta.env.VITE_REDIRECT_URI
})