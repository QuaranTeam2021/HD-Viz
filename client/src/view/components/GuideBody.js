import React from 'react';
import WarningTwoTone from '@material-ui/icons/WarningTwoTone';

export default function GuideBody() {

  return (
    <>
      <h4>Introduzione</h4>
      <p>
        Questa guida ti sarà utile per capire cosa puoi fare con HDViz e come muoverti all&apos;interno dell&apos;applicazione.
      </p>
      <h4>Menù</h4>
      <dl>
        <p>All&apos;avvio dell&apos;applicazione viene visualizzata la pagina iniziale (ovvero il menù presente in tutte le pagine, in forma allargata), che contiene 4 pulsanti:</p>
        <dt className="imitate-button">Nuovo grafico</dt>
        <dd>
          Questo bottone ti permette di creare un nuovo grafico e visualizzarlo una volta terminata la procedura.
        </dd>
        <dt className="imitate-button">Gestisci database</dt>
        <dd>Questo bottone ti permette di aggiungere dei dataset al database e gestirli</dd>
        <dt className="imitate-button">Guida</dt>
        <dd>Apre questa guida</dd>
        <dt className="imitate-button">Manuale utente</dt>
        <dd>
          Questo bottone ti permette di accedere al manuale utente, un manuale che spiega in dettaglio tutte le funzionalità dell&apos;applicazione, la sua configurazione e riporta la descrizione della riduzione dimensionale, degli algoritmi e delle metriche per la distanza che è possibile manipolare in HD Viz.
        </dd>
      </dl>
      <p>Nelle altre pagine sono inoltre presenti questi pulsanti:</p>
      <dl>
        <dt className="imitate-button">Home</dt>
        <dd>Ritorna alla pagina iniziale</dd>
        <dt className="imitate-button">Visualizzazione</dt>
        <dd>Vai alla pagina dove sono presenti i grafici (sarà disponibile solo se almeno un grafico è stato creato)</dd>
      </dl>

      <h4>Nuovo grafico</h4>
      Scegliendo l&apos;opzione <span className="imitate-button">Nuovo grafico</span> la pagina ti mostrerà 2 possibili scelte:
      <dl>
        <dt className="imitate-button">File locale</dt>
        <dd className="imitate-button">
          È il bottone che permette il caricamento di un file da locale in formato .csv, .tsv o .json. <WarningTwoTone fontSize="small" color="error" />Attenzione! Solo i formati indicati sono supportati. Inoltre non è possibile caricare file vuoti o troppo grandi.
        </dd>
        <dt>Database</dt>
        <dd>
          È il bottone che permette di selezionare le tabelle e le colonne da cui estrarre i dati multi-dimensionali che sono presenti nel database. <WarningTwoTone fontSize="small" color="error" />Attenzione! Per poter caricare una tabella dal database devi essere connesso al server, e il database non deve essere vuoto. Se sei già connesso allora potrai selezionare una tabella attraverso il menù a tendina che apparirà cliccando su <span className="imitate-button">Tabelle</span>. Una volta selezionata la tabella appariranno le colonne corrispondenti e cliccando su <span className="imitate-button">Colonne</span> si potranno selezionare più colonne. Una volta terminato basta cliccare su <span className="imitate-button">Scegli questi dati</span>.
        </dd>
      </dl>
      <dl>
        <p>Dopo aver caricato correttamente il dataset da file o dal database, appariranno le opzioni per creare un grafico.</p>
        <p><WarningTwoTone fontSize="small" color="error" />Attenzione! Alcune opzioni sono disponibili solo per alcuni tipi di grafici</p>
        <p>Ti viene chiesto quindi di scegliere:</p>
        <dt>Le colonne dei dati:</dt>
        <dd>
          Vengono visualizzate tutte le colonne numeriche del dataset caricato. È necessario selezionare almeno una colonna per poter creare correttamente grafico. <WarningTwoTone fontSize="small" color="error" />Attenzione! Per il grafico Scatterplot Matrix, non è possibile creare un grafico se si selezionano più di 5 colonne senza scegliere un algoritmo di riduzione.
        </dd>
        <dt>Il raggruppamento dei dati:</dt>
        <dd>
          Vengono visualizzate tutte le colonne di stringhe del dataset caricato, da cui sceglierne una da utilizzare come raggruppamento: tutti i dati con lo stesso valore su questa colonna verranno colorati con lo stesso colore. È necessario selezionarne una per poter creare un grafico.
        </dd>
        <dt>La normalizzazione</dt>
        <dd>
          Se attiva, <strong>tutti i dati</strong> verranno portati in un intervallo compreso tra <strong>0</strong> e <strong>1</strong>
        </dd>
        <dt>Il tipo di grafico:</dt>
        <dd>
          <ul>
            <li>Scatterplot Matrix{/* <img> (immagine esempio) </img> */}</li>
            <li>Heatmap{/* <img> (immagine esempio) </img> */}</li>
            <li>Force Field{/* <img> (immagine esempio) </img> */}</li>
            <li>Proiezione lineare multiasse{/* <img> (immagine esempio) </img> */}</li>
          </ul>
          <p>È necessario selezionarne uno per poter creare un grafico.</p>
        </dd>
        <dt>La metrica per la distanza:</dt>
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
        <dt>L&apos;algoritmo di riduzione dimensionale:</dt>
        <dd>
          <p>
            Questa selezione appare solo se è stato selezionato il grafico Scatterplot Matrix o Proiezione lineare multiasse. Per la definizione della funzione di riduzione dimensionale si rimanda ai riferimenti del manuale utente. È possibile evitare la riduzione dimensionale selezionando <span className="imitate-button">Nessuna riduzione</span> tra le opzioni di scelta.
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
      <p>In questa pagina sono visualizzati tutti i grafici creati fino a quel momento. Per ogni grafico sono disponibili delle opzioni per apportare modifiche alla visualizzazione, e per applicarle è necessario premere il bottone <span className="imitate-button">Conferma</span>. È possibile inoltre rinominare il grafico dall&apos;apposito campo, oppure eliminarlo premendo il bottone dedicato. In ogni tipo di grafico, è possibile posizionare il cursore sopra un dato per visualizzare i valori di cui è composto.</p>

      <h4>Gestione dataset</h4>
      <p>In questa pagina è possibile gestire i dataset presenti nel database.</p>
      <p>Per inserirne uno, basta premere l&apos;icona <span className="imitate-button">+</span>, inserire un nome valido, e premere <span className="imitate-button">Invia</span>. <WarningTwoTone fontSize="small" color="error" />Attenzione! Solo file di formato .csv e .tsv possono essere salvati sul database.</p>
      <p>Sotto l&apos;inserimento è disponibile una lista di tutti i dataset salvati sul database. Di fianco al nome di ognuno è presente l&apos;icona di un cestino, che eliminerà il dataset dal database.</p>
    </>
  );
}