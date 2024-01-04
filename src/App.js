import './App.css';
import ph0 from './images/0margo.jpg';
import ph1 from './images/1niro.jpg';
import ph2 from './images/2kuravlev.jpg';
import ph3 from './images/3shrut.jpg';
import ph4 from './images/4samuel.jpg';
import ph5 from './images/5sergo.jpg';
import {useEffect, useState} from 'react';

export default function App() {
  const [last, setLast] = useState(null);
  const [board, setBoard] = useState(Array(12).fill({}));
  const [click, setClick] = useState(false);
  const [approve, setApprove] = useState(true);
  const [count, setCount] = useState(0);
  const [result, setResult] = useState(false);
  const [bestCount, setBestCount] = useState(0);

  const shuffle = () => {
    const visual = () => {
      setClick(false);
    };
    setCount(0);
    setLast(null);
    setClick(true);
    setTimeout(visual, 100);
    const instance = [<img key={0} src={ph0} alt="photo"></img>,
      <img key={1} src={ph1} alt="photo"></img>,
      <img key={2} src={ph2} alt="photo"></img>,
      <img key={3} src={ph3} alt="photo"></img>,
      <img key={4} src={ph4} alt="photo"></img>,
      <img key={5} src={ph5} alt="photo"></img>,
      <img key={6} src={ph0} alt="photo"></img>,
      <img key={7} src={ph1} alt="photo"></img>,
      <img key={8} src={ph2} alt="photo"></img>,
      <img key={9} src={ph3} alt="photo"></img>,
      <img key={10} src={ph4} alt="photo"></img>,
      <img key={11} src={ph5} alt="photo"></img>].sort(() => Math.random() - 0.5);
    setBoard(board.map((el, i) => ({img: instance[i], view: false, locked: false})));
  };
  const handleCLick = (index) => {
    if (approve) {
      if (last === null) {
        setBoard(board.map((el, i) => (i === index ? {...el, view: !el.view} : el)));
        setLast(index);
      } else if (index === last) {
        setBoard(board.map((el, i) => (i === index ? {...el, view: !el.view} : el)));
        setLast(null);
      } else if (board[last].img.props.src === board[index].img.props.src) {
        setBoard(board.map((el, i) => (i === index || i === last ? {...el, view: true, locked: true} : el)));
        setLast(null);
      } else {
        setApprove(false);
        setBoard(board.map((el, i) => (i === index ? {...el, view: !el.view} : el)));
        const timeOut = () => {
          setBoard(board.map((el, i) => (i === index || i === last ? {...el, view: false} : el)));
          setApprove(true);
        };
        setTimeout(timeOut, 500);
        setLast(null);
      }
    }
    setCount(count + 1);
  };
  useEffect(() => {
    shuffle();
  }, []);
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('.button'));
    setResult(elements.every(el => el.disabled === true));
  }, [board, setBoard]);
  useEffect(() => {
    if (result) {
      if (count < bestCount || bestCount === 0) setBestCount(count);
    }
  }, [result, setResult]);

  return (
      <div className="game-wrap">
        <h1>MEMORY GAME</h1>
        <div className="text">
          <h3>{`Best result is ${bestCount} tries!`}</h3>
          <h3>{`You solved the puzzle in ${count} tries!`}</h3>
          <button className={click ? 'restart-pushed' : 'restart'} onClick={shuffle}>Play</button>
        </div>
        <div className="game-box">
          {board.map((el, i) => (
              <button
                  key={i} disabled={el.locked}
                  className='button'
                  onClick={() => handleCLick(i)}>
                <>{el.view ? el.img : ''}</>
              </button>
          ))}
        </div>
      </div>
  );
}
