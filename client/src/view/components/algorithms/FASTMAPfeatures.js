import RadioDistance from '../startUpOptions/RadioDistance';
import React from 'react';
import SliderSize from './SliderSize';

export default function FASTMAPfeatures({attributes}) {
    const { d, s } = attributes;
    const { distanza, onChangeDistanza } = d;
    const { onChangeSize, size } = s;

    return (
        <div>
            <RadioDistance distanza={distanza} onChange={onChangeDistanza} />
            <SliderSize size={size} onChange={onChangeSize} />
        </div>
    );
  }