import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export interface AuthUser {
  sub: string;
}

export const currentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AuthUser => {
    const { req } = GqlExecutionContext.create(context).getContext();

    return req.user;
  },
);
