import React from "react";
import styled, { keyframes } from "styled-components";

const fade = keyframes`
  0% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  75% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
`;

const Section = styled.section`
  position: relative;
`;

const Img = styled.img`
  position: absolute;
`;

const ImgTop = styled.img`
  animation-name: ${fade};
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-duration: 0.6s;
  animation-direction: alternate;
`;

const Animate = ({ images }) => {
  return (
    <Section>
      <Img src={images[0]} />
      <ImgTop src={images[1]} />
    </Section>
  );
};

export default Animate;
