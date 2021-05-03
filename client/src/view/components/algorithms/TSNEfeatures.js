import RadioDistance from '../startUpOptions/RadioDistance';
import React from 'react';
import SliderEpsilon from './SliderEpsilon';
import SliderNeighbors from './SliderNeighbors';
import SliderPerplexity from './SliderPerplexity';
import SliderSize from './SliderSize';


export default function TSNEfeatures({ attributes }) {
    const { d, e, n, p, s } = attributes;
    const { distanza, onChangeDistanza } = d;
    const { epsilon, onChangeEpsilon } = e;
    const { neighbours, onChangeNeighbours } = n;
    const { perplexity, onChangePerplexity } = p;
    const { onChangeSize, size } = s;

    return (
        <div>
            <RadioDistance distanza={distanza} onChange={onChangeDistanza} />
            <SliderSize size={size} onChange={onChangeSize} />
            <SliderNeighbors neighbours={neighbours} onChange={onChangeNeighbours} />
            <SliderPerplexity perplexity={perplexity} onChange={onChangePerplexity} />
            <SliderEpsilon epsilon={epsilon} onChange={onChangeEpsilon} />

        </div>
    );
  }