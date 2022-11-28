import { useState,useEffect } from 'react';
import { Button,Box } from '@chakra-ui/react';

import './App.css';

function Dot({coordinates}) {
	const x = coordinates.x;
	const y = coordinates.y;

	return (
		<Box position={"absolute"} left={x} top={y} className="dot" />
	);
}

function App() {
	const [globalDots, setGlobalDots] = useState([]);
	const [dots, setDots] = useState([]);

	useEffect(() => {
		const header = document.querySelector('header');

		const listener = window.addEventListener('click', (e) => {
			if(e.target !== header ) return
			const clientX = e.clientX;
			const clientY = e.clientY;
			setDots((dots) => [...dots, {x: clientX, y: clientY}]);
			setGlobalDots((globalDots) => [...globalDots, {x: clientX, y: clientY}]);
		});

		return () => {
			window.removeEventListener('click', listener);
		}

	}, []);

	const handleUndo = () => {
		if(dots.length === 0) return;
		const currentLength = dots.length;
		setDots((prev) => prev.slice(0,currentLength-1));
	}

	const handleRedo = () => {
		if(dots.length === globalDots.length) return;
		const currentLength = dots.length;
		const c = globalDots[currentLength]
		setDots((prev) => [...prev, c]);
	}

  return (
    <div className="App">
      <header className="App-header">
				<Button onClick={handleUndo} colorScheme="telegram" position={"absolute"} left={"10px"} top={"10px"} >Undo</Button>
				<Button onClick={handleRedo} colorScheme="telegram" position={"absolute"} left={"100px"} top={"10px"} >Redo</Button>
					{
						dots.map((coordinates, index) => {
							return <Dot coordinates={coordinates} key={index} />
						})
					}				
      </header>
    </div>
  );
}

export default App;
