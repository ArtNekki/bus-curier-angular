export default interface User {
  email: string;
  password: string;
  remember: boolean;
  returnSecureToken?: boolean;
}
