import React from 'react';
import ReactDOM from 'react-dom';
import login from './Login/login';
import home from './Home/home'
import criar from './Criar/criar'
import select from './Select/select'
import select2 from './Select/select2'
import criarApp from './CriarApp/criarApp'
import listar from './Listar/listar'
import criarSA from './CriarSA/criarSA'
import criarWordpress from './CriarWordpress/criarWordpress'
import criarDB from './CriarDatabase/criarDB'
import criarDatafactory from './CriarDatafactory/criardatafactory'
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

const CriarSA = ({ component: Component }) => (
    <Route render={props =>
        <Component {...props} />}
    />
)
const CriarDatafactory = ({ component: Component }) => (
    <Route render={props =>
        <Component {...props} />}
    />
)
const CriarWordpress = ({ component: Component }) => (
    <Route render={props =>
        <Component {...props} />}
    />
)
const Select2 = ({ component: Component }) => (
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
            <Select2 path='/select2' component={select2} />
            <CriarApp path='/criarapp' component={criarApp} />
            <Cadastro path='/cadastro' component={cadastro} />
            <CriarDB path='/criardb' component={criarDB} />
            <CriarSA path='/criarsa' component={criarSA} />
            <CriarDatafactory path='/criardatafactory' component={criarDatafactory} />
            <CriarWordpress path='/criarwordpress' component={criarWordpress} />
        </Switch>
    </HashRouter>
);

ReactDOM.render(routing, document.getElementById('root'));

//register for offline & unregister for online
serviceWorker.register();
