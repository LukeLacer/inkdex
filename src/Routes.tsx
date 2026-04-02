import React from 'react'
import { Route, HashRouter, Routes as Routing } from 'react-router-dom'

import { Home, Result, Loading } from './pages'

const Routes = () => {
    return (
        <>
            <Loading />
            <HashRouter>
                <Routing>
                    <Route Component={Home} path="/" />
                    <Route Component={Result} path="/result" />
                    {/*<Route Component={DragAndDropExample} path="/drag" />*/}
                </Routing>
            </HashRouter>
        </>
    )
}

export default Routes
