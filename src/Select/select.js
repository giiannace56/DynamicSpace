import React, { Component } from "react";
import './select.css';
import Navbar from '../Assets/navbar'
import Radium, { StyleRoot } from 'radium';
import { slideInLeft, zoomInDown, slideInRight, slideInDown, flipInY } from 'react-animations'


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
  }
}

class Select extends Component {

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
  navigateListar = (event) => {
    event.preventDefault()
    this.props.history.push('/listar')
  }
  navigateDeletar = (event) => {
    event.preventDefault()
    this.props.history.push('/deletar')
  }
  navigateVoltar = (event) => {
    event.preventDefault()
    this.props.history.push('/home')
  }

  render() {
    return (
      <div className="backgroundRocket">
        <Navbar />
        <div className="backBar">
          <a href="voltar" onClick={this.navigateVoltar}>
            <img className="back" height={35} style={{ marginLeft: 10 }} src={require('../Assets/images/return.png')} />
          </a>
          <p className="titleBarList">Selecione o tipo de recurso que deseja criar</p>
          <div style={{ marginRight: 40 }}>
          </div>
        </div>
        <div style={{ overflowX: 'hidden', overflowY: 'hidden' }}>
          <section style={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', fontFamily: 'Roboto, sans-serif', marginTop: 97, height: 537 }}>
            <StyleRoot style={{ marginTop: 100, marginLeft: 20, zIndex: 1 }}>
              <div className='button' style={styles.flipInY}>
                <a href="criar" className="icon" onClick={this.navigateCriar} draggable="false">
                  <img className='imgs' draggable="false" width='200' src={require('../Assets/images/vm.png')} />
                </a>
              </div>
              <p className="descSelect">Máquina Virtual</p>
            </StyleRoot>
            <StyleRoot style={{ marginTop: 100, marginRight: 0, zIndex: 1 }}>
              <div className='button' style={styles.flipInY}>
                <a href="criar" className="icon" onClick={this.navigateCriarApp} draggable="false">
                  <img className='imgs' draggable="false" width='200' src={require('../Assets/images/webapp.png')} />
                </a>
              </div>
              <p className="descSelect">Web App</p>
            </StyleRoot>
            <StyleRoot style={{ marginTop: 100, marginRight: 0, zIndex: 1 }}>
              <div className='button' style={styles.flipInY}>
                <a href="criar" className="icon" onClick={this.navigateCriar} draggable="false">
                  <img className='imgs' draggable="false" width='200' src={require('../Assets/images/database.png')} />
                </a>
              </div>
              <p className="descSelect">Banco de Dados</p>
            </StyleRoot>
            <StyleRoot style={{ marginTop: 100, marginRight: 20, zIndex: 1 }}>
              <div className='button' style={styles.flipInY}>
                <a href="criar" className="icon" onClick={this.navigateCriar} draggable="false">
                  <img className='imgs' draggable="false" width='200' src={require('../Assets/images/idk.png')} />
                </a>
              </div>
              <p className="descSelect">?????????</p>
            </StyleRoot>
          </section>
        </div>
      </div>
    );
  }
}

export default Select;
