import React from 'react';
import SelectDimensione from './SelectDimensione';
import SliderNeighbors from './SliderNeighbors';
import SliderPerplexity from './SliderPerplexity';
import SliderSize from './SliderSize';

export default function TSNE() {
    
    return (
        <div>
        <SliderSize/>
        <SelectDimensione/>
        <SliderNeighbors/>
        <SliderPerplexity/>
        </div>
    );
  }