import "./TicTac.css";
import { useState } from "react";
import cross_icon from '../../Assets/circle.png';
import cricle_icon from '../../Assets/cross.png';

function TicTac() {
    const [data, setData] = useState(['', '', '', '', '', '', '', '', '']);
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const [winner, setWinner] = useState(null); // Store the winner

    function toggle(ele, index) {
        if (lock || data[index] !== '' || winner) return; // Prevent interaction if the game is over or the box is already filled

        const newData = [...data];
        if (count % 2 === 0) {
            newData[index] = 'x';
            ele.target.innerHTML = `<img src='${cross_icon}'>`;
        } else {
            newData[index] = 'o';
            ele.target.innerHTML = `<img src='${cricle_icon}'>`;
        }
        setData(newData);
        setCount(count + 1);

        checkWin(newData);
    }

    function checkWin(board) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6] 
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                setLock(true);
                setWinner(board[a]); // Set the winner
                alert(`Player ${board[a].toUpperCase()} wins!`);
                return;
            }
        }

        if (!board.includes('')) {
            setLock(true); // Game is a draw
            alert("It's a draw!");
        }
    }

    function resetGame() {
        setData(['', '', '', '', '', '', '', '', '']);
        setCount(0);
        setLock(false);
        setWinner(null); // Reset the winner
        document.querySelectorAll('.box').forEach(box => box.innerHTML = '');
    }

    return (
        <div className="Container">
            <h1 className="title">Tic Tac Game</h1>
            <div className="board">
                <div className="r1">
                    <div className="box" onClick={(ele) => toggle(ele, 0)}></div>
                    <div className="box" onClick={(ele) => toggle(ele, 1)}></div>
                    <div className="box" onClick={(ele) => toggle(ele, 2)}></div>
                </div>
                <div className="r2">
                    <div className="box" onClick={(ele) => toggle(ele, 3)}></div>
                    <div className="box" onClick={(ele) => toggle(ele, 4)}></div>
                    <div className="box" onClick={(ele) => toggle(ele, 5)}></div>
                </div>
                <div className="r3">
                    <div className="box" onClick={(ele) => toggle(ele, 6)}></div>
                    <div className="box" onClick={(ele) => toggle(ele, 7)}></div>
                    <div className="box" onClick={(ele) => toggle(ele, 8)}></div>
                </div>
            </div>
            <button className="reset" onClick={resetGame}>Reset</button>
        </div>
    );
}

export default TicTac;
