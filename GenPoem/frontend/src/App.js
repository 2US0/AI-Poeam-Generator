import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Navbar from './components/Navbar';
import PoemInput from './components/PoemInput';
import PoemDisplay from './components/PoemDisplay';

const socket = io('http://localhost:5000');

const App = () => {
  const [poem, setPoem] = useState('');
  const [emotions, setEmotions] = useState({});

  useEffect(() => {
    // Listen for the 'poem_response' event
    socket.on('poem_response', (data) => {
      handleReceiveData(data);
    });

    // Clean up the effect
    return () => {
      socket.off('poem_response');
    };
  }, []);

  // Function to handle received data and update the state
  const handleReceiveData = (data) => {
    console.log('Poem received:', data);
    if (data && data.poem && data.emotions) {
      setPoem(data.poem);
      setEmotions(data.emotions);
    }
  };

  return (
    <div className="container">
      <Navbar />
      <PoemInput socket={socket} onReceiveData={handleReceiveData} />
      {poem && <PoemDisplay poem={poem} emotions={emotions} />}
    </div>
  );
};

export default App;
