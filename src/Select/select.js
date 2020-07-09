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
      <div style={{ height: "100vh", backgroundColor: 'rgb(214, 214, 214)' }}>
        <Navbar />
        <StyleRoot>
          <div style={styles.slideInDown} className="backBar">
            <a href="voltar" onClick={this.navigateVoltar}>
              <img className="back" height={35} style={{ marginLeft: 5 }} src={require('../Assets/return.png')} />
            </a>
            <div>
              {(localStorage.getItem('token') != undefined)
                ?
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div />
                  <div style={{ display: 'flex', marginTop: 5, marginRight: 5 }}>
                    <p style={{ fontFamily: 'Roboto, sans-serif', position: 'relative', top: 8, marginRight: 5 }}>Token pronto</p>
                    <img onClick={this.penismusic} draggable='false' width={35} src={require('../Assets/correct.png')} />
                  </div>
                </div>
                :
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div />
                  <div style={{ display: 'flex', marginTop: 5, marginRight: 5 }}>
                    <p style={{ fontFamily: 'Roboto, sans-serif', position: 'relative', top: 8, marginRight: 5 }}>Aguardando token...</p>
                    <img draggable='false' width={35} src={require('../Assets/remove.png')} />
                  </div>
                </div>}
            </div>
          </div>
        </StyleRoot>
        <div style={{ overflowX: 'hidden' }}>
          <img draggable='false' width='460' height='530' style={{ transition: '200ms', marginBottom: -530, position: 'relative', left: 564, zIndex: 0, top: 77 }} src={require('../Assets/rocket.png')} />
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
