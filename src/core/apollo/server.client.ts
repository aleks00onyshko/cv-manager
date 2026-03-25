import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { cookies } from 'next/headers';

export async function getServerApolloClient() {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    return new ApolloClient({
        link: new HttpLink({
            uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
            headers: {
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
        }),
        cache: new InMemoryCache(),
    });
}