import React,{useEffect,useState} from 'react';
import Player from './Player';


let config = require('./config.json')
const APIKEY = config.MY_API_TOKEN;
export default function PlayerSolo({match}) {
    const [puuid,setPuuid] = useState(null);
    useEffect(() => {
        const abortCont = new AbortController();
        setTimeout(() => {
            fetch(`https://${match.params.server}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${match.params.name}/${match.params.tagline}?api_key=${APIKEY}`,{signal: abortCont.signal})
                        .then(response => response.json())
                        .then(data => {
                            setPuuid(data.puuid);
                        });
        }, 100);
        return () => {
            abortCont.abort();
        }                
    }, [match.params])
    return (
        <div>
            <Player  player={match.params.name} tl={match.params.tagline} server={match.params.server} noMatches={match.params.matches} puuid={puuid}/>
        </div>
    )
}
