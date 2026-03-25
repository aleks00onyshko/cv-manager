import { gql } from '@apollo/client';
import type { User } from 'cv-graphql';
import { cookies } from 'next/headers';
import { getServerApolloClient } from '../apollo/server.client';

const GET_USER_QUERY = gql`
  query GetUser($userId: ID!) {
    user(userId: $userId) {
      id
      email
      role
      profile {
        full_name
        avatar
      }
    }
  }
`;

export async function getServerUser(): Promise<User | null> {
    const cookieStore = await cookies();
    const userId = cookieStore.get('user_id')?.value;

    if (!userId) return null;

    try {
        const client = await getServerApolloClient();
        const { data } = await client.query<{ user: User }>({
            query: GET_USER_QUERY,
            variables: { userId },
        });

        console.log(data?.user);

        return data?.user ?? null;
    } catch {
        return null;
    }
}