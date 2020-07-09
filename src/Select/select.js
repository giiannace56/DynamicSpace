import React, { Component } from "react";
import './select.css';
import Navbar from '../Assets/navbar'
import Radium, { StyleRoot } from 'radium';
import { slideInLeft, zoomInDown, slideInRight, slideInDown } from 'react-animations'


var qs = require('qs');
var assert = require('assert');
const styles = {
  zoomInDown: {
    animation: 'x 0.5s',
    animationName: Radium.keyframes(zoomInDown, 'zoomInDown')
  },
  slideInDown: {
    animation: 'x 0.5s',
    animationName: Radium.keyframes(slideInDown, 'slideInDown')
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
        <StyleRoot>
          <div style={styles.slideInDown} className="backBar">
            <a href="voltar" onClick={this.navigateVoltar}>
              <img className="back" height={35} style={{ marginLeft: 10 }} src={require('../Assets/return.png')} />
            </a>
            <p className="titleBarList">Selecione o tipo de recurso que deseja criar</p>
            <div style={{marginRight: 40}}>
            </div>
          </div>
        </StyleRoot>
        <div style={{ overflowX: 'hidden', overflowY: 'hidden' }}>
          <section style={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', fontFamily: 'Roboto, sans-serif', marginTop: 97, height: 537 }}>
            <StyleRoot className="icon" style={{ marginTop: 100, marginLeft: 20, zIndex: 1 }}>
              <div className='button' style={styles.zoomInDown}>
                <a href="criar" onClick={this.navigateCriar} draggable="false">
                  <img className='imgs' draggable="false" width='200' src={require('../Assets/software.png')} />
                </a>
              </div>
            </StyleRoot>
            <StyleRoot className="icon" style={{ marginTop: 100, marginRight: 0, zIndex: 1 }}>
              <div className='button' style={styles.zoomInDown}>
                <a href="criar" onClick={this.navigateCriar} draggable="false">
                  <img className='imgs' draggable="false" width='200' src={require('../Assets/software.png')} />
                </a>
              </div>
            </StyleRoot>
            <StyleRoot className="icon" style={{ marginTop: 100, marginRight: 0, zIndex: 1 }}>
              <div className='button' style={styles.zoomInDown}>
                <a href="criar" onClick={this.navigateCriar} draggable="false">
                  <img className='imgs' draggable="false" width='200' src={require('../Assets/software.png')} />
                </a>
              </div>
            </StyleRoot>
            <StyleRoot className="icon" style={{ marginTop: 100, marginRight: 20, zIndex: 1 }}>
              <div className='button' style={styles.zoomInDown}>
                <a href="criar" onClick={this.navigateCriar} draggable="false">
                  <img className='imgs' draggable="false" width='200' src={require('../Assets/software.png')} />
                </a>
              </div>
            </StyleRoot>
          </section>
        </div>
      </div>
    );
  }
}

export default Select;
