import React, { Component } from "react";
import './login.css'
import { slideInRight, flipInY } from 'react-animations'
import Radium, { StyleRoot } from 'radium';
import Navbar from '../Assets/navbar'
const { remote } = window.require('electron');
const styles = {
  slideInRight: {
    animation: 'x 1s',
    animationName: Radium.keyframes(slideInRight, 'slideInRight')
  },
  flipInY: {
    animation: 'x 0.5s',
    animationName: Radium.keyframes(flipInY, 'flipInY')
  },
}

class Login extends Component {

  constructor() {
    super();
    this.state = {
      pin: '',
      incorreto: 0
    }
  }

  navigate = (event) => {
    event.preventDefault()

    fetch('https://dynamicspace.dev.objects.universum.blue/dynamictenants', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(resposta => resposta.json())
      .then(response => {
        response.forEach(element => {
          if (element.pin == this.state.pin) {
            sessionStorage.setItem("Subscription", element.Subscription)
            sessionStorage.setItem("Client", element.Client)
            sessionStorage.setItem("Tenant", element.Tenant)
            sessionStorage.setItem("Secret", element.Secret)
            this.props.history.push('/home')
          }
        });
        this.setState({ incorreto: 1 })
      })

  }

  navigateCadastro = (event) => {
    event.preventDefault()
    this.props.history.push('/cadastro')
  }

  pin = (event) => {
    this.setState({ incorreto: 0 })
    this.setState({ pin: event.target.value });
  }

  render() {
    return (
      <body>
        <div>
          <Navbar />
          <div style={{ height: 25, position: 'relative', top: -25, width: 336, zIndex: 10, backgroundColor: 'rgba(30, 30, 30, 1)', justifyContent: 'space-between' }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: 'rgba(0, 0, 0, 0.15', marginTop: -25 }}>
          <div style={{ marginLeft: 10, position: 'relative', left: 60, marginTop: 30, zIndex: 10 }}>
            <img draggable="false" height='100' style={{ marginTop: 40 }} src={require('../Assets/images/sn_logo.png')} />
            <p style={{ fontSize: 30, marginTop: 40, fontFamily: 'Roboto, sans-serif', textAlign: "center", color: 'grey' }}></p>
            <StyleRoot>
              <div style={styles.flipInY}>
                <input placeholder="PIN" onChange={this.pin} maxLength='4' style={{ outline: 0, borderTop: 0, borderLeft: 0, borderRight: 0, height: 60, borderWidth: 1, borderColor: 'red', backgroundColor: 'rgba(0, 0, 0, 0)', width: 150, marginTop: 50, position: 'relative', left: 23, fontSize: 30, textAlign: "center", color: 'grey' }} />
                {this.state.pin.length == 4 ?
                  <a className="botao" draggable='false' href='click' onClick={this.navigate}>
                    <img className="btn" draggable="false" width={60} src={require('../Assets/images/login.png')} style={{ position: "relative", opacity: 1, marginLeft: 0, top: 70, left: 68, marginRight: -10 }} />
                  </a>
                  :
                  <img draggable="false" width={60} src={require('../Assets/images/login.png')} style={{ position: "relative", opacity: 0.2, marginLeft: 0, top: 70, left: 68, marginRight: -10 }} />
                }
              </div>
            </StyleRoot>
            <a href='cadastro' onClick={this.navigateCadastro} style={{ position: 'relative', top: 250, left: 820 }}>
              <p>Cadastro</p>
            </a>
          </div>
          <img style={{ display: 'flex', position: "relative", left: -181, top: 250, marginRight: -310, zIndex: 0 }} width={310} height={360} src={require('../Assets/images/rocket.png')} />
          <img draggable="false" style={{ overflowY: 'hidden', marginTop: -25, marginLeft: 130, zIndex: 2 }} height='720' src={require('../Assets/images/fundologin.jpg')} />
        </div>
        {this.state.incorreto == 1 ?
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <StyleRoot style={{ marginTop: -500, marginLeft: 226, width: 110, height: 20, zIndex: 1 }}>
              <div style={styles.slideInRight}>
                <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderTopLeftRadius: 20, borderBottomLeftRadius: 20, height: 40, }}>
                  <p style={{ color: 'white', marginLeft: 11, position: 'relative', top: 10, fontFamily: 'Roboto, sans-serif' }}>PIN Incorreto</p>
                </div>
              </div>
            </StyleRoot>
          </div>
          :
          <div />
        }
      </body>
    );
  }
}



export default Login;
