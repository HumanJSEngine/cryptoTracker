import { useState } from 'react';
import { Reset } from 'styled-reset';
import Coins from './routes/Coins';

function Root() {


    return (
        <>
            <Reset />
            <div className='App'>
                <h1>Home</h1>
                <Coins />
            </div>
        </>
    );
}

export default Root;
