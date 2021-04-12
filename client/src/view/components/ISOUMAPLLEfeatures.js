import React from 'react';
import SelectDistanza from './SelectDistanza';
import SliderNeighbors from './SliderNeighbors';
import SliderSize from './SliderSize';


export default function ISOUMAPLLE({attributes}) {
    const { d, n, s } = attributes;
    const { distanza, onChangeDistanza } = d;
    const { neighbours, onChangeNeighbours } = n;
    const { onChangeSize, size } = s;

    return (
        <div>
            <SliderSize size={size} onChange={onChangeSize} />
            <SelectDistanza distanza={distanza} onChange={onChangeDistanza} />
            <SliderNeighbors neighbours={neighbours} onChange={onChangeNeighbours} />
        </div>
    );
  }