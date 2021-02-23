import React,{useState} from 'react'

const {DeckEncoder} = require('runeterra');
let set1 = require('./set1.json');
let set2 = require('./set2.json');
let set3 = require('./set3.json');

const CARDS = set1.concat(set2, set3);
const CARDCODE = CARDS.map(x => x.cardCode);
const PORT = '21337';
function compare(a, b) {
    if (a.card.cost< b.card.cost) {
      return -1;
    }
    if (a.card.cost > b.card.cost) {
      return 1;
    }
   return 0;
  }
export default function DeckViewer() {
    const [deck, setDeck] = useState(null);
    function handleForm(e){
        const deckCode = e.target.value;
        let deckTemp;
        try{
            deckTemp = DeckEncoder.decode(deckCode);
            let deck_ = deckTemp.map((card)=>{
                return {'card':CARDS[CARDCODE.indexOf(card.code)], 'count':card.count};
            })
            deck_.sort(compare)
            setDeck(deck_);
        }
        catch(e){
            console.log('invalid deck code')
        }

    }
    return (
        <div className="input-group mb-3 text-dark container">
            <div className="form-floating container-fluid p-1">
                <input type="text" className="form-control" name="DeckCode" onChange={handleForm} defaultValue="CIBAGAIBBQPDEBIDBECSSM2ULQBQEAYBAQEQEAYJBFLQIAIBAECASKQA" />
                <label htmlFor="DeckCode">Deck Code</label>
            </div>
            <div className="container bg-dark rounded p-2 mx-2 text-light" style={{minHeight:"4rem"}}>
                {console.log(deck)}
               <div className="d-flex">
               <div style={{width:"33%"}}>
                   <h2 className="text-center">Units</h2>
                        { deck?.filter(i => i.card.type ==='Unit').map((item)=>(
                                <div key={item.card.cardCode} className='container'>
                                    <div className="m-1 p-1 my-0 rounded d-flex align-items-center justify-content-between" style={{
                                        background:`url(${item.card.assets[0].fullAbsolutePath})`,
                                        backgroundPosition:`center`,
                                        height:`2em`,
                                        overflow:`hidden`,
                                        textShadow:'2px 2px 1px black',
                                        opacity: '95%'
                                        }}>
                                        <b className="float-left text-primary text-center align-middle bg-light m-0 p-auto" style={{
                                            borderRadius: "50%",
                                            width: "2em",
                                            textShadow:'0px 0px 1px black',
                                            boxShadow:'1px 1px 1px gray'
                                        }}>{item.card.cost}</b>
                                        <p className="text-align-center d-inline mx-3 my-0">{item.card.name}</p>  
                                        <b className="float-right my-0">{item.count}</b>
                                        </div>  
                                </div>
                        ))
                        }
                    </div>
                    <div style={{width:"33%"}}>
                        <h2 className="text-center">Spells</h2>
                        { deck?.filter(i => i.card.type ==='Spell').map((item)=>(
                                <div key={item.card.cardCode} className='container'>
                                    <div className="m-1 p-1 my-0 rounded d-flex align-items-center justify-content-between" style={{
                                        background:`url(${item.card.assets[0].fullAbsolutePath})`,
                                        backgroundPosition:`center`,
                                        height:`2em`,
                                        overflow:`hidden`,
                                        textShadow:'2px 2px 1px black',
                                        opacity: '95%'
                                        }}>
                                        <b className="float-left text-primary text-center align-middle bg-light m-0 p-auto" style={{
                                            borderRadius: "50%",
                                            width: "2em",
                                            textShadow:'0px 0px 1px black',
                                            boxShadow:'1px 1px 1px gray'
                                        }}>{item.card.cost}</b>
                                        <p className="text-align-center d-inline mx-3 my-0">{item.card.name}</p> 
                                        <b className="float-right my-0">{item.count}</b>
                                        </div>  
                                </div>
                        ))
                        }
                    </div>
                    <div style={{width:"33%"}}>
                        <h2 className="text-center">Landmarks</h2>
                        { deck?.filter(i => i.card.type ==='Landmark').map((item)=>(
                                <div key={item.card.cardCode} className='container'>
                                    <div className="m-1 p-1 my-0 rounded d-flex align-items-center justify-content-between" style={{
                                        background:`url(${item.card.assets[0].fullAbsolutePath})`,
                                        backgroundPosition:`center`,
                                        height:`2em`,
                                        overflow:`hidden`,
                                        textShadow:'2px 2px 1px black',
                                        opacity: '95%'
                                        }}>
                                        <b className="float-left text-primary text-center align-middle bg-light m-0 p-auto" style={{
                                            borderRadius: "50%",
                                            width: "2em",
                                            textShadow:'0px 0px 1px black',
                                            boxShadow:'1px 1px 1px gray'
                                        }}>{item.card.cost}</b>
                                        <p className="text-align-center d-inline mx-3 my-0">{item.card.name}</p>  
                                        <b className="float-right my-0">{item.count}</b>
                                        </div>  
                                </div>
                        ))
                        }
                    </div>
               </div>
            </div>
        </div>
    )
}
