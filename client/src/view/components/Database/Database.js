import React, { useState } from 'react';
import { action } from 'mobx';
import AddDb from './AddDb';
import DeleteDb from './DeleteDb';


export default function Database() {
    const [insertDs, setInsertDs] = useState([]);
    const [deleteDs, setDeleteDs] = useState([]);
    const onChangeInsertDs = action(e => setInsertDs(prev => {
        let v = e.target.files[0];
        return v === undefined ? prev : v;
    }));

    const onClickDelete = e => {
        console.log("Elimna dataset");
    };

    return (
        <div>
            <AddDb onChange={onChangeInsertDs} fileName={insertDs.name} />
            <div id="dataset">
                <p>Dataset 1</p>
                <DeleteDb onChange={onClickDelete} />
            </div>

        </div>

    );
}