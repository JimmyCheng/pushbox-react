import React from "react";

import { Header, StyledLink } from "orcs-design-system";

const Heading = () => {
  return (
    <>
      <Header
        appName={
          <StyledLink bold white to="/">
            Push Box
          </StyledLink>
        }
        logoutFunction={() => {}}
        userName={"Jimmy Cheng"}
      />
    </>
  );
};

export default React.memo(Heading);
