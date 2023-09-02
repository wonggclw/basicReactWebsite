import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

//what happens if enter is pressed with nothing in the cache?
//what happens if enter is pressed multiple times in a row?
//what happens if a function button is pressed twice in a row without any number change?
//what happens if the number of characters exceeds the display limit? Where do I want to round to?
//decimals
//what happens if you type a number in right after another number?

function App() {
  const [cache, setCache] = useState(0.0);
  const [mod, setMod] = useState(0.0);
  const [onScreen, setScreen] = useState(0);
  const [isMathDone, setMathDone] = useState(false);
  const [justCleared, setJustCleared] = useState(false);
  
  const currVal  = {
    mod: 0,
    cache: 1
  };

  const [stateSwitch, setStateSwitch] = useState(currVal.cache);

  const operator = {
    plus: 0,
    minus: 1,
    mult: 2,
    divide: 3
  }

  const [currOperator, setCurrOperator] = useState(operator.plus);

  useEffect(() => {
    if(stateSwitch == currVal.cache){
      setScreen(cache);
    }
    if(stateSwitch == currVal.mod){
      setScreen(mod);
    }
  }, [stateSwitch])

  // useEffect(() => {
  //   if(justCleared){
  //     enableButtons();
  //     setJustCleared(false);
  //   }
  // }, [setCache, setMod])

  useEffect(() => {
    if(justCleared){
      enableButtons();
      setJustCleared(false);
    }
  })
  
  function numberClick(number){
    setStateSwitch(currVal.mod);
    addNum(number);
  }

  function addNum(number){
    var newNum = -1.0;

    //if cache, switch back to mod
    //update mod with new num

    newNum = (mod * 10) + number;
    setMod(newNum);
    setScreen(newNum);
    
    // switch(stateSwitch){
    //   case currVal.cache:
    //     newNum = (cache * 10) + number;
    //     setCache(newNum);
    //     setScreen(newNum);
    //     break;
    //   case currVal.mod:
    //     newNum = (mod * 10) + number;
    //     setMod(newNum);
    //     setScreen(newNum);
    //     break;
    // }
  }

  function funcClick(func){
    if(!isMathDone){
      //do the math
      doMath();
    }
    
    setMod(0);
    //what do I actually need to set the screen to?
    setStateSwitch(currVal.cache);
    setScreen(cache);
    setOperator(func);
    setMathDone(false);
  }

  function doMath(){
    alert("doing math!");
    switch(currOperator){
      case operator.plus:
        alert(cache + mod);
        setCache(cache + mod);
        setScreen(cache);
        break;
      case operator.minus:
        alert(cache - mod);
        setCache(cache - mod);
        setScreen(cache);
        break;
      case operator.mult:
        alert(cache * mod);
        setCache(cache * mod);
        setScreen(cache);
        break;
      case operator.divide:
        alert(cache / mod);
        setCache(cache / mod);
        setScreen(cache);
        break;
    }
    setMathDone(true);
  }

  function setOperator(operand){
    switch(operand){
      case '+':
        alert('+');
        setCurrOperator(operator.plus);
        break;
      case '-':
        alert('-');
        setCurrOperator(operator.minus);
        break;
      case 'x':
        alert('x');
        setCurrOperator(operator.mult);
        break;
      case '÷':
        alert('÷');
        setCurrOperator(operator.divide);
        break;
    }
  }

  function clear(){
    
    switch(stateSwitch){
      case currVal.cache:
        disableButtons();
        setJustCleared(true);
        setCache(0.0);
        setMod(0.0);
        setScreen(0);
        setCurrOperator(currVal.add);
        setMathDone(false);
        alert("case cache!");
        break;
      case currVal.mod:
        disableButtons();
        setJustCleared(true);
        setMod(0.0);
        setStateSwitch(currVal.cache);
        setScreen(0);
        alert("case mod!");
        break;
    }

    alert(cache + ", " + mod);
  }

  function disableButtons(){
    var allButtons = document.getElementsByClassName("button");
    for(var i = 0; i < allButtons.length; i++){
      allButtons[i].disabled = true;
    }
  }

  function enableButtons(){
    var allButtons = document.getElementsByClassName("button");
    alert("enabling!");
    for(var i = 0; i < allButtons.length; i++){
      allButtons[i].disabled = false;
    }
  }

  function enter(){
    doMath();
    setStateSwitch(currVal.cache);
    setScreen(cache);
  }

  let digits = [];
  for(let i = 0; i < 10; i++) digits.push(i);
  let digitButtons = digits.map(d => <button className="button" onClick={e => numberClick(d)}>{d}</button>);

  let functions = ['+', '-', 'x', '÷'];
  let functionButtons = functions.map(d => <button className='func button' onClick={e => funcClick(d)}>{d}</button>)

  return (
    <div className="App">
      <div id="base">
        <div id="screen">{onScreen}</div>
        <div id="buttons">
          <div id="functions">
            {functionButtons}
          </div>
          <div id="numbers">
            {digitButtons}
            <div id="clear" className="button" onClick={e => clear()}>CLEAR</div>
            <div id="enter" className="button" onClick={e => enter()}>ENTER</div>
          </div>
        </div>
      </div>
      <button onClick={e => enableButtons()}>Enable!</button>
      <button onClick={e => disableButtons()}>Disable!</button>
    </div>
  );
}

export default App;
