import React, { Component } from "react";
import './home.css';
import Navbar from '../Assets/navbar'
import { slideInRight, slideInLeft, slideInUp, zoomInDown, flipInY, slideInDown } from 'react-animations'
import Radium, { StyleRoot } from 'radium';

var qs = require('qs');
var assert = require('assert');
let audioLogout = new Audio(require('../Assets/Audio/logout.mp3'))
const styles = {
  slideInRight: {
    animation: 'x 1s',
    animationName: Radium.keyframes(slideInRight, 'slideInRight')
  },
  zoomInDown: {
    animation: 'x 0.5s',
    animationName: Radium.keyframes(zoomInDown, 'zoomInDown')
  },
  slideInDown: {
    animation: 'x 0.8s',
    animationName: Radium.keyframes(slideInDown, 'slideInDown')
  },
  flipInY: {
    animation: 'x 0.4s',
    animationName: Radium.keyframes(flipInY, 'flipInY')
  },
  slideInUp: {
    animation: 'x 0.4s',
    animationName: Radium.keyframes(slideInUp, 'slideInUp')
  }

}

class Home extends Component {

  constructor() {
    super();
    this.state = {
      logado: 0,
      secretfunction: 1
    }
  }

  componentDidMount = () => {
    fetch('https://login.microsoftonline.com/' + sessionStorage.getItem('Tenant') + '/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: qs.stringify({
        grant_type: 'client_credentials',
        client_id: sessionStorage.getItem('Client'),
        client_secret: sessionStorage.getItem('Secret'),
        resource: "https://management.azure.com/"
      })
    })
      .then(resposta => resposta.json())
      .then(response => {
        console.warn(response)
        if (response.access_token != undefined) {
          sessionStorage.setItem('token', response.access_token)
          this.setState({ logado: 1 })
        } else {
          this.setState({ logado: 0 })
        }
      })
  }

  navigateCriar = (event) => {
    event.preventDefault()
    this.props.history.push('/select')
  }
  navigateListar = (event) => {
    event.preventDefault()
    this.props.history.push('/listar')
  }
  navigateDeletar = (event) => {
    event.preventDefault()
    this.props.history.push('/listar')
  }

  logout = (event) => {
    event.preventDefault()
    sessionStorage.clear()
    audioLogout.play()
    this.props.history.push('/')
  }

  render() {
    return (
      <div className="backgroundRocket">
        <section>
          <Navbar />
          <div>
            {(this.state.logado == 1)
              ?
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div />
                  <div style={{ display: 'flex', marginTop: 5, marginRight: 5 }}>
                    <p style={{ fontFamily: 'Roboto, sans-serif', position: 'relative', top: 8, marginRight: 5, color: 'rgb(36, 36, 36)' }}>Token pronto</p>
                    <img draggable='false' width={35} src={require('../Assets/images/correct.png')} />
                  </div>
                </div>
              </div>
              :
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div />
                  <div style={{ display: 'flex', marginTop: 5, marginRight: 5 }}>
                    <p style={{ fontFamily: 'Roboto, sans-serif', position: 'relative', top: 8, marginRight: 5, color: 'rgb(36, 36, 36)' }}>Aguardando token...</p>
                    <img draggable='false' width={35} src={require('../Assets/images/remove.png')} />
                  </div>
                </div>
              </div>}
          </div>
          <StyleRoot>
            <div style={styles.slideInUp} className="logout">
              <a onClick={this.logout} href="">
                <img className="back" height={40} src={require('../Assets/images/logout.png')} />
              </a>
            </div>
          </StyleRoot>
        </section>
        <div style={{ overflowX: 'hidden' }}>
          <section style={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', fontFamily: 'Roboto, sans-serif', marginTop: 70 }}>
            <StyleRoot className="icon" style={{ marginTop: 110, marginLeft: 200, zIndex: 1 }}>
              <div className='button' style={styles.flipInY}>
                <a href="criar" onClick={this.navigateCriar} draggable="false">
                  <img className='imgs' draggable="false" width='200' src={require('../Assets/images/add.png')} />
                </a>
              </div>
            </StyleRoot>
            <StyleRoot className="icon" style={{ marginTop: 110, marginRight: 200, zIndex: 1 }}>
              <div className='button' style={styles.flipInY}>
                <a href="deletar" onClick={this.navigateDeletar} draggable="false">
                  <img draggable="false" width='200' src={require('../Assets/images/edit.png')} />
                </a>
              </div>
            </StyleRoot>
          </section>
        </div>
      </div>
    );
  }
}

export default Home;
