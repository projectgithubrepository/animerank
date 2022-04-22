import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [optionTitle, setOptionTitle] = useState(0);
  const [arraya, setArraya] = useState([]);
  
  useEffect(() => {
    axios.get('https://animerank.herokuapp.com/api/dados')
    .then((res) => {
      setArraya(res.data.animes)
    })
    .catch((error) => {
      if (error.response) {
        console.log(error);
      }
    });
    
  }, [])

  function handleVote(e) {
    e.preventDefault()

    arraya?.map((item, index) => {
      if (item.title === optionTitle){
        
        axios.post('https://animerank.herokuapp.com/api/like', {id: item.id})
          .then((res) => {
            axios.get('https://animerank.herokuapp.com/api/dados')
            .then((res) => {
              setArraya(res.data.animes)
            })
          })
      }
    })
  
  }

  return (
    <div className="App">
      <header>
        <div className='pergunta' style={{fontSize:'6vw', marginBottom:'2vw'}}>MELHOR ANIME DA TEMPORADA</div>
      </header>
      <main style={{marginTop:'2vw'}}>
        <form onSubmit={handleVote} style={{marginBottom:'2vw'}}>
          <select style={{minHeight:'4vw', fontSize:'large'}} type="select" onChange={(event) => setOptionTitle(event.target.value)}>
            <option value='' hidden>escolha um anime e vote</option>
            {arraya?.map((item, index) => {
            return (
              <option value={item.title}>{item.title}</option>
            )})}
          </select>

          <input style={{minHeight:'4vw', minWidth:'6vw', fontSize:'large', fontWeight:'bold', marginLeft:'5px'}} type="submit" value='votar' />
        </form>
        {arraya?.map((item, index) => {
          return (
              <>
              {
              <li style={{listStyle:'none', marginBottom:'2vw'}} key={index} >
                    <div style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                      <div style={{fontSize:'20vw', width:'25vw'}}>{index+1}</div>
                      <span><img className='img' style={{width:'20vw', borderRadius:'19px'}} src={`../../assets/${item.icon}.jpg`}/></span>
                      <div className='animeInfo' style={{width:'40vw', display:'flex', flexDirection:'column'}}>
                          <h1>{item.title}</h1>
                          <h1>VOTOS {item.votos}</h1>
                          <h3><a href={item.url} target='_blank'>+info</a></h3>
                      </div>
                    </div>     
              </li> 
              }
              </>
              
          );
        })}
    
      </main>
    </div>  
  );
}

export default App;
