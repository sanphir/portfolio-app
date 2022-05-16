export interface ITokenResponse {
    accessToken: string;
    refreshToken: string;
}

export interface ITokenInfo {
    name: string,
    role: string,
    nbf: number,
    exp: number,
    iss: string,
    aud: string
}