import React from 'react'
import { Route, HashRouter, Routes as Routing } from 'react-router-dom'

import { Header } from './components'
import { Home, Result, Loading, CardView, Deckbuilder, MyDecks } from './pages'

const Routes = () => {
    return (
        <>
            <Loading />
            <HashRouter>
                <Header />
                <Routing>
                    <Route Component={Home} path="/" />
                    <Route Component={Result} path="/result" />
                    <Route Component={CardView} path="/card-vew" />
                    <Route Component={Deckbuilder} path="/deckbuilder" />
                    <Route Component={MyDecks} path="/mydecks" />
                    {/*<Route Component={DragAndDropExample} path="/drag" />*/}
                </Routing>
            </HashRouter>
        </>
    )
}

export default Routes
