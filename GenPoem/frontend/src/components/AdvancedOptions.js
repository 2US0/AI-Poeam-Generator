// src/components/AdvancedOptions.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AdvancedOptionsContainer = styled(motion.div)`
  background-color: #f9f9f9;
  color: #333;
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 8px;
  text-align: left;
  border: 1px solid #ccc;
`;

const InputField = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  width: 100%;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SelectField = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
  width: 100%;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  padding: 0.5rem;
  font-size: 1rem;
  width: 100%;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  display: block;
  font-weight: bold;
`;

const Slider = styled.input`
  width: 100%;
  margin-bottom: 1rem;
`;

const AdvancedOptions = ({ onOptionsChange }) => {
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [options, setOptions] = useState({
    creativityLevel: '1',
    poemType: 'none',
    poemSize: 'none',
    instructions: '',
    rhymeScheme: '',
    meter: '',
    toneMood: 'none',
    theme: '',
    wordComplexity: 'none',
    alliteration: 'none',
    symbolism: '',
    narrativeLyric: 'none',
  });

  const toggleAdvancedOptions = () => {
    setShowAdvancedOptions(!showAdvancedOptions);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }));
    onOptionsChange({ ...options, [name]: value });
  };

  return (
    <div>
      <button onClick={toggleAdvancedOptions} style={{ color: '#d63384', textDecoration: 'underline', border: 'none', background: 'none', cursor: 'pointer' }}>
        {showAdvancedOptions ? 'Hide Advanced Options' : 'Show Advanced Options'}
      </button>
      {showAdvancedOptions && (
        <AdvancedOptionsContainer
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.5 }}
        >
          <Label>
            Creativity Level:
            <Slider 
              type="range" 
              min="1" 
              max="10" 
              name="creativityLevel" 
              value={options.creativityLevel} 
              onChange={handleChange}
              style={{ accentColor: '#d63384' }} 
            />
          </Label>
          <Label>
            Poem Type (Optional):
            <SelectField name="poemType" value={options.poemType} onChange={handleChange}>
              <option value="none">None</option>
              <option value="haiku">Haiku</option>
              <option value="sonnet">Sonnet</option>
              <option value="free-verse">Free Verse</option>
            </SelectField>
          </Label>
          <Label>
            Poem Size (Optional):
            <SelectField name="poemSize" value={options.poemSize} onChange={handleChange}>
              <option value="none">None</option>
              <option value="short">Short</option>
              <option value="medium">Medium</option>
              <option value="long">Long</option>
            </SelectField>
          </Label>
          <Label>
            Instructions (Optional):
            <TextArea name="instructions" value={options.instructions} onChange={handleChange} placeholder="If you have any specific instructions... (e.g., write poem in the style of Robert Frost.)" />
          </Label>
          <Label>
            Rhyme Scheme (Optional):
            <InputField name="rhymeScheme" value={options.rhymeScheme} onChange={handleChange} placeholder="Enter rhyme scheme (e.g., AABB, ABAB)" />
          </Label>
          <Label>
            Meter (Optional):
            <InputField name="meter" value={options.meter} onChange={handleChange} placeholder="Enter meter (e.g., iambic pentameter)" />
          </Label>
          <Label>
            Tone/Mood (Optional):
            <SelectField name="toneMood" value={options.toneMood} onChange={handleChange}>
              <option value="none">None</option>
              <option value="happy">Happy</option>
              <option value="sad">Sad</option>
              <option value="angry">Angry</option>
            </SelectField>
          </Label>
          <Label>
            Theme (Optional):
            <InputField name="theme" value={options.theme} onChange={handleChange} placeholder="Enter theme (e.g., Nature, Love, Technology)" />
          </Label>
          <Label>
            Word Complexity (Optional):
            <SelectField name="wordComplexity" value={options.wordComplexity} onChange={handleChange}>
              <option value="none">None</option>
              <option value="simple">Simple</option>
              <option value="complex">Complex</option>
            </SelectField>
          </Label>
          <Label>
            Alliteration (Optional):
            <SelectField name="alliteration" value={options.alliteration} onChange={handleChange}>
              <option value="none">None</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </SelectField>
          </Label>
          <Label>
            Symbolism (Optional):
            <InputField name="symbolism" value={options.symbolism} onChange={handleChange} placeholder="Enter symbolism (e.g., Sun for hope, Rose for love)" />
          </Label>
          <Label>
            Narrative vs. Lyric (Optional):
            <SelectField name="narrativeLyric" value={options.narrativeLyric} onChange={handleChange}>
              <option value="none">None</option>
              <option value="narrative">Narrative</option>
              <option value="lyric">Lyric</option>
            </SelectField>
          </Label>
        </AdvancedOptionsContainer>
      )}
    </div>
  );
};

export default AdvancedOptions;
