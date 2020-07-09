import React, { Component } from "react";
import './home.css';
import Navbar from '../Assets/navbar'
import { slideInRight, slideInLeft, slideInUp, zoomInDown } from 'react-animations'
import Radium, { StyleRoot } from 'radium';

var qs = require('qs');
var assert = require('assert');
const styles = {
  slideInRight: {
    animation: 'x 1s',
    animationName: Radium.keyframes(slideInRight, 'slideInRight')
  },
  zoomInDown: {
    animation: 'x 0.5s',
    animationName: Radium.keyframes(zoomInDown, 'zoomInDown')
  },
  slideInUp: {
    animation: 'x 0.8s',
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
    fetch('https://login.microsoftonline.com/b1f9f893-1ebe-45b9-b999-701363893577/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: qs.stringify({
        grant_type: 'client_credentials',
        client_id: 'c8d818b1-1e19-4e7e-991a-1ee0715c5385',
        client_secret: "dfdb9705-5333-4fc6-a7a7-59539a63a880",
        resource: "https://management.azure.com/"
      })
    })
      .then(resposta => resposta.json())
      .then(response => {
        console.warn(response)
        if(response.access_token != undefined){
          localStorage.setItem('token', response.access_token)
          this.setState({ logado: 1 })
        }else{
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
    this.props.history.push('/deletar')
  }

  render() {
    return (
      <div className="backgroundRocket">
        <section>
          <Navbar />
          <div>
            {(this.state.logado == 1)
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
        </section>
        <div style={{overflowX:'hidden'}}>
          <section style={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', fontFamily: 'Roboto, sans-serif', marginTop: 100 }}>
            <StyleRoot className="icon" style={{ marginTop: 100, marginLeft: 200, zIndex: 1 }}>
              <div className='button' style={styles.zoomInDown}>
                <a href="criar" onClick={this.navigateCriar} draggable="false">
                  <img className='imgs' draggable="false" width='200' src={require('../Assets/add.png')} />
                </a>
              </div>
            </StyleRoot>
            <StyleRoot className="icon" style={{ marginTop: 100, marginRight: 200, zIndex: 1 }}>
              <div className='button' style={styles.zoomInDown}>
                <a href="deletar" onClick={this.navigateDeletar} draggable="false">
                  <img draggable="false" width='200' src={require('../Assets/edit.png')} />
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
