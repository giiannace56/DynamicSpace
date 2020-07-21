import React, { Component } from "react";
import './select.css';
import Navbar from '../Assets/navbar'
import Radium, { StyleRoot } from 'radium';
import { slideInLeft, zoomInDown, slideInRight, slideInDown, flipInY, flipInX, fadeIn } from 'react-animations'


var qs = require('qs');
var assert = require('assert');
const styles = {
    zoomInDown: {
        animation: 'x 0.5s',
        animationName: Radium.keyframes(zoomInDown, 'zoomInDown')
    },
    flipInY: {
        animation: 'x 0.4s',
        animationName: Radium.keyframes(flipInY, 'flipInY')
    },
    flipInX: {
        animation: 'x 0.4s',
        animationName: Radium.keyframes(flipInX, 'flipInX')
    },
    fadeIn: {
        animation: 'x 0.4s',
        animationName: Radium.keyframes(fadeIn, 'fadeIn')
    }
}

class Select2 extends Component {

    constructor() {
        super();
        this.state = {

        }
    }

    componentDidMount = () => {

    }

    navigateCriar = (event) => {
        event.preventDefault()
        this.props.history.push('/criar')
    }
    navigateCriarApp = (event) => {
        event.preventDefault()
        this.props.history.push('/criarapp')
    }
    navigateCriarDB = (event) => {
        event.preventDefault()
        this.props.history.push('/criardb')
    }
    navigateCriarSA = (event) => {
        event.preventDefault()
        this.props.history.push('/criarsa')
    }
    navigateCriarDF = (event) => {
        event.preventDefault()
        this.props.history.push('/criardatafactory')
    }
    navigateCriarWP = (event) => {
        event.preventDefault()
        this.props.history.push('/criarwordpress')
    }
    navigateVoltar = (event) => {
        event.preventDefault()
        this.props.history.push('/home')
    }

    navigateSelect = (event) => {
        event.preventDefault()
        this.props.history.push('/select')
    }

    render() {
        return (
            <div className="backgroundRocket">
                <Navbar />
                <div className="backBar">
                    <a href="voltar" onClick={this.navigateVoltar}>
                        <img className="back" height={35} style={{ marginLeft: 10 }} src={require('../Assets/images/return.png')} />
                    </a>
                    <StyleRoot>
                        <p style={styles.flipInX} className="titleBarList">Recursos extras</p>
                    </StyleRoot>
                    <div style={{ marginRight: 40 }}>
                    </div>
                </div>
                <div style={{ overflowX: 'hidden', overflowY: 'hidden' }}>
                    <section style={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', fontFamily: 'Roboto, sans-serif', marginTop: 168, height: 537 }}>
                        <StyleRoot style={{ marginRight: 10, marginLeft: 240, zIndex: 1 }}>
                            <div className='button' style={styles.flipInY}>
                                <a href="criar" className="icon" onClick={this.navigateCriarDF} draggable="false">
                                    <img className='imgs' draggable="false" width='200' src={require('../Assets/images/datafactory.png')} />
                                </a>
                            </div>
                            <p className="descSelect">Data Factory</p>
                        </StyleRoot>
                        <StyleRoot style={{ marginRight: 240, marginLeft: 10, zIndex: 1 }}>
                            <div className='button' style={styles.flipInY}>
                                <a href="criar" className="icon" onClick={this.navigateCriarWP} draggable="false">
                                    <img className='imgs' draggable="false" width='200' src={require('../Assets/images/wordpress.png')} />
                                </a>
                            </div>
                            <p className="descSelect">Wordpress</p>
                        </StyleRoot>
                    </section>
                    <StyleRoot style={{ position: 'fixed', top: 600, left: 470 }}>
                        <div style={styles.fadeIn}>
                            <div className="selectNav">
                                <div className="numberNav" onClick={this.navigateSelect}>
                                    <p>1</p>
                                </div>
                                <div className="numberNavActive">
                                    <p>2</p>
                                </div>
                            </div>
                        </div>
                    </StyleRoot>
                </div>
            </div>
        );
    }
}

export default Select2;