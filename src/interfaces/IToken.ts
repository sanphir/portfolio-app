export interface ITokenResponse {
    accessToken: string;
    empployeeId: string;
}

export interface ITokenInfo {
    name: string,
    role: string,
    nbf: number,
    exp: number,
    iss: string,
    aud: string
}