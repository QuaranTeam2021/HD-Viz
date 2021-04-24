import React from 'react';
import SliderSize from './SliderSize';

export default function PCAfeatures({ attributes }) {
    const { onChangeSize, size } = attributes;

    return (
        <SliderSize onChange={onChangeSize} size={size}/>
    );
  }