
import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {

  const [time, setTime] = useState("");
  const [Items, setItems] = useState([]);
  const [text, setText] = useState("");
  const [rand, setRand] = useState('');
  const [resp, setResp] = useState([]);
  const [speech, setSpeech] = useState(null);
  const [Name, setName] = useState();

  // console.log(rand);

  //https://assistant-ai-chatbot.herokuapp.com//response
  //https://assistant-ai-chatbot.herokuapp.com//greet
  useEffect(() => {
    fetch('https://assistant-ai-chatbot.herokuapp.com//greet').then(res => res.json())
  }, [])

  useEffect(() => {
    fetch('https://assistant-ai-chatbot.herokuapp.com//response',{

      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(rand),

    }).then(res => res.json()).then(data => {
      setResp((oldItem) => {return [...oldItem, data.response]})
      console.log(data.response);
      setSpeech(data.response);
    })
  }, [rand])

  console.log(speech);

  useEffect(()=> {
    fetch('https://assistant-ai-chatbot.herokuapp.com//speech', {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(speech),
    }).then(res => res.json()).then(data => {console.log(data.response);})
  }, [speech])


  return(
    <>
    <div>
      <div className="header">
        <div className="heading">CHATBOT</div>
      </div>
      <div className="middle">
        {Items.map((itemval, key)=>{
          return <>
          <p className="middle-para">{itemval}</p>
          <p className="resp_para">{resp[key+1]}</p>;
          </>;
        })}
      </div>
      <div className="lower">
        <input type="text" onChange={(e) => {setText(e.target.value)}} value={text}></input>
        <button onClick={()=> 
        {
          setName(text);

          if (text!==""){
          setItems((olditems)=>
          {return [...olditems, text]})}
          if(text!==""){
          setRand(text);
          }
        setText("");
      }}>SEND</button>
      </div>
    </div>
    </>
  )

};

export default App;