import React, { FC } from "react";
import * as styles from "./styles";

const Container: FC = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export { Container };
