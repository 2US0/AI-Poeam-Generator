// src/components/PoemDisplay.js
import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const PoemContainer = styled(motion.div)`
  margin: 1rem auto; /* Center the container horizontally */
  padding: 1.5rem;
  border: 2px solid #d63387;
  border-radius: 12px;
  background-color: #f9f9f9;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  font-family: "Courier New", Courier, monospace;
  width: 55%;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const EmotionList = styled(motion.div)`
  margin: 1rem auto;
  margin-top: 1.5rem;
  padding: 1.5rem;
  border-top: 1px solid #d63384;
  font-size: 1rem;
  color: #555;
  display: flex;
  border: 2px solid #d63387;
  border-radius: 12px;
  background-color: #f9f9f9;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  font-family: "Courier New", Courier, monospace;
  width: 55%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const PreStyled = styled.pre`
  white-space: pre-wrap; 
`;

const PoemDisplay = ({ poem, emotions }) => {
  console.log("POEMDISPLAY:", poem);
  const poemCharacters = poem.split('');
  return (
    <div className="row justify-content-center d-flex container">
      <div className="col-md-8">
        <PoemContainer
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          <PreStyled>
            {poemCharacters.map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.05, delay: index * 0.05 }}
              >
                {char}
              </motion.span>
            ))}
          </PreStyled>
        </PoemContainer>
        {Object.keys(emotions).length > 0 && (
          <EmotionList
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <h2>Detected Emotions:</h2>
            <ul>
              {Object.entries(emotions).map(([emotion, value]) => (
                <motion.li
                  key={emotion}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.2,
                    delay: 0.05 * Object.keys(emotions).indexOf(emotion),
                  }}
                >
                  {emotion}: {value}
                </motion.li>
              ))}
            </ul>
          </EmotionList>
        )}
      </div>
    </div>
  );
};

export default PoemDisplay;
