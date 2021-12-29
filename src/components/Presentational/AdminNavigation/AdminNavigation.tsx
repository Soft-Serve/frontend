import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "src/routes";
import { Button } from "@base";
import { CURRENT_USER_QUERY, useCurrentUserQuery, useSignOutMutation } from "@shared";

const AdminNavigation: FC = () => {
  const navigate = useNavigate();
  const { data, loading } = useCurrentUserQuery();
  const [signOut] = useSignOutMutation({
    refetchQueries: [
      {
        query: CURRENT_USER_QUERY,
      },
    ],
  });

  const signUserOut = () => {
    localStorage.clear();
    signOut({ variables: { input: {} } });
    navigate(routes.signIn);
  };

  if (loading) return <p>loading</p>;
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
