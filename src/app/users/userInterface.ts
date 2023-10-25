export interface IUser {
  email: string;
  password: string;
  cart: {
    id: string;
  }[];
}
