import jwtDecode from 'jwt-decode';

interface CognitoToken {
  username: string;
}

export const extractJwt = (authorizationHeader: string): string => {
  const rawToken = authorizationHeader.replace(/^Bearer /, '');

  const decoded = jwtDecode<CognitoToken>(rawToken);

  return decoded.username;
};
