interface IUserDto {
  name: string;
  role: string;
  email: string;
  password: string;
  confirmed?: boolean;
}

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    email: string;
    name: string;
    role: string;
    id: string;
  };
  token: string;
}

export { IUserDto, IRequest, IResponse };
