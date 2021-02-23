import {React, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
let globals,factionIcons;
const FACTIONS = {
    'faction_Freljord_Name':'FR',
    'faction_MtTargon_Name':'MT',
    'faction_Bilgewater_Name':'BW',
    'faction_Demacia_Name':'DE',
    'faction_Ionia_Name':'IO',
    'faction_Noxus_Name':'NX',
    'faction_ShadowIsles_Name':'SI',
    'faction_Piltover_Name':'PZ'
}
let config = require('./config.json')
const APIKEY = config.MY_API_TOKEN;
export default function PlayerCard(props) {
    let player_details = props.player;
    const history = useHistory();
    const [url, setURL] = useState(null);
    const [name, setName] = useState(null);
    const [tl, setTL] = useState(null);
    useEffect(() => {
        const abortCont = new AbortController();

        setTimeout( async() => {
            globals = await (await fetch(`https://dd.b.pvp.net/latest/core/en_us/data/globals-en_us.json`,{signal: abortCont.signal}).catch(e => {
                console.log(e);
            })).json();
            let factions = await globals.regions.filter((faction)=> faction.abbreviation === FACTIONS[player_details.factions[0]] || faction.abbreviation === FACTIONS[player_details.factions[1]] );
            factionIcons = await factions.map(x => x.iconAbsolutePath);
            setURL(factionIcons);

            let nameFetch = await (await(fetch(`https://${props.server}.api.riotgames.com/riot/account/v1/accounts/by-puuid/${player_details.puuid}?api_key=${APIKEY}`,{signal: abortCont.signal}).catch(e => {
                console.log(e);
            }))).json();
            setName(await nameFetch.gameName);
            setTL(await nameFetch.tagLine);
        }, 100);

        return () => {
            abortCont.abort();
        }
    }, [])

    function copyDeckCode(){
        navigator.clipboard.writeText(player_details.deck_code).then( ()=>{
            console.log(player_details.deck_code);
        });
    }
    function goToPage(){
        history.push(`/lor-companion/history/${props.server}/${name}/${tl}/${props.noMatches}`);
    }
    return (
        <div>
            {player_details.game_outcome ==='win' && 
            <div className="bg-success rounded p-2">
                <div className="text-center"><button className='btn text-light' onClick={goToPage}>{name}#{tl}</button></div>
                <span className="d-flex justify-content-center align-items-center">
                    {props.isLeft && <button className='btn btn-light mx-1' onClick={copyDeckCode}><i className='bi bi-clipboard'/></button>}
                        <img className='img' src={url?.[0]} alt={player_details.factions[0]} style={{maxWidth: '5vw'}}/>
                        <img className='img' src={url?.[1]} alt={player_details.factions[1]} style={{maxWidth: '5vw'}}/>
                    {!props.isLeft && <button className='btn btn-light mx-1' onClick={copyDeckCode}><i className='bi bi-clipboard'/></button>}
                </span>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, omnis.</p>
            </div>
            }
            {player_details.game_outcome !=='win' && <div className="bg-danger rounded p-2">
            <div className="text-center"><button className='btn text-light' onClick={goToPage}>{name}#{tl}</button></div>
                <span className="d-flex justify-content-center align-items-center">
                {props.isLeft && <button className='btn btn-light mx-1' onClick={copyDeckCode}><i className='bi bi-clipboard'/></button>}
                <img className='img' src={url?.[0]} alt={player_details.factions[0]} style={{maxWidth: '5vw'}}/>
                <img className='img' src={url?.[1]} alt={player_details.factions[1]} style={{maxWidth: '5vw'}}/>
                {!props.isLeft && <button className='btn btn-light mx-1' onClick={copyDeckCode}><i className='bi bi-clipboard' /></button>}
            </span>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, inventore.</p>
            </div>}
        </div>
    )
}
