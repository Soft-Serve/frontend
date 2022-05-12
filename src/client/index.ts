import { ApolloClient, InMemoryCache, ApolloLink } from "@apollo/client";
import { RestLink } from "apollo-link-rest";
import { setContext } from "@apollo/client/link/context";
import { uid, accessToken, clientToken } from "src/constants";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );
  }

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const uri =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_DEV_API_URL;

const link = new RestLink({
  uri,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.",
      "Content-Type": "application/json; charset=utf-8",
      "access-token": localStorage.getItem(accessToken) || "",
      client: localStorage.getItem(clientToken) || "",
      uid: localStorage.getItem(uid) || "",
    },
  };
});

const client = new ApolloClient({
  defaultOptions: {
    watchQuery: {
      errorPolicy: "all",
    },
    query: {
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
    },
  },
  link: ApolloLink.from([authLink, link, errorLink]),
  cache: new InMemoryCache(),
});
export { client };
