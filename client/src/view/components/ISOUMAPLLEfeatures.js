import React from 'react';
import SelectDimensione from './SelectDimensione';
import SliderNeighbors from './SliderNeighbors';
import SliderSize from './SliderSize';


export default function ISOUMAPLLE() {
    
    return (
        <div>
        <SliderSize/>
        <SelectDimensione/>
        <SliderNeighbors/>
        </div>
    );
  }