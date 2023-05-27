export interface AccessTokenResponse {
    access_token: string
    token_type: string
    scope: string
    expires_in: number
    refresh_token?: string
}

export interface Tokens {
    access_token: string
    refresh_token: string
    user_token: string
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

export interface IApi{
    items: IItem[]
}

export interface IItem {
    album: IAlbum;
}

export interface IAlbum {
    album_type:             string;
    artists:                IArtist[];
    available_markets:      string[];
    external_urls:          IExternalUrls;
    href:                   string;
    id:                     string;
    images:                 IImage[];
    name:                   string;
    release_date:           string;
    release_date_precision: string;
    total_tracks:           number;
    type:                   string;
    uri:                    string;
}

export interface IArtist {
    external_urls: IExternalUrls;
    href:          string;
    id:            string;
    name:          string;
    type:          string;
    uri:           string;
}

export interface IExternalUrls {
    spotify: string;
}

export interface IImage {
    height: number;
    url:    string;
    width:  number;
}

export interface ISearchedAlbum {
    albums: {
        items: IAlbum[]
    }
}

/**
 *
 *  Local Api
 *
 * */

export interface UserToken {
    token: string;
    user:  User;
}

export interface User {
    id:             string;
    name:           string;
    email:          string;
    remember_token: null;
    created_at:     Date;
    updated_at:     Date;
}

export interface ResponseMessage<T> {
    data?: T[] | [] | null,
    codeError: number,
    message: string
    descriptionMessage: string
    dateMessage: Date
}

export interface IAlbumId {
    id: string
}

export interface IAlbumLocal {
    album_type:             string;
    artists:                string;
    external_urls:          string;
    id:                     string;
    images:                 string;
    name:                   string;
    release_date:           string;
    total_tracks:           number;
}