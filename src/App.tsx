import { Button } from './components/Button'
import '../styles.css'
import './App.css';
import { Header } from './components/Header';
import Game from './Game'

function App() {
  return (
    <div className="App">

      <Header headerID="header" textID="app-name" text="Tic Tac Toe"></Header>

      <Button outerParentID="header" innerParentID="buttons" buttonID="close-btn" onClick={ async () => {
        // @ts-ignore
        await window.app.close();
      }}></Button>

      <Button outerParentID="header" innerParentID="buttons" buttonID="maximize-btn" onClick={ async () => {
        // @ts-ignore
        await window.app.maximize();
      }}></Button>

      <Button outerParentID="header" innerParentID="buttons" buttonID="minimize-btn" onClick={async () => {
        // @ts-ignore
        await window.app.minimize();
      }}></Button>

      <Game />
    </div>
  );
}

export default App;
