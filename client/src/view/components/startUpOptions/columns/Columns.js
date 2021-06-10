import React, { useEffect, useState } from 'react';
import { autorun } from 'mobx';

import { observer } from 'mobx-react-lite';
import RadioColumns from './RadioColumns';
import SelectedColumns from './SelectedColumns';
import { useStore } from '../../../../store/Store';

const Columns = observer(({ onChangeUploaded, onChangeGrouper, selectedColumns }) => {

  const store = useStore();

  const [uploadedColumns, setUploadedColumns] = useState([]);
  const [grouperColumns, setGrouperColumns] = useState([]);

  useEffect(() => autorun(() => {
    setUploadedColumns(store.getNumericFeatures());
    setGrouperColumns(store.getStringFeatures());
  }), [store]);

  return (
    <div className="colonne">
        <SelectedColumns selectedColumns={selectedColumns} uploadedColumns={uploadedColumns} onChange={onChangeUploaded} />
        <RadioColumns grouperColumns={grouperColumns} onChange={onChangeGrouper} />
    </div>
  );

});

export default Columns;
