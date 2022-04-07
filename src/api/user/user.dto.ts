interface IUserDto {
  name: string;
  role: string;
  email: string;
  password: string;
  confirmed?: boolean;
}

export { IUserDto };
