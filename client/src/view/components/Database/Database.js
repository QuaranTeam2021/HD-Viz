import React, {useState} from 'react';
import { action } from 'mobx';
import AddDb from './AddDb';
import DeleteDb from './DeleteDb';
import Dataset from './AddDb';


export default function Database() {
    const [insertDs, setInsertDs] = useState([]);
    const [deleteDs, setDeleteDs] = useState([]);
    const onChangeInsertDs = action(e => setInsertDs(prev => {
        let v = e.target.files[0];
        return v === undefined ? prev : v;
      }));  
     
      const onClickDelete = e => { 
           }  
          
        return ( 
        <div> 
            <AddDb onChange={onChangeInsertDs} fileName={insertDs.name} /> 
            <div id="dataset">
                <p>Dataset 1</p>
                <DeleteDb onChange={onClickDelete}/>
            </div>
                
            </div>

    ); 
} 