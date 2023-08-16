import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

//what happens if enter is pressed with nothing in the cache?
//what happens if a function button is pressed twice in a row without any number change?
//what happens if the number of characters exceeds the display limit? Where do I want to round to?
//first time around - setting mod but the cache is still 0. What to do for the first round? Might need to set a isFirst Time thingy

function App() {
  const [cache, setCache] = useState(0.0);
  const [mod, setMod] = useState(0.0);
  const [onScreen, setScreen] = useState(0);
  const [isMathDone, setMathDone] = useState(false);
  
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
    alert("clearing!");
    
    switch(stateSwitch){
      case currVal.cache:
        setCache(0);
        setMod(0);
        alert("case cache!");
        setScreen(0);
        break;
      case currVal.mod:
        setMod(0);
        setScreen(0);
        alert("case mod!");
        break;
    }
  }

  function enter(){
    doMath();
    setScreen(cache);
  }

  let digits = [];
  for(let i = 0; i < 10; i++) digits.push(i);
  let digitButtons = digits.map(d => <div className="button" onClick={e => numberClick(d)}>{d}</div>);

  let functions = ['+', '-', 'x', '÷'];
  let functionButtons = functions.map(d => <div className='func button' onClick={e => funcClick(d)}>{d}</div>)

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
    </div>
  );
}

export default App;
