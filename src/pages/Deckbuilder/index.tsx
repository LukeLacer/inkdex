import React, { useState } from 'react'

import './styles.css'

const Deckbuilder = () => {
    const [decklist, setDecklist] = useState('');

    return (
        <div className='deckbuilder-wrapper'>
            <div className='deck-input-wrapper'>
                <p>Insira seu deck aqui</p>
                <textarea
                    value={decklist}
                    onChange={(e) => setDecklist(e.target.value)}
                />
            </div>
            <div className='deck-viewer-wrapper'>
                <p>Visualizador</p>
                <pre>{
                    decklist
                }</pre>
            </div>
        </div>
    )
}

export default Deckbuilder
