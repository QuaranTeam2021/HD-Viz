import React from 'react';
import SelectDistanza from './SelectDistanza';
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
            <SliderSize size={size} onChange={onChangeSize} />
            <SelectDistanza distanza={distanza} onChange={onChangeDistanza} />
            <SliderNeighbors neighbours={neighbours} onChange={onChangeNeighbours} />
            <SliderPerplexity perplexity={perplexity} onChange={onChangePerplexity} />
        </div>
    );
  }