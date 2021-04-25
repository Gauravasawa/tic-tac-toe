import React, { Component } from 'react';
import Square from './Square';

const calculateWinner = square=>{
   const lines=[
    //horizontal
    [0,1,2],
    [3,4,5],
    [6,7,8],

    //Vertical 
    [0,3,6],
    [1,4,7],
    [2,5,8],

    //diagonal
    [0,4,8],
    [2,4,6]
]

  for (let i = 0; i < lines.length; i++) {
      //get current line row (horizontal, vertical, diagonal)
      const [a, b, c] = lines[i];
      //lets check if we have X or O in postion a
    if (
      //if we have it in position a
      square[a] &&
      //and it's the same in position b
      square[a] === square[b] &&
      //and it's the same in position c
      square[a] === square[c]
    ) {
        //return the element thats inside x
      return square[a];
    }  
      
  }  
  return '';
}

class Board extends Component {
  state = {
    square: ['','','','','','','','',''],
    xIsNext: true
  };

  handleClick = number =>()=>{
      if (calculateWinner(this.state.square) || this.state.square[number]) {
        return;
        //used to check X and O are clicked once
      }
      //copy of square array
      const newSquares = [...this.state.square]

      //checking the condition for X & O
      newSquares[number] =this.state.xIsNext ? 'X' : 'O'
      this.setState({
          square: newSquares,
          xIsNext: !this.state.xIsNext
    })
  }

handleReset=()=>{
  this.setState({
    square: ["", "", "", "", "", "", "", "", ""],
    xIsNext: true,
  });
}

  render() {

      const {square, xIsNext}=this.state

      const Winner = calculateWinner(this.state.square)
      let status

      if(Winner){
          status= `Winner : ${Winner}`
      }

      else{
          status = `Next Step : ${xIsNext ? 'X' : 'O'} `;
      }

    return (
      <div className="text-center">
      <div className="Board">
          <h1>{status}</h1>
        <div className="Row">
          <Square value={square[0]} onClick={this.handleClick(0)} />
          <Square value={square[1]} onClick={this.handleClick(1)} />
          <Square value={square[2]} onClick={this.handleClick(2)} />
        </div>
        <div className="Row">
          <Square value={square[3]} onClick={this.handleClick(3)} />
          <Square value={square[4]} onClick={this.handleClick(4)} />
          <Square value={square[5]} onClick={this.handleClick(5)} />
        </div>
        <div className="Row">
          <Square value={square[6]} onClick={this.handleClick(6)} />
          <Square value={square[7]} onClick={this.handleClick(7)} />
          <Square value={square[8]} onClick={this.handleClick(8)} />
        </div>
        <button onClick={this.handleReset} className="Reset">Reset Game</button>
      </div>
      </div>
    );
  }
}

export default Board;
