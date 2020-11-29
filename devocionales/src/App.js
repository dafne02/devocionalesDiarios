import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [devotional, setDevotional] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(undefined);
  const [arrCont, setArrCont] = useState([]);

  useEffect(()=> {
    axios.get('https://devotionals-api.herokuapp.com/api/v1/devotionals/today')
    .then(({data}) => {setDevotional(data[0]); setArrCont(data[0].content);})
    .catch((err) => setError(err))
    .finally(() => setIsLoaded(true));
  }, []);
  console.log(devotional)
  console.log(arrCont)
  if(error)
    return(
      <div className="App">
        <h1>Error al cargar</h1>
        <p>Error: {error.mesage}</p>
      </div>
    );
  else if(!isLoaded)
    return (
      <div className="loading">
        <h1 className="cargando"></h1>
      </div>
    );
  else
   return(
     <div className="App">
       <Devotional data={devotional} arrCont={arrCont}/>
     </div>
   );
}
function Devotional({data,arrCont}){
  return(
    <div className="devocional">
      <h1 className="titulo">{data.title}</h1>
      <p className="fecha">{data.date}</p>
      <p className="versiculo">{data.vers}</p>
      <div className="contenido">
        {arrCont.map((p, i) => <p key={i}>{p}</p>)}
      </div>
    </div>    
  );
}
export default App;
