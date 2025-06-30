export interface SignUpUserRequest {
  name: string;
  email: string;
  password: string;
  birthdate: string;
  phone: string;
  status: boolean;
  roleId: number;
}
