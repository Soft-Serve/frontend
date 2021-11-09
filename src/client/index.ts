import { ApolloClient, InMemoryCache } from "@apollo/client";
import { RestLink } from "apollo-link-rest";
import { setContext } from "@apollo/client/link/context";
import { UID, ACCESS_TOKEN, CLIENT_TOKEN } from "src/constants";

const uri =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_DEV_API_URL;

const link = new RestLink({
  uri,
  headers: {
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.",
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
  },
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "access-token": localStorage.getItem(ACCESS_TOKEN) || "",
      client: localStorage.getItem(CLIENT_TOKEN) || "",
      uid: localStorage.getItem(UID) || "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
});
export { client };
