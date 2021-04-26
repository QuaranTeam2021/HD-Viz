import ButtonGraph from './GraphButton';
import DeleteDb from './DeleteDb'
import GuidaButtom from './GuidaButtom';
import ModifyDb from './ModifyDb';
import React from 'react'; 

export default function Database() {
    return ( 
        <div> 
            <DeleteDb/>
            <ModifyDb/>
            <ButtonGraph/>
            <GuidaButtom />
        </div>

    ); 
} 