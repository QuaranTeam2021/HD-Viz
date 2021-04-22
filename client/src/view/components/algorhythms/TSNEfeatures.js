import RadioDistance from '../startUpOptions/RadioDistance';
import React from 'react';
import SliderNeighbors from './SliderNeighbors';
import SliderPerplexity from './SliderPerplexity';
import SliderSize from './SliderSize';


export default function TSNEfeatures({ attributes }) {
    const { d, n, p, s } = attributes;
    const { distanza, onChangeDistanza } = d;
    const { neighbours, onChangeNeighbours } = n;
    const { perplexity, onChangePerplexity } = p;
    const { onChangeSize, size } = s;

    return (
        <div>
            <RadioDistance distanza={distanza} onChange={onChangeDistanza} />
            <SliderSize size={size} onChange={onChangeSize} />
            <SliderNeighbors neighbours={neighbours} onChange={onChangeNeighbours} />
            <SliderPerplexity perplexity={perplexity} onChange={onChangePerplexity} />
            
        </div>
    );
  }