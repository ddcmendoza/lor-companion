import React from 'react';
import { Link }from 'react-router-dom';

export default function Navbar() {
    function handleClick(e){
        e.target.classList.add('active');
        let next_e = e.target.parentElement.parentElement.nextSibling;
        let prev_e = e.target.parentElement.parentElement.previousSibling;
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
            item.firstChild.firstChild.classList.remove('active');
        })
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light ">
            <div className="container-fluid d-flex align-items-center">
                <a className="navbar-brand" href="https://ddcmendoza.github.io/batch5-activities/">deybmen</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <Link to="/lor-companion/" className="nav-item" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                        <li  id="home" onClick ={e=>{handleClick(e)}}>
                            <p className="nav-link m-0" aria-current="page">Home</p>
                        </li>
                        </Link>
                        <Link to="/lor-companion/leaderboard" className="nav-item" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                        <li  id="leaderboard" onClick ={e=>{handleClick(e)}}>
                            <p className="nav-link m-0">Leaderboard</p>
                        </li>
                        </Link>
                        <Link to="/lor-companion/history" className="nav-item" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                        <li id="match-history" onClick ={e=>{handleClick(e)}}>
                            <p className="nav-link m-0">Match History</p>
                        </li>
                        </Link>
                        <Link to="/lor-companion/companion" className="nav-item" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                        <li id="game-companion" onClick ={e=>{handleClick(e)}}>
                            <p className="nav-link m-0">Game Companion</p>
                        </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
