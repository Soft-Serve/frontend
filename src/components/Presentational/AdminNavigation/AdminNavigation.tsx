import React, { FC } from "react";
import { Link, useHistory } from "react-router-dom";
import { routes } from "src/routes";
import { Button } from "@base";
import { useCurrentUserQuery, useSignOutMutation } from "@shared";

const AdminNavigation: FC = () => {
  const history = useHistory();
  const [signOut] = useSignOutMutation();
  const { data, loading } = useCurrentUserQuery();

  if (loading) return <p>loading</p>;

  const signUserOut = () => {
    localStorage.clear();
    signOut({ variables: { input: {} } });
    history.push(routes.signIn);
  };

  return (
    <nav>
      <ul>
        {!data && (
          <li className="m-2 inline-block">
            <Link to={routes.signIn}>
              <Button type="button" colour="primary" size="M">
                Sign in
              </Button>
            </Link>
          </li>
        )}

        {data && (
          <li className="m-2 inline-block">
            <Button onClick={signUserOut} type="button" colour="primary" size="M">
              sign out
            </Button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export { AdminNavigation };
