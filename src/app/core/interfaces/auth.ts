export interface FbAuthResponse {
  idToken: string;
  expiresIn: string;
}

export interface User {
  email: string;
  password: string;
  remember: boolean;
  returnSecureToken?: boolean;
}
