import React, { Component } from "react";
import './login.css'
import { slideInRight, flipInY } from 'react-animations'
import Radium, { StyleRoot } from 'radium';
import Navbar from '../Assets/navbar'
const { remote } = window.require('electron');
let audioError = new Audio(require('../Assets/Audio/error.mp3'))
let audioSuccess = new Audio(require('../Assets/Audio/success.mp3'))

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
      incorreto: 0,
      enviando: false,
      error: false
    }
  }

  navigate = (event) => {
    this.setState({ error: false })
    event.preventDefault()
    this.setState({ enviando: true })
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
            this.setState({ enviando: false })
            this.setState({ error: true })
            audioSuccess.play()
            this.props.history.push('/home')
          }
        });
        if (this.state.error == false) {
          audioError.play()
        }
        this.setState({ enviando: false })
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
          <div style={{ marginLeft: 10, position: 'relative', left: 90, marginTop: 10, zIndex: 10 }}>
            <img draggable="false" height='100' style={{ marginTop: 40 }} src={require('../Assets/images/sn_logo.png')} />
            <p style={{ fontSize: 30, marginTop: 40, fontFamily: 'Roboto, sans-serif', textAlign: "center", color: 'grey' }}></p>
            <StyleRoot>
              <div style={styles.flipInY}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <input placeholder="PIN" onChange={this.pin} maxLength='4' style={{ outline: 0, borderTop: 0, borderLeft: 0, borderRight: 0, height: 60, borderWidth: 1, borderColor: 'red', backgroundColor: 'rgba(0, 0, 0, 0)', width: 150, marginTop: 50, position: 'relative', left: 23, fontSize: 30, textAlign: "center", color: 'grey' }} />
                  {this.state.pin.length == 4 ?
                    <img onClick={this.navigate} className="btn" draggable="false" width={60} src={require('../Assets/images/login.png')} style={{ cursor: 'pointer', position: "relative", opacity: 1, marginLeft: 0, top: 70, left: 68, marginRight: -10 }} />
                    :
                    <img draggable="false" width={60} src={require('../Assets/images/login.png')} style={{ position: "relative", opacity: 0.2, marginLeft: 0, top: 70, left: 68, marginRight: -10 }} />
                  }
                </div>
              </div>
            </StyleRoot>
            <a href='voltar' style={{ position: 'fixed', top: 550, left: 900 }} onClick={this.navigateCadastro}>
              <img className="back" height={70} src={require('../Assets/images/register.png')} />
            </a>
            <div className="loginstatus">
              {this.state.enviando == true ?
                <div class="spinner">
                  <div class="bounce1"></div>
                  <div class="bounce2"></div>
                  <div class="bounce3"></div>
                </div>
                : <p />}
            </div>
          </div>
          <img style={{ display: 'flex', position: "relative", left: -181, top: 250, marginRight: -240, zIndex: 0 }} width={310} height={360} src={require('../Assets/images/rocket.png')} />
          <img draggable="false" style={{ overflowY: 'hidden', marginTop: -25, marginLeft: 0, zIndex: 2 }} height='650' src={require('../Assets/images/fundologin.jpg')} />
        </div>
        {this.state.incorreto == 1 ?
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <StyleRoot style={{ marginTop: -450, marginLeft: 281, width: 110, height: 20, zIndex: 1 }}>
              <div style={styles.slideInRight}>
                <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderTopLeftRadius: 20, borderBottomLeftRadius: 20, height: 40, }}>
                  <p style={{ color: 'white', marginLeft: 10, position: 'relative', top: 10, fontFamily: 'Roboto, sans-serif' }}>PIN Incorreto</p>
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
