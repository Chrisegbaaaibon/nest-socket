import { sign, verify } from 'jsonwebtoken';
import { JWT_SECRET, JWT_REFRESH_SECRET } from 'src/config/env.config';
import { User, UserDocument } from 'src/models/user.model';

interface Token<T=any, U=any> {
   accessToken?: T;
   refreshToken?: U;
}
interface JwtPayload {
   id: string
}

export const generateToken = (user:  UserDocument ):Token => {
   const payload: JwtPayload = {
      id: user.id
   };
   const accessToken = sign(payload, JWT_SECRET, {expiresIn: '7d'});
   const refreshToken = sign(payload, JWT_REFRESH_SECRET, {expiresIn: '7d'});
   return {
      accessToken,
      refreshToken
   };
};