import React from 'react';
import SelectDistanza from './SelectDistanza';
import SliderSize from './SliderSize';

export default function FASTMAP({attributes}) {
    const { d, s } = attributes;
    const { distanza, onChangeDistanza } = d;
    const { onChangeSize, size } = s;

    return (
        <div>
            <SelectDistanza distanza={distanza} onChange={onChangeDistanza} />
            <SliderSize size={size} onChange={onChangeSize} />
        </div>
    );
  }