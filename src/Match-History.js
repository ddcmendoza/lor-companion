import { useState,useEffect} from 'react'
import React from 'react'
import {  useHistory } from 'react-router-dom'
import Player from './Player'

let config = require('./config.json')
const APIKEY = config.MY_API_TOKEN;
export default function MatchHistory (){

    const [player, setPlayer] = useState(null);
    const [tagline, setTagline] = useState(null);
    const [server, setServer] = useState(null);
    const [noMatches, setNoMatches] = useState('5');

    const [puuid, setPuuid] = useState(null);
    const [click, setClick] = useState(false);



    /* const [player, setPlayer] = useState('Szychu');
    const [tagline, setTagline] = useState('euw');
    const [server, setServer] = useState('europe');
    const [noMatches, setNoMatches] = useState('2'); */

    /* const [player, setPlayer] = useState('wraptero');
    const [tagline, setTagline] = useState('na1');
    const [server, setServer] = useState('americas');
    const [noMatches, setNoMatches] = useState('2'); */

useEffect(()=>{
    setClick(false);
},[click])
    return (
        <div className="d-flex justify-content-center">
            <div className='bg-dark rounded p-2 mx-2 container' style={{ opacity: `95%` }}>
                <div className="d-flex justify-content-center container-fluid">
                    <form onSubmit={e => {
                        e.preventDefault();
                        fetch(`https://${server}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${player}/${tagline}?api_key=${APIKEY}`)
                        .then(response => response.json())
                        .then(data => {
                            setPuuid(data.puuid);
                            setClick(true);
                        });
                    }}>
                        <div className="input-group mb-3 text-dark container-fluid">
                            <select className="btn btn-secondary dropdown-toggle rounded" value={server} onChange={(e) => setServer(e.target.value)} required >
                                <option selected disabled value="">Server</option>
                                <option value="americas">Americas</option>
                                <option value="asia">Asia</option>
                                <option value="europe">Europe</option>
                            </select>
                            <div className="row">
                                <div className="col-md">
                                    <div className="form-floating">
                                        <input type="text" className="form-control" name="gameID" required value={player} onChange={(e) => setPlayer(e.target.value)} />
                                        <label htmlFor="gameID">Gamer ID</label>
                                    </div>
                                </div>
                                <div className="col-md">
                                    <div className="form-floating">
                                        <input type="text" className="form-control" name="tagLine" required value={tagline} onChange={(e) => setTagline(e.target.value)} />
                                        <label htmlFor="tagLine">Tagline</label>
                                    </div>
                                </div>
                                <div className="col-md">
                                    <div className="form-floating">
                                        <input type="number" className="form-control" name="numberMatches" min="1" max="10" required value={noMatches} onChange={(e) => setNoMatches(e.target.value)} />
                                        <label htmlFor="numberMatches">No. of Matches</label>
                                    </div>
                                </div>
        
                                <button type="submit" id="searchMatches" className="btn btn-secondary m-1 rounded">
                                    Search Matches
        
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="container text-center">Select your server, then enter your game id and tagline. Click the <i className='bi bi-clipboard'></i> button to copy deck codes.</div>
                <Player player={player} tl={tagline} server={server} noMatches={noMatches} puuid={puuid} click={click}/>
            </div>
        
        </div>
    )
}



