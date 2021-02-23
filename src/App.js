import Leaderboard from './Leaderboard';
import Navbar from './Navbar';
import Player from './Player';
import Home from './Home';
import MatchHistory from './Match-History';
import PlayerSolo from './PlayerSolo';
import DeckViewer from './DeckViewer';
import GameCompanion from './Game-Companion';
import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Footer from './Footer';

let set1 = require('./set1.json');
let set2 = require('./set2.json');
let set3 = require('./set3.json');

const CARDS = set1.concat(set2, set3);
/* const CARDCODE = CARDS.map(x => x.cardCode);
const PORT = '21337'; */


function App() {
  let r = Math.floor(Math.random() * CARDS.length);

  const [bg, setBg] = useState(CARDS[r].assets[0].fullAbsolutePath)
  //Changes bg every minute
  useEffect(() => {
     setInterval(() => {
      r = Math.floor(Math.random() * CARDS.length);
    setBg(CARDS[r].assets[0].fullAbsolutePath)
    }, 60*30*1000) 
  },[]);
  return (
    <Router>
      <div className='fixed-top'><Navbar /></div>
      <div style={{
        backgroundImage: `url(${bg})`,
        minHeight: '95vh',
        backgroundPosition: `center`,
        backgroundAttachment: `fixed`,
        backgroundRepeat: 'no-repeat'
      }} className='bg-secondary text-light container-fluid pt-3 mt-5'>
        <Switch>
          <Route exact path="/lor-companion/" component={Home} />
          <Route exact path="/" component={Home} />
          <Route path="/lor-companion/leaderboard" component={Leaderboard} />
          <Route path="/lor-companion/history/:server/:name/:tagline/:matches" component={PlayerSolo} />
          <Route exact path="/lor-companion/history" component={MatchHistory} />
          <Route path="/lor-companion/companion" component={GameCompanion} />
          <Route path="/lor-companion/underdevelopment" component={DeckViewer} />
        </Switch>
        <Footer/>
      </div>
    </Router>
  );
}


export default App;
