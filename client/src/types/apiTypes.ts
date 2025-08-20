export interface APIUser {
    email: string;
    token: string;
    loggedUser: { token: string };
}

export interface User {
    name?: string;
    email: string;
    password?: string;
    token: string;
}

export interface AuthContextType {
  loggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}