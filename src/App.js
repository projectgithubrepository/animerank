import React, { useRef, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import app from './firebase.js'

function App() {
  const [optionTitle, setOptionTitle] = useState(0);
  const [rank, setRank] = useState();
  const [arraya, setArraya] = useState([]);
  
  const getUserData= async() => {
          try {
          const res = await app.firestore().collection('votos').get()
          // console.log(res.docs.map(doc => doc.data()), 'sera?');
          setArraya(res.docs.map(doc => doc.data()))
        } catch (err) {
          // console.log(err);
          // setError(true)
        }
        
      }
  useEffect(() => {
    getUserData()
  }, [])

  useEffect(() => {
    getUserData()
  }, [rank])

  async function PostDataFirebase(selected, nVotos) {
      app
        .firestore()
        .collection('votos')
        .doc(selected.id)
        .set({
          icon: selected.icon,
          title: selected.title,
          url: selected.url,
          votos: nVotos,
          id: selected.id
        })
        .then(getUserData())
        .catch((error) => {
          if (error.response) {
            console.log(error);
            alert("Ooops algo deu errado ");
          }
        });
  }

  function handleVote(e) {
    e.preventDefault();
    arraya.map((item, index) => {
    if(optionTitle === item.title){
      setRank(item.votos + 1)
      PostDataFirebase(item, item.votos + 1)
    } else {
      return
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
            {arraya.map((item, index) => {
            return (
              <option value={item.title}>{item.title}</option>
            )})}
          </select>

          <input style={{minHeight:'4vw', minWidth:'6vw', fontSize:'large', fontWeight:'bold', marginLeft:'5px'}} type="submit" value='votar' />
        </form>
        {arraya.map((item, index) => {
          arraya.sort(function(a, b){return b.votos - a.votos})
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
