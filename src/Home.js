import React, { useState,useEffect } from 'react';
import loading from './img/loading.gif'

let config = require('./config.json')
const APIKEY = config.MY_API_TOKEN;

export default function Home() {
    const [americas,setAmericas] = useState(null);
    const [p_americas,setPAmericas] = useState(true);
    const [asia,setAsia] = useState(null);
    const [p_asia,setPAsia] = useState(true);
    const [europe,setEurope] = useState(null);
    const [p_europe,setPEurope] = useState(true);
    const [sea,setSea] = useState(null);
    const [p_sea,setPSea] = useState(true);

    useEffect(()=>{
        setPAmericas(true);
        setPAsia(true);
        setPEurope(true);
        setPSea(true);
        const abortCont = new AbortController();

        fetch(`https://americas.api.riotgames.com/lor/status/v1/platform-data?api_key=${APIKEY}`,{signal:abortCont.signal})
        .then(result => result.json())
        .then(data => {
            setAmericas(data);
            setPAmericas(false);
        }).catch(e=>console.log(e));

        fetch(`https://asia.api.riotgames.com/lor/status/v1/platform-data?api_key=${APIKEY}`,{signal:abortCont.signal})
        .then(result => result.json())
        .then(data => {
            setAsia(data);
            setPAsia(false);
        }).catch(e=>console.log(e));

        fetch(`https://europe.api.riotgames.com/lor/status/v1/platform-data?api_key=${APIKEY}`,{signal:abortCont.signal})
        .then(result => result.json())
        .then(data => {
            setEurope(data);
            setPEurope(false);
        }).catch(e=>console.log(e));

        fetch(`https://sea.api.riotgames.com/lor/status/v1/platform-data?api_key=${APIKEY}`,{signal:abortCont.signal})
        .then(result => result.json())
        .then(data => {
            setSea(data);
            setPSea(false);
        }).catch(e=>console.log(e));
        return () => {
            abortCont.abort();
        }
    },[])


    return (
        <div className="d-flex justify-content-center">
            <div className='bg-dark text-light rounded p-2 mx-2 container' style={{ opacity: `95%` }}>
                <h1 className="h1 text-center">Legends Of Runeterra </h1>
                <p className="text-center">
                    Legends of Runeterra is a free-to-play digital collectible card game developed and published by Riot Games. It released on April 29, 2020 for Microsoft Windows, Android, and iOS. The game uses characters and a setting originating in League of Legends, a multiplayer online battle arena game by Riot Games.
                </p>
                <div className='container-fluid row bg-dark text-light m-0 mb-4 rounded'>
                <h2 className="h2 text-center">Server Status</h2>
                    <div className="container-fluid col text-center bg-secondary rounded m-1 py-2" >
                        AMERICAS
                        {p_americas && <img src={loading} alt="loading" style={{maxHeight:'5vh'} } className="mx-auto d-block img-fluid"></img>}
                        {
                            americas && !p_americas &&  americas?.maintenances?.length === 0 && americas?.incidents?.length === 0 && <div className="bg-success rounded ">Server Available</div>
                        }
                    </div>
                    <div className="container-fluid col text-center bg-secondary rounded m-1 py-2" >
                        ASIA
                        {p_asia && <img src={loading} alt="loading" style={{maxHeight:'5vh'} } className="mx-auto d-block img-fluid"></img>}
                        {
                             asia && !p_asia && asia?.maintenances?.length === 0 && asia?.incidents?.length === 0 && <div className="bg-success rounded ">Server Available</div>
                        }
                    </div>
                    <div className="container-fluid col text-center bg-secondary rounded m-1 py-2">
                        EUROPE
                        {p_europe && <img src={loading} alt="loading" style={{maxHeight:'5vh'} } className="mx-auto d-block img-fluid"></img>}
                        {
                             europe && !p_europe && europe?.maintenances?.length === 0 && europe?.incidents?.length === 0 && <div className="bg-success rounded ">Server Available</div>
                        }
                    </div>
                    <div className="container-fluid col text-center bg-secondary rounded m-1 py-2" >
                        SEA
                        {p_sea && <img src={loading} alt="loading" style={{maxHeight:'5vh'} } className="mx-auto d-block img-fluid"></img>}
                        {
                            sea && !p_sea &&  sea?.maintenances?.length === 0 && sea?.incidents?.length === 0 && <div className="bg-success rounded ">Server Available</div>
                        }
                    </div>
                </div>
            </div>
       </div>
    )
}
