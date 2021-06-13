import React from 'react';
import WarningTwoTone from '@material-ui/icons/WarningTwoTone';

export default function GuideBody() {

  return (
    <>
      <h4>Introduzione</h4>
        <p>Questa guida ti sarà utile per capire cosa puoi fare con HD Viz e come muoverti all&apos;interno dell&apos;applicazione.</p>
      <h4>Menù</h4>
        <dl>
          <p>All&apos;avvio dell&apos;applicazione viene visualizzata la pagina iniziale (ovvero il menù presente in tutte le pagine, in forma allargata), che contiene 4 pulsanti:</p>
          <dt>
            <dd className="imitate-button"><strong>Nuovo grafico</strong>: questo bottone ti permette di creare un nuovo grafico e visualizzarlo una volta terminata la procedura.</dd><br></br>
            <dd className="imitate-button"><strong>Gestisci database</strong>: questo bottone ti permette di aggiungere dei dataset al database e gestirli.</dd><br></br>
            <dd className="imitate-button"><strong>Guida</strong>: apre questa guida.</dd><br></br>
            <dd className="imitate-button"><strong>Manuale utente</strong>: questo bottone ti permette di accedere al manuale utente, un manuale che spiega in dettaglio tutte le funzionalità dell&apos;applicazione, la sua configurazione e riporta la descrizione della riduzione dimensionale, degli algoritmi e delle metriche per la distanza che è possibile manipolare in HD Viz.</dd>
          </dt>
        </dl>
        <p>Nelle altre pagine sono inoltre presenti questi pulsanti:</p>
        <dl>
          <dt>
            <dd className="imitate-button"><strong>Home</strong>: ritorna alla pagina iniziale.</dd><br></br>
            <dd className="imitate-button"><strong>Visualizzazione</strong>: vai alla pagina dove sono presenti i grafici (sarà disponibile solo se almeno un grafico è stato creato).</dd>
          </dt>
        </dl>

      <h4>Nuovo grafico</h4>
        Scegliendo l&apos;opzione <span className="imitate-button">Nuovo grafico</span> la pagina ti mostrerà 2 possibili scelte:
        <dl>
          <dt>
            <dd className="imitate-button"><strong>File locale</strong>: è il bottone che permette il caricamento di un file da locale in formato .csv, .tsv o .json.<br></br><br></br>
            <strong><WarningTwoTone fontSize="small" color="error" /> Solo i formati indicati sono supportati. Inoltre non è possibile caricare file vuoti o troppo grandi (specifcare la dimensione).</strong>
            </dd><br></br>
            <dd><strong>Database</strong>: è il bottone che permette di selezionare le tabelle e le colonne da cui estrarre i dati multi-dimensionali che sono presenti nel database. <br></br><br></br>
              <strong><WarningTwoTone fontSize="small" color="error" /> Per poter caricare una tabella dal database devi essere connesso al server e il database non deve essere vuoto.</strong><br></br><br></br>
              Se sei già connesso allora potrai selezionare una tabella attraverso il menù a tendina che apparirà cliccando su <span className="imitate-button">Tabelle</span>. <br></br>
              Una volta selezionata la tabella appariranno le colonne corrispondenti e cliccando su <span className="imitate-button">Colonne</span> si potranno selezionare più colonne.<br></br>
              Una volta terminato basta cliccare su <span className="imitate-button">Scegli questi dati</span>.
            </dd>
          </dt>
        </dl>
        <dl>
          <p>Dopo aver caricato correttamente il dataset da file o dal database, appariranno le opzioni per creare un grafico.</p>
          <strong><WarningTwoTone fontSize="small" color="error" /> Alcune opzioni sono disponibili solo per alcuni tipi di grafici.</strong>
          <p>Ti viene chiesto quindi di scegliere:</p>
          <dt>Le <strong>colonne</strong> dei dati:</dt>
          <dd>
            Vengono visualizzate tutte le colonne numeriche del dataset caricato.<br></br>
            È necessario selezionare almeno una colonna per poter creare correttamente il grafico.
            <p><strong><WarningTwoTone fontSize="small" color="error" /> Per il grafico Scatterplot Matrix, non è possibile creare un grafico se si selezionano più di 5 colonne senza scegliere un algoritmo di riduzione.</strong></p>
          </dd>
          <dt>Il <strong>raggruppamento</strong> dei dati:</dt>
          <dd>
            Vengono visualizzate tutte le colonne di stringhe del dataset caricato, da cui sceglierne una da utilizzare come raggruppamento: tutti i dati con lo stesso valore su questa colonna verranno colorati con lo stesso colore. <br></br>
            È necessario selezionarne una per poter creare un grafico.
          </dd><br></br>
          <dt>La <strong>normalizzazione</strong>: se attiva, <strong>tutti i dati</strong> verranno portati in un intervallo compreso tra <strong>0</strong> e <strong>1</strong>.</dt><br></br>
          <dt>Il <strong>tipo</strong> di grafico:</dt>
          <dd>
            <ul>
              <li>Scatterplot Matrix</li>
              <li>Heatmap</li>
              <li>Force Field</li>
              <li>Proiezione Multiassi</li>
            </ul>
            <p>È necessario selezionarne uno per poter creare un grafico.</p>
          </dd>
          <dt>La <strong>metrica</strong> per la distanza:</dt>
          <dd>
            <p>Questa selezione appare solo se è stato selezionato il grafico Heatmap o Force Field. Per la definizione delle metriche si rimanda ai riferimenti del manuale utente</p>
            <ul>
              <li>Euclidean</li>
              <li>Cosine</li>
              <li>Euclidean Squared</li>
              <li>Canberra</li>
              <li>Chebyshev</li>
            </ul>
          </dd>
          <dt>L&apos;<strong>algoritmo</strong> di riduzione dimensionale:</dt>
          <dd>
            <p>
              Questa selezione appare solo se è stato selezionato il grafico Scatterplot Matrix o Proiezione Multiassi. Per la definizione della funzione di riduzione dimensionale si rimanda ai riferimenti del manuale utente. È possibile evitare la riduzione dimensionale selezionando <span className="imitate-button">Nessuna riduzione</span> tra le opzioni di scelta.
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
        <p>Al termine di tutte le selezioni è sufficiente premere il pulsante <span className="imitate-button">conferma</span> e attendere la creazione del grafico, che verrà visualizzato una volta elaborati i dati.</p>

      <h4>Visualizzazione</h4>
        <p>In questa pagina sono visualizzati tutti i grafici creati fino a quel momento.<br></br>
        Per ogni grafico sono disponibili delle opzioni per apportare modifiche alla visualizzazione, e per applicarle è necessario premere il bottone <span className="imitate-button">Conferma</span>.<br></br>
        È possibile inoltre rinominare il grafico dall&apos;apposito campo, oppure eliminarlo premendo il bottone dedicato.<br></br>
        In ogni tipo di grafico, è possibile posizionare il cursore sopra un dato per visualizzare i valori di cui è composto.</p>

      <h4>Gestione dataset</h4>
        <p>In questa pagina è possibile gestire i dataset presenti nel database.<br></br>
        Per inserirne uno, basta premere l&apos;icona <span className="imitate-button">+</span>, inserire un nome valido, e premere <span className="imitate-button">Invia</span>.</p>
        <strong><WarningTwoTone fontSize="small" color="error" /> Solo file di formato .csv e .tsv possono essere salvati sul database.</strong><br></br>
        <p>Sotto l&apos;inserimento è disponibile una lista di tutti i dataset salvati sul database. Di fianco al nome di ognuno è presente l&apos;icona di un cestino, che eliminerà il dataset dal database.</p>
    </>
  );
}