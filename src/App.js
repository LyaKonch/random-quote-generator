import logo from './logo.svg';
import './App.css';
import { useEffect, useState,useRef } from 'react';
import { CSSTransition, Transition } from 'react-transition-group';
import axios from 'axios'

function App() {
   var colors = [
      '#16a085',
      '#27ae60',
      '#2c3e50',
      '#f39c12',
      '#e74c3c',
      '#9b59b6',
      '#FB6964',
      '#342224',
      '#472E32',
      '#BDBB99',
      '#77B1A9',
      '#73A857'
    ];
   const [quotes,setQuote]=useState([]);
   const [random,setRandom]=useState(0);
   const [inProp,setInProp]=useState(false);
   const [randomColor,setRandomColor]=useState(Math.floor(Math.random()*colors.length));
   async function fetchQuotes(){
      const response= await axios.get("https://api.api-ninjas.com/v1/quotes?limit=10", {
         headers:{
         'X-Api-Key': 'mICwMUnJHY8tUTZRE/gYgQ==EItFIbBYNvk8cSHb'
               }
            });
      setQuote(response.data);
   };
   useEffect(()=>{
      fetchQuotes();
   },[]);
   const func=()=>{
      let temp;
      setInProp(true);
      temp=Math.floor(Math.random()*10);
      while(random===temp){
         temp=Math.floor(Math.random()*10);
      }
      setRandom(temp);
      setRandomColor(temp);
   }
   const nodeRef = useRef(null);
   const nodeBgRef = useRef(null);
   const defaultStyleColor = {
      transition:"all 1s ease-in-out",
      color:"#000000"
    }
    const transitionStylesColor = {
         color: `${colors[randomColor]}`
    };
    const defaultStyleBg = {
      transition:"all 1s ease-in-out",
      backgroundColor:"rgb(0,0,0)"
    }
    const transitionStylesBg = {
      backgroundColor: `${colors[randomColor]}`
    };
   if(quotes[random]!==undefined){
      return (
         <CSSTransition
            nodeRef={nodeRef}
            in={inProp}
            timeout={700}
            classNames="opacityflow"
            onEntered={function(){
               setInProp(false);
            }}
         >
            <Transition
               nodeRef={nodeBgRef}
               in={inProp}
               timeout={700}
            >
            {state=>(
               <div ref={nodeBgRef} className='container' style={{
                  ...defaultStyleBg,...transitionStylesBg
               }}>
               <div className='quote-content'>
                  <div ref={nodeRef} className='quote-body' >
                     <Transition
                        in={inProp}
                        timeout={700}

                     >
                        {state=>(
                        <div className={`quote-text`} style={{
                           ...defaultStyleColor,...transitionStylesColor
                        }}>
                           <i class="fa fa-quote-left"> </i>
                           <p className='quote'>{quotes[random].quote}</p>
                        </div>
                        )}

                     </Transition>


                     <p className='quotes-author'>{quotes[random].author}</p>
                  </div>
                  <div className='quote-interactive'>
                     <Transition
                        in={inProp}
                        timeout={1000}
                     >
                        {state=>(
                        <div className='quote-link-wrapper' >
                           <a style={{
                           ...defaultStyleColor,...transitionStylesColor
                        }} className='quote-link' href={`https://twitter.com/intent/tweet?text=${quotes[random].quote}&hashtags=${quotes[random].author}`}  target="_blank"><i class="fa fa-twitter"></i></a>
                           <a style={{
                           ...defaultStyleColor,...transitionStylesColor
                        }} className='quote-link' href={`https://www.tumblr.com/new/text?text=${quotes[random].quote}&hashtags=${quotes[random].author}`} target="_blank" ><i class="fa fa-tumblr"></i></a>
                         </div>
                        )}

                     </Transition>

                        <Transition>

                           {state=>(
                              <button onClick={func} className='newqoute-bth' style={{
                                 ...defaultStyleBg,...transitionStylesBg
                              }}>New quote</button>
                           )}
                        </Transition>

                  </div>
               </div>
            </div>
            )}
            </Transition>

         </CSSTransition>

         );
   }

}


export default App;
