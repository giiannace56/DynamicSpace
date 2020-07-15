import React, { Component } from "react";
import './cadastro.css'
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

class Cadastro extends Component {

  constructor() {
    super();
    this.state = {
      Subcription: '',
      Tenant: '',
      Secret: '',
      PIN: '',
      Client: '',
      data: [],
      repeticao: false,
      incorreto: 0

    }
  }

  navigate = (event) => {
    event.preventDefault()
    this.props.history.push('/')
  }

  verificar = (event) => {
    this.setState({ incorreto: 0 })
    event.preventDefault()
    this.state.repeticao = false
    fetch('https://dynamicspace.dev.objects.universum.blue/dynamictenants', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(resposta => resposta.json())
      .then(response => {
        response.forEach(element => {
          if (element.pin == this.state.PIN) {
            this.setState({ repeticao: true })
            this.setState({ incorreto: 1 })
          }
        });
        if (this.state.repeticao == false) {
          this.cadastrar()
        }
      })
  }

  cadastrar = () => {
    fetch('https://dynamicspace.dev.objects.universum.blue/dynamictenants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pin: this.state.PIN,
        Subscription: this.state.Subcription,
        Client: this.state.Client,
        Tenant: this.state.Tenant,
        Secret: this.state.Secret
      })
    })
      .then(response => {
        this.setState({ status: response.status })
      })
  }



  render() {
    return (
      <body>
        <div>
          <Navbar />
          <div style={{ height: 25, position: 'relative', top: -25, width: 336, zIndex: 10, backgroundColor: 'rgba(30, 30, 30, 1)', justifyContent: 'space-between' }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: 'rgba(0, 0, 0, 0.15', marginTop: -25 }}>
          <div style={{ marginLeft: 12, position: 'relative', left: 60, marginTop: 30, zIndex: 10 }}>
            <img draggable="false" height='100' style={{ position: 'relative', top: 40, right: 2 }} src={require('../Assets/images/sn_logo.png')} />
            <p style={{ fontSize: 30, marginTop: 40, fontFamily: 'Roboto, sans-serif', textAlign: "center", color: 'grey' }}></p>
            <StyleRoot>
              <div style={styles.flipInY}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>

                  <input placeholder="Sub" value={this.state.Subcription} onChange={(event) => { this.setState({ Subcription: event.target.value }) }} style={{ outline: 0, borderTop: 0, borderLeft: 0, borderRight: 0, height: 60, borderWidth: 1, borderColor: 'red', backgroundColor: 'rgba(0, 0, 0, 0)', width: 150, marginTop: 20, position: 'relative', left: 21, fontSize: 30, textAlign: "center", color: 'grey' }} />
                  <input placeholder="Client" value={this.state.Client} onChange={(event) => { this.setState({ Client: event.target.value }) }} style={{ outline: 0, borderTop: 0, borderLeft: 0, borderRight: 0, height: 60, borderWidth: 1, borderColor: 'red', backgroundColor: 'rgba(0, 0, 0, 0)', width: 150, marginTop: 10, position: 'relative', left: 21, fontSize: 30, textAlign: "center", color: 'grey' }} />
                  <input placeholder="Tenant" value={this.state.Tenant} onChange={(event) => { this.setState({ Tenant: event.target.value }) }} style={{ outline: 0, borderTop: 0, borderLeft: 0, borderRight: 0, height: 60, borderWidth: 1, borderColor: 'red', backgroundColor: 'rgba(0, 0, 0, 0)', width: 150, marginTop: 10, position: 'relative', left: 21, fontSize: 30, textAlign: "center", color: 'grey' }} />
                  <input placeholder="Secret" value={this.state.Secret} onChange={(event) => { this.setState({ Secret: event.target.value }) }} style={{ outline: 0, borderTop: 0, borderLeft: 0, borderRight: 0, height: 60, borderWidth: 1, borderColor: 'red', backgroundColor: 'rgba(0, 0, 0, 0)', width: 150, marginTop: 10, position: 'relative', left: 21, fontSize: 30, textAlign: "center", color: 'grey' }} />
                  <input placeholder="PIN" value={this.state.PIN} onChange={(event) => { this.setState({ PIN: event.target.value }) }} maxLength='4' style={{ outline: 0, borderTop: 0, borderLeft: 0, borderRight: 0, height: 60, borderWidth: 1, borderColor: 'red', backgroundColor: 'rgba(0, 0, 0, 0)', width: 150, marginTop: 10, position: 'relative', left: 21, fontSize: 30, textAlign: "center", color: 'grey' }} />

                </div>
                <a className="botao" draggable='false' href='click' onClick={this.verificar}>
                  <img className="btn" draggable="false" width={60} src={require('../Assets/images/login.png')} style={{ position: "relative", opacity: 1, marginLeft: 0, top: 40, left: 68, marginRight: -10 }} />
                </a>
              </div>
            </StyleRoot>
            <a href='voltar' style={{ position: 'relative', top: 17, left: 820 }} onClick={this.navigate}>
              <p>voltar</p>
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
                  <p style={{ color: 'white', marginLeft: 11, position: 'relative', top: 10, fontFamily: 'Roboto, sans-serif' }}>PIN Já existe</p>
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



export default Cadastro;
