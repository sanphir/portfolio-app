export interface ITokenResponse {
    accessToken: string;
    employeeId: string;
}

export interface ITokenInfo {
    name: string,
    role: string,
    nbf: number,
    exp: number,
    iss: string,
    aud: string
}