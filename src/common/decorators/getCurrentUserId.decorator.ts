import {
   createParamDecorator,
   ExecutionContext,
   UnauthorizedException,
 } from '@nestjs/common';

 export const GetCurrentUserId = createParamDecorator(
   (data: unknown, context: ExecutionContext) => {
       const request = context.switchToHttp().getRequest();
       const user = request.user;
       if (!user) {
         throw new UnauthorizedException(
           'You are not authorized to access this resource',
         );
       }
       return user;
   },
 );
 