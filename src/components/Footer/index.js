import { Box, StyledLink, Flex, P, Spacer, Icon } from "orcs-design-system";
import React from "react";
import styled from "styled-components";

import icon from "../../config/icons";

import { feedback } from "./Footer.config";

export const FooterBox = styled(Box)`
  position: relative;
`;

const Footer = () => {
  return (
    <FooterBox bg="greyDarker" width="100%" p="r">
      <Flex alignItems="center" justifyContent="center">
        <Spacer mx="xs">
          <Icon icon={icon.comments} size="lg" color="white" />
          <P color="white">{feedback.text}</P>
          <StyledLink
            bold
            href={feedback.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {feedback.linkText}
          </StyledLink>
        </Spacer>
      </Flex>
    </FooterBox>
  );
};

export default Footer;
