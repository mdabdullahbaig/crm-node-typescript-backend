export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  isAgent: boolean;

  createUser: (
    firstName_body: string,
    lastName_body: string,
    email_body: string,
    password_body: string
  ) => void;

  getUserProfile: () => void;

  getUsers: () => void;

  updateUserById: (
    firstName_body: string,
    lastName_body: string,
    id_params: string
  ) => void;

  deleteUserById: (id_params: string) => void;
}
