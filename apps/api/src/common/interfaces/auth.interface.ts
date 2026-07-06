export interface JwtPayload {
  sub: string; // user id
  email: string;
  roles?: string[];
  permissions?: string[];
  type: 'access' | 'refresh';
}

export interface RequestUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  permissions: string[];
}
