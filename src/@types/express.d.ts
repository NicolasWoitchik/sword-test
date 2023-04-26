declare namespace Express {
  export interface Request {
    user: {
      id: number;
      role_id: number;
    };
  }
}
