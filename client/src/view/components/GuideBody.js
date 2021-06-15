import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import React from 'react';
import WarningTwoTone from '@material-ui/icons/WarningTwoTone';

export default function GuideBody() {

  return (
    <>
      <h4>Introduzione</h4>
      <p>Questa guida ti sarà utile per capire cosa puoi fare con HD Viz e come muoverti all&apos;interno dell&apos;applicazione.</p>
      <h4>Menù</h4>
      <p>All&apos;avvio dell&apos;applicazione viene visualizzata la pagina iniziale (ovvero il menù presente in tutte le pagine, in forma allargata), che contiene 4 pulsanti:</p>
      <dl>
        <dt className="imitate nav button">Nuovo grafico</dt>
        <dd>questo bottone ti permette di creare un nuovo grafico e visualizzarlo una volta terminata la procedura.</dd>
        <dt className="imitate nav button">Gestisci database</dt>
        <dd>questo bottone ti permette di aggiungere dei dataset al database e gestirli.</dd>
        <dt className="imitate nav button">Guida</dt>
        <dd>apre questa guida.</dd>
        <dt className="imitate nav button">Manuale utente</dt>
        <dd> questo bottone ti permette di accedere al manuale utente, un manuale che spiega in dettaglio tutte le funzionalità dell&apos;applicazione, e la sua configurazione; riporta inoltre la descrizione delle funzioni di riduzione dimensionale, degli algoritmi e delle metriche per il calcolo della distanza che è possibile utilizzare in HD Viz.</dd>
      </dl>
      <p>Nelle altre pagine sono inoltre presenti questi pulsanti:</p>
      <dl>
        <dt className="imitate nav button">Home</dt>
        <dd>ritorna alla pagina iniziale.</dd>
        <dt className="imitate nav button">Visualizzazione</dt>
        <dd> vai alla pagina dove sono presenti i grafici (sarà disponibile solo se almeno un grafico è stato creato).</dd>
      </dl>

      <h4>Nuovo grafico</h4>
      <p>Scegliendo l&apos;opzione <span className="imitate button">Nuovo grafico</span> la pagina ti mostrerà 2 possibili scelte:</p>
      <dl>
        <dt className="imitate button">File locale</dt>
        <dd>è il bottone che permette il caricamento di un file da locale in formato .csv, .tsv o .json.</dd>
        <Card variant="outlined" className="message"><CardContent>
          <WarningTwoTone fontSize="large" color="error" /> Solo i formati indicati sono supportati. Inoltre non è possibile caricare file vuoti o troppo grandi (massimo 2000 righe e 50kb).
        </CardContent></Card>
        <dt className="imitate button">Database</dt>
        <dd>è il bottone che permette di selezionare le tabelle e le colonne da cui estrarre i dati multi-dimensionali che sono presenti nel database.</dd>
        <Card variant="outlined" className="message">
          <CardContent>
            <WarningTwoTone fontSize="large" color="error" /> Per poter caricare una tabella dal database devi essere connesso al server e il database non deve essere vuoto.
          </CardContent></Card>
      </dl>
      <p>Se sei già connesso allora potrai selezionare una tabella attraverso il menù a tendina che apparirà cliccando su <em>Tabelle</em>.</p>
      <p>Una volta selezionata la tabella appariranno le colonne corrispondenti e cliccando su <em>Colonne</em> si potranno selezionare più colonne.</p>
      Una volta terminato basta cliccare su <span className="imitate button">Scegli questi dati</span>.
      <p></p>
      <p>Dopo aver caricato correttamente il dataset da file o dal database, appariranno le opzioni per creare un grafico.</p>
      <Card variant="outlined" className="message"><CardContent>
        <WarningTwoTone fontSize="large" color="error" /> Alcune opzioni sono disponibili solo per alcuni tipi di grafici.
      </CardContent></Card>
      <p>Ti viene chiesto quindi di scegliere:</p>
      <dl>
        <dt className="list normal-weight">Le <strong>colonne</strong> dei dati</dt>
        <dd>
          <p>vengono visualizzate tutte le colonne numeriche del dataset caricato.</p>
          <p>È necessario selezionare almeno una colonna per poter creare correttamente il grafico.</p>
        </dd>
        <Card variant="outlined" className="message"><CardContent>
          <WarningTwoTone fontSize="large" color="error" /> Per il grafico Scatterplot Matrix, non è possibile creare un grafico se si selezionano più di 5 colonne senza scegliere un algoritmo di riduzione.
        </CardContent></Card>
        <dt className="list normal-weight">Il <strong>raggruppamento</strong> dei dati</dt>
        <dd><p>
          vengono visualizzate tutte le colonne di stringhe del dataset caricato, da cui sceglierne una da utilizzare come raggruppamento: tutti i dati con lo stesso valore su questa colonna verranno colorati con lo stesso colore.
          <p>È necessario selezionarne una per poter creare un grafico.</p>
        </p></dd>
        <dt className="list normal-weight">La <strong>normalizzazione</strong></dt>
        <dd> se attiva, <strong>tutti i dati</strong> verranno portati in un intervallo compreso tra <strong>0</strong> e <strong>1</strong>.</dd>
        <dt className="list normal-weight">Il <strong>tipo</strong> di grafico</dt>
        <dd>
          <p>è necessario selezionarne uno per poter creare un grafico.</p>
          <ul>
            <li>Scatterplot Matrix</li>
            <li>Heatmap</li>
            <li>Force Field</li>
            <li>Proiezione Multiassi</li>
          </ul>
        </dd>
        <dt className="list normal-weight">La <strong>metrica</strong> per la distanza</dt>
        <dd>
          <p>questa selezione appare solo se è stato selezionato il grafico Heatmap o Force Field. Per la definizione delle metriche si rimanda ai riferimenti del manuale utente</p>
          <ul>
            <li>Euclidean</li>
            <li>Cosine</li>
            <li>Euclidean Squared</li>
            <li>Canberra</li>
            <li>Chebyshev</li>
          </ul>
        </dd>
        <dt className="list normal-weight">L&apos;<strong>algoritmo</strong> di riduzione dimensionale</dt>
        <dd>
          <p>
            questa selezione appare solo se è stato selezionato il grafico Scatterplot Matrix o Proiezione Multiassi. Per la definizione della funzione di riduzione dimensionale si rimanda ai riferimenti del manuale utente. È possibile evitare la riduzione dimensionale selezionando <em>Nessuna riduzione</em> tra le opzioni di scelta.
          </p>
          <ul>
            <li>FASTMAP</li>
            <li>ISOMAP</li>
            <li>UMAP</li>
            <li>T-SNE</li>
            <li>LLE</li>
          </ul>
          <p>Ogni funzione di riduzione ha dei parametri diversi da impostare per poter funzionare. Tutti i parametri sono richiesti per poter creare un grafico. Per una descrizione di tutti i parametri si rimanda ai riferimenti del manuale utente.</p>
        </dd>
      </dl>
      <p>Al termine di tutte le selezioni è sufficiente premere il pulsante <span className="imitate button">conferma</span> e attendere la creazione del grafico, che verrà visualizzato una volta elaborati i dati.</p>

      <h4>Visualizzazione</h4>
      <p>In questa pagina sono visualizzati tutti i grafici creati fino a quel momento.</p>
      <p>Per ogni grafico sono disponibili delle opzioni per apportare modifiche alla visualizzazione, e per applicarle è necessario premere il bottone <span className="imitate button">Conferma</span>.</p>
      <p>È possibile inoltre rinominare il grafico dall&apos;apposito campo, oppure eliminarlo premendo il bottone dedicato.</p>
      <p>In ogni tipo di grafico, è possibile posizionare il cursore sopra un dato per visualizzare i valori di cui è composto.</p>

      <h4>Gestione dataset</h4>
      <p>In questa pagina è possibile gestire i dataset presenti nel database.</p>
      <p>Per inserirne uno, basta premere l&apos;icona <AddIcon fontSize="small" color="primary" />, inserire un nome valido, e premere <span className="imitate button">Invia</span>.</p>
      <Card variant="outlined" className="message"><CardContent>
        <WarningTwoTone fontSize="large" color="error" /> Solo file di formato .csv e .tsv possono essere salvati sul database.
      </CardContent></Card>
      <p>Sotto l&apos;inserimento è disponibile una lista di tutti i dataset salvati sul database. Di fianco al nome di ognuno è presente l&apos;icona di un cestino, che eliminerà il dataset dal database.</p>
    </>
  );
}