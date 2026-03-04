import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { authLink, errorLink, httpLink } from "./links";

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
});
