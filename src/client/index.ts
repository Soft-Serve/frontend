import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { RestLink } from "apollo-link-rest";
import { UID, ACCESS_TOKEN, CLIENT_TOKEN } from "src/constants";

const authRestLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }: any) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    return {
      headers: {
        ...headers,
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "origin, content-type ",
        credentials: "same-origin",
        mode: "no-cors",
        Authorization: token,
        client: localStorage.getItem(CLIENT_TOKEN) || "",
        uid: localStorage.getItem(UID) || "",
      },
    };
  });
  return forward(operation).map(result => {
    const { restResponses } = operation.getContext();
    const authTokenResponse = restResponses.find(
      (res: { headers: { has: (arg0: string) => any } }) => res.headers.has("Authorization")
    );
    if (authTokenResponse) {
      localStorage.setItem(CLIENT_TOKEN, authTokenResponse.headers.get("Authorization"));
    }
    return result;
  });
});

const restLink = new RestLink({ uri: "https://please-work-soft-serve.herokuapp.com/" });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([authRestLink, restLink]),
});

export { client };
