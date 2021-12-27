import React, { FormEvent, useState } from "react";
import type { FC } from "react";
import { Button, Input, Container } from "@base";
import { MenuPage } from "../MenuPage";

import { useParseCsvMutation } from "./ParseCsv.mutation";

const AdminPage: FC = () => {
  const [restaurantId, setRestaurantId] = useState("");
  const [filePath, setFilePath] = useState("");

  const [parseCsv] = useParseCsvMutation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    parseCsv({
      variables: {
        input: {
          file_path: filePath,
          restaurant_id: restaurantId,
        },
      },
    });
  };
  return (
    <MenuPage>
      <Container>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mt-4 w-full">
            <Input
              labelText="Restaurant ID:"
              onChange={e => {
                setRestaurantId(e.target.value);
              }}
              value={restaurantId}
              name="restaurant-id"
              id="restaurant-id"
              required
            />

            <input
              type="file"
              id="file-path"
              name="file-path"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onChange={e => {
                if (e.target?.files?.[0].name) setFilePath(e.target?.files?.[0].name);
              }}
              required
            />
          </div>

          <Button isFullwidth size="XXL" type="submit">
            Upload CSV
          </Button>
        </form>
      </Container>
    </MenuPage>
  );
};

export { AdminPage };
