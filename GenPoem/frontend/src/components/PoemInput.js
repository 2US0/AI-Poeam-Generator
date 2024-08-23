import React, { useState, useEffect } from 'react';
import AdvancedOptions from './AdvancedOptions';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

const InputField = styled(motion.input)`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled(motion.button)`
  background-color: #d63384;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
`;

const LoadingAnimation = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  font-size: 1.5rem;
  color: #d63384;
`;

const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
`;

const Dot = styled.div`
  width: 1rem;
  height: 1rem;
  background-color: #d63384;
  border-radius: 50%;
  display: inline-block;
  animation: ${bounce} 1.4s infinite ease-in-out both;
  &:nth-child(1) {
    animation-delay: -0.32s;
  }
  &:nth-child(2) {
    animation-delay: -0.16s;
  }
`;

const PoemInput = ({ onReceiveData }) => {
  const [prompt, setPrompt] = useState('');
  const [options, setOptions] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [genText, setGenText] = useState('Try your luck');

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleOptionsChange = (newOptions) => {
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    socket.emit('generate_poem', { prompt, options });
  };

  useEffect(() => {
    socket.on('poem_response', (data) => {
      onReceiveData(data);
      setIsLoading(false);
    });
    return () => socket.off('poem_response');
  }, [onReceiveData]);

  useEffect(() => {
    if (prompt.length >= 1) {
      setGenText('Generate Poem');
    } else {
      setGenText('Try your luck');
    }
  }, [prompt]);

  return (
    <>
      <motion.form
        onSubmit={handleSubmit}
        style={{ maxWidth: '600px', margin: '0 auto' }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <label>
          <h2>What's on your mind?</h2>
          <InputField
            type="text"
            value={prompt}
            onChange={handlePromptChange}
            placeholder="Get a random poem or type here..."
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </label>
        <AdvancedOptions onOptionsChange={handleOptionsChange} />
        <Button
          type="submit"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {genText}
        </Button>
      </motion.form>
      <AnimatePresence>
        {isLoading && (
          <LoadingAnimation
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Dot />
            <Dot />
            <Dot />
          </LoadingAnimation>
        )}
      </AnimatePresence>
    </>
  );
};

export default PoemInput;