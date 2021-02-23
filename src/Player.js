import React, { useState, useEffect } from 'react';
import PlayerCard from './PlayerCard';
import versus from './img/vs.png'
import loading from './img/loading.gif'


let config = require('./config.json')
const APIKEY = config.MY_API_TOKEN;

export default function Player(props) {
    const [games, setGames] = useState(null);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(true);
    let puuid = props.puuid;

    /* const [player,setPlayer] = useState(props.player);
    const [tagline,setTagline] = useState(props.tl);
    const [server,setServer] = useState(props.server);
    const [noMatches,setNoMatches] = useState(props.noMatches); */
    let player = props.player;
    let tagline = props.tl;
    let server = props.server;
    let noMatches = props.noMatches;
    useEffect(() => {
        const abortCont = new AbortController();

        setTimeout(async () => {
            if (puuid && server && noMatches) {
                setFetching(true);
                let fetchmatchid = await fetch(`https://${await server}.api.riotgames.com/lor/match/v1/matches/by-puuid/${await puuid}/ids?api_key=${APIKEY}`, { signal: abortCont.signal })
                    .catch(e => {
                        console.log(e);
                        setFetching(false);
                        setError(true);
                    })
                let matchIDs = await fetchmatchid.json();
                let matchObjList = [];
                
                for (let i = 0; i < noMatches; i++) {
                    let matchObjfetch = await fetch(`https://${server}.api.riotgames.com/lor/match/v1/matches/${matchIDs[i]}?api_key=${APIKEY}`, { signal: abortCont.signal }).then(data => {
                        if (!data.ok) {
                            if(data.status ===429) {
                                abortCont.abort();
                            }
                            throw new Error('can not find match');
                        }
                        setError(false);
                        if (i === noMatches - 1) setFetching(false);
                        return data;
                    }).catch(e => {
                        console.log(e);
                        setFetching(false);
                        setError(true);
                    });
                    let matchObj = await matchObjfetch?.json();
                    matchObjList[i] = matchObj;
                }
                setGames(matchObjList);
            }
            return () => {
                abortCont.abort();
            }
        }, 1000)



    }, [puuid, props.click])
    return (
        <div className="d-flex justify-content-center mb-5">
            <div className='bg-dark text-light rounded p-2 mx-2 container' style={{ opacity: `90%` }}>
                {puuid && <div>
                    <h1 className="text-center">{player}#{tagline}'s Recent {noMatches} matches </h1>
                    <h2 className="text-center">Server: {server && server.toUpperCase()} </h2>
                </div>
                }

                {fetching && <img className='img-fluid mx-auto d-block' src={loading} style={{ maxHeight: '20vh' }} alt="loading" />}

                {games && !fetching && !error &&
                    games.map((game) => (
                        <div className="container bg-secondary text-light d-flex justify-content-center mb-1 rounded" key={game?.metadata?.match_id}>
                            <div className="text-center">
                                <h4>{game?.info?.game_mode}</h4>
                                <p className="m-0 p-0">{new Date(game?.info?.game_start_time_utc).toUTCString()}</p>
                                <p>{game?.info?.total_turn_count} Turns</p>
                                <div className="d-flex justify-content-center align-items-center mb-1 rounded row">
                                    <div className='container col-5'><PlayerCard player={game?.info?.players[0]} isLeft={true} server={server} noMatches={noMatches} /></div>
                                    <div className='container col-2'><img src={versus} alt='' style={{ maxWidth: '7vw' }}></img></div>
                                    <div className='container col-5'><PlayerCard player={game?.info?.players[1]} isLeft={false} server={server} noMatches={noMatches} /></div>
                                </div>
                            </div>
                        </div>
                    ))
                }
                {puuid&& error && !fetching && <div className="bg-light text-dark rounded p-3 m-2 h2 text-center">No Match Found</div>}


            </div>
        </div>
    )
}
