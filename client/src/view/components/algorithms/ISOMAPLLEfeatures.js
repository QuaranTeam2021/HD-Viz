import RadioDistance from '../startUpOptions/RadioDistance';
import React from 'react';
import SliderNeighbors from './SliderNeighbors';
import SliderSize from './SliderSize';

export default function ISOMAPLLEfeatures({attributes}) {
    const { d, n, s } = attributes;
    const { distanza, onChangeDistanza } = d;
    const { neighbours, onChangeNeighbours } = n;
    const { onChangeSize, size } = s;

    return (
        <div>
            <RadioDistance distanza={distanza} onChange={onChangeDistanza} />
            <SliderSize size={size} onChange={onChangeSize} />
            <SliderNeighbors neighbours={neighbours} onChange={onChangeNeighbours} />
        </div>
    );
  }