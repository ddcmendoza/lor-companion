import React from 'react'
import { useState, useEffect } from 'react'
import loading from './img/loading.gif'
let config = require('./config.json')
const APIKEY = config.MY_API_TOKEN;

export default function Leaderboard() {
    const [server, setServer] = useState('americas');
    const [list, setList] = useState(null);
    const [isPending, setIsPending] = useState(true);


    useEffect(() => {
        const abortCont = new AbortController();
        setIsPending(false);
        if(server){
            setIsPending(true);
            fetch(`https://${server}.api.riotgames.com/lor/ranked/v1/leaderboards?api_key=${APIKEY}`,{signal: abortCont.signal})
            .then(response => {
                if(!response.ok){
                    throw new Error('Response is not ok')
                }
                setList(null);
                return response.json()})
            .then(data =>{
                 setList(data.players);
                 setIsPending(false);
            }).catch(e=>{
                console.log(e);
                setTimeout(() => {
                    setServer(server);
                }, 1000);
            });
        }
        return () => {
            abortCont.abort();
        }

    }, [server])
    function handleClick(e){
        setServer(e.target.value);
        e.target.classList.add('active');
        let next_e = e.target.nextSibling;
        let prev_e = e.target.previousSibling;
        let siblings = [];
        while(next_e){
            siblings.push(next_e);
            next_e = next_e.nextSibling;
        }
        while(prev_e){
            siblings.push(prev_e);
            prev_e = prev_e.previousSibling;
        }
        siblings.map((item)=>{
            item.classList.remove('active');
        })
    }
    return (
        <div className="d-flex justify-content-center">
            <div className='bg-dark text-light rounded p-2 mx-2 container' style={{ opacity: `95%` }}>
                <div className="container btn-group rounded mb-2 d-flex justify-content-center">
                    <button onClick ={e=>{handleClick(e)}} className="btn btn-secondary active" value='americas'>AMERICAS</button>
                    <button onClick ={e=>{handleClick(e)}} className="btn btn-secondary" value='asia'>ASIA</button>
                    <button onClick ={e=>{handleClick(e)}} className="btn btn-secondary" value='europe'>EUROPE</button>
                    <button onClick ={e=>{handleClick(e)}} className="btn btn-secondary" value='sea'>SEA</button>
                </div>
                {isPending && <img className='img-fluid mx-auto d-block' src={loading} style={{maxHeight:'20vh'} } alt="loading"/>}
                {!isPending && list && <table className ="table table-dark table-striped table-hover rounded">
                    <tbody className="container-fluid">
                        <tr>
                            <th scope="col">Rank</th>
                            <th scope="col">Player Name</th>
                            <th scope="col">LP</th>
                        </tr>
                        {list.map((item)=>(
                                <tr key={item.rank}>
                                    <th scope='row'>{item.rank + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.lp}</td>
                                </tr>
                        ))
                    }
                    </tbody>
                </table>}
                {!list && !isPending &&  <p className='text-center'>Can not get leaderboard at the moment. Try again later</p>}
            </div>
        </div>
    )
}
