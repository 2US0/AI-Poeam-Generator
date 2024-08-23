// src/components/Navbar.js
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const NavbarContainer = styled(motion.div)`
  background-color: #333;
  color: white;
  padding: 1rem;
  text-align: center;
`;

const Navbar = () => {
  return (
    <NavbarContainer
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Poem Generator</h1>
    </NavbarContainer>
  );
};

export default Navbar;