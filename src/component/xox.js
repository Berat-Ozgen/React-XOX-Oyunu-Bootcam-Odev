import React, { useState } from 'react';
import '../App.css';

const Xox = () => {
	const [turn, setTurn] = useState('O');
	const [cells, setCells] = useState(Array(9).fill(''));
	const [winner, setWinner] = useState();

	const checkForWinner = (squares) => {
		let combos = {
			across: [
				[0, 1, 2],
				[3, 4, 5],
				[6, 7, 8],
			],
			down: [
				[0, 3, 6],
				[1, 4, 7],
				[2, 5, 8],
			],
			diagnol: [
				[0, 4, 8],
				[2, 4, 6],
			],
		};

		for (let combo in combos) {
			combos[combo].forEach((pattern) => {
				if (
					squares[pattern[0]] === '' ||
					squares[pattern[1]] === '' ||
					squares[pattern[2]] === ''
				) {
					// do nothing
				} else if (
					squares[pattern[0]] === squares[pattern[1]] &&
					squares[pattern[1]] === squares[pattern[2]]
				) {
					setWinner(squares[pattern[0]]);
				}
			});
		}
	};

	const handleClick = (num) => {
	
		let squares = [...cells];

		if (turn === 'X') {
			squares[num] = 'X';
			setTurn('O');
		} else {
			squares[num] = 'O';
			setTurn('X');
		}

		checkForWinner(squares);
		setCells(squares);
	};

	const handleRestart = () => {
		setWinner(null);
		setCells(Array(9).fill(''));
	};

	const Cell = ({ num }) => {
		return <div className={ cells[num] === "X" ? "turnX box" : "turnY box"}onClick={() => handleClick(num)}> {cells[num]}</div>;
	};

    console.log(winner)

	return (
		<div className='container'>
			<div className='container-row'>
				<Cell num={0} />
				<Cell num={1} />
				<Cell num={2} />
            </div>
            <div className='container-row'>
				<Cell num={3} />
				<Cell num={4} />
				<Cell num={5} />
            </div>
            <div className='container-row'>
				<Cell num={6} />
				<Cell num={7} />
				<Cell num={8} />
             </div>
				
			{winner && (
				<div className='playAgain'>
					<p>{winner} is the winner!</p>
					<button className='playAgainB' onClick={() => handleRestart()}>Play Again</button>
				</div>
			)}
		</div>
	);
};

export default Xox;

