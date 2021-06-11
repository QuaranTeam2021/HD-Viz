import React, { useEffect } from 'react';
import { autorun } from 'mobx';

import { observer } from 'mobx-react-lite';
import RadioColumns from './RadioColumns';
import SelectColumns from './SelectColumns';
import { useStore } from '../../../../store/Store';

const Columns = observer(({ onChangeUploaded, onChangeGrouper, selectedColumns }) => {

  const store = useStore();

  const [uploadedColumns, setUploadedColumns] = React.useState([]);
  const [grouperColumns, setGrouperColumns] = React.useState([]);

  useEffect(() => autorun(() => {
    setUploadedColumns(store.getNumericFeatures());
    setGrouperColumns(store.getStringFeatures());
  }), [store]);

  return (
    <div className="colonne">
        <SelectColumns selectedColumns={selectedColumns} uploadedColumns={uploadedColumns} onChange={onChangeUploaded} />
        <RadioColumns grouperColumns={grouperColumns} onChange={onChangeGrouper} />
    </div>
  );

});

export default Columns;
