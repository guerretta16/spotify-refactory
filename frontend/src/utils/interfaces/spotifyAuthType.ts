export interface AccessTokenResponse {
    access_token: string
    token_type: string
    scope: string
    expires_in: number
    refresh_token?: string
}

export interface RequiredToken {
    code: string
    refresh_token: string
}

export interface AccessTokenRequest {
    code?: string,
    refresh_token?: string
    grant_type: string
    redirect_uri: string
    client_id: string
    client_secret: string
}

/*
*
* Spotify Api Types
*
* */

export interface Album {
    album_type: string
    total_tracks: number
    available_markets: string[]
    external_urls: ExternalUrls
    href: string
    id: string
    images: Image[]
    name: string
    release_date: Date
    release_date_precision: string
    type: string
    uri: string
    artists: Artist[]
}

export interface Artist {
    external_urls: ExternalUrls
    href: string
    id: string
    name: string
    type: string
    uri: string
}

export interface ExternalUrls {
    spotify: string
}

export interface Image {
    url: string
    height: number
    width: number
}
