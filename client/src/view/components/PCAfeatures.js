import React from 'react';
import SliderSize from './SliderSize';

export default function PCA({ attributes }) {
    const { onChangeSize, size } = attributes;

    return (
        <SliderSize onChange={onChangeSize} size={size}/>
    );
  }