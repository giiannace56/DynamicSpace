import React from 'react';
import ReactDOM from 'react-dom';
import login from './Login/login';
import home from './Home/home'
import criar from './Criar/criar'
import select from './Select/select'
import criarApp from './CriarApp/criarApp'
import listar from './Listar/listar'
import criarDB from './CriarDatabase/criarDB'
import cadastro from './Cadastro/cadastro'
import * as serviceWorker from './serviceWorker';
import { Route, Link, HashRouter as Router, Switch, Redirect, HashRouter } from "react-router-dom";

//Add pages to component

const Login = ({ component: Component }) => (
    <Route render={props =>
        <Component {...props} />}
    />
)
const Home = ({ component: Component }) => (
    <Route render={props =>
        <Component {...props} />}
    />
)
const Criar = ({ component: Component }) => (
    <Route render={props =>
        <Component {...props} />}
    />
)
const Listar = ({ component: Component }) => (
    <Route render={props =>
        <Component {...props} />}
    />
)
const Select = ({ component: Component }) => (
    <Route render={props =>
        <Component {...props} />}
    />
)

const CriarApp = ({ component: Component }) => (
    <Route render={props =>
        <Component {...props} />}
    />
)

const Cadastro = ({ component: Component }) => (
    <Route render={props =>
        <Component {...props} />}
    />
)

const CriarDB = ({ component: Component }) => (
    <Route render={props =>
        <Component {...props} />}
    />
)

//Add routes to pages

const routing = (
    <HashRouter>
        <Switch>
            <Login exact path='/' component={login} />
            <Home path='/home' component={home} />
            <Criar path='/criar' component={criar} />
            <Listar path='/listar' component={listar} />
            <Select path='/select' component={select} />
            <CriarApp path='/criarapp' component={criarApp} />
            <Cadastro path='/cadastro' component={cadastro} />
            <CriarDB path='/criardb' component={criarDB} />
        </Switch>
    </HashRouter>
);

ReactDOM.render(routing, document.getElementById('root'));

//register for offline & unregister for online
serviceWorker.register();
