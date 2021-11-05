import { UserEntity } from '@sls-monorepo/users-schemas';

import client from '../client';

interface GetUserRequest {
  userId: string;
}

const getUser = async ({ userId }: GetUserRequest): Promise<UserEntity> => {
  const { data: user } = await client.get<UserEntity>(`/user/${userId}`);

  return user;
};

export default getUser;
