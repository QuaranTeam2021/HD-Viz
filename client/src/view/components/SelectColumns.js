/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState} from 'react';
import { autorun } from 'mobx';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { observer } from 'mobx-react-lite';
import { purple } from '@material-ui/core/colors';
import { useModel } from '../../model/Model';
import { withStyles } from '@material-ui/core/styles';

const PurpleCheckbox = withStyles({
  checked: {},
  root: {
    '&$checked': {
      color: purple[600],
    },
    color: purple[400],
  },
})(props => <Checkbox color="default" {...props} />);

const SelectColumns = observer(() => {

  /* useModel() definito dentro a Model.js, ci permette di usare il modello fornito dal provider in App.js
   così ci riferiamo sempre alla stessa istanza */
  const model = useModel();

  /* questi sono hooks di react, si usa sempre il metodo set per cambiarne il valore */
  const [uploadedColumns, setUploadedColumns] = useState([]);

 /* qui succede tutto => useEffect() ascolta i cambiamenti sul array di dipendenze ( in questo caso ascolta i cambiamenti su model)
  * autorun (guarda sulla pagina mobx) => chiama automaticamente il setUploadedColumns che imposta in uploadedColumns il campo model._features 
  * questo campo è aggiornato essendo eseguito solo quando model cambia
  * 
  * ATTENTO: useEffect() viene sempre eseguito una volta quando l'app viene renderizzata la prima volta
  * 
  **/
 useEffect(() => autorun(() => {
          setUploadedColumns(model._features)
      }), [model])

  /*
  * infine cosa succede?? essendo uploadedColumns uno stato di questa componente, ad ogni cambiamento react ri-renderizza la pagina
  * In questo caso le colonne dei dati dal modello vengono settati dentro uploadedColumns
  * Usiamo quei valori per generare i checkbox di selezione nel codice a seguire
  * 
  **/
  return (
    <div>
    <FormGroup row>
      {
        uploadedColumns.map((d, i) => <FormControlLabel key={i} control={<PurpleCheckbox />}
        label={d}
      />)
      }
    </FormGroup>
    </div>
  );
  
})

export default SelectColumns;