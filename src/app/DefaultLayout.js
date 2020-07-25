import PropTypes from "prop-types";
import React from "react";

import Footer from "../components/Footer";
import Heading from "../components/Heading";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Heading />
      {children}
      <Footer />
    </>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node
};

export default DefaultLayout;
