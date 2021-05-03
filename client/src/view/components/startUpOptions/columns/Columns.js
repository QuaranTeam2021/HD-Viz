import React, { useEffect, useState } from 'react';
import { autorun } from 'mobx';
import CheckboxColumns from './CheckboxColumns';
import { observer } from 'mobx-react-lite';
import RadioColumns from './RadioColumns';
import { useStore } from '../../../../store/Store';

const Columns = observer(({ onChangeUploaded, onChangeGrouper }) => {

  const store = useStore();

  const [uploadedColumns, setUploadedColumns] = useState([]);
  const [grouperColumns, setGrouperColumns] = useState([]);

  useEffect(() => autorun(() => {
    setUploadedColumns(store.getNumericFeatures());
    setGrouperColumns(store.getStringFeatures());
  }), [store]);

  return (
    <div className="colonne">
      <CheckboxColumns uploadedColumns={uploadedColumns} onChange={onChangeUploaded} />
      <RadioColumns grouperColumns={grouperColumns} onChange={onChangeGrouper} />
    </div>
  );

});

export default Columns;
