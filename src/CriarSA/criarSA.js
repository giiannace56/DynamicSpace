import React, { Component } from "react";
import './criarSA.css';
import Navbar from '../Assets/navbar'
import { slideInRight, slideInLeft, slideInUp, zoomInDown, slideInDown, flipInX } from 'react-animations'
import Radium, { StyleRoot } from 'radium';
import basic from '../Assets/StorageAccount/storageaccount.json'
import Select from 'react-select'
var qs = require('qs');
let audioSent = new Audio(require('../Assets/Audio/sent.mp3'))
var assert = require('assert');
const styles = {
    slideInRight: {
        animation: 'x 1s',
        animationName: Radium.keyframes(slideInRight, 'slideInRight')
    },
    zoomInDown: {
        animation: 'x 0.7s',
        animationName: Radium.keyframes(zoomInDown, 'zoomInDown')
    },
    slideInUp: {
        animation: 'x 0.8s',
        animationName: Radium.keyframes(slideInUp, 'slideInUp')
    },
    slideInLeft: {
        animation: 'x 1s',
        animationName: Radium.keyframes(slideInLeft, 'slideInLeft')
    },
    flipInX: {
        animation: 'x 0.4s',
        animationName: Radium.keyframes(flipInX, 'flipInX')
    }

}

class CriarSA extends Component {

    constructor() {
        super();
        this.state = {
            resource: basic,
            tamanhoVM: '',
            resourceGroup: '',
            region: '',
            enviando: 0,
            name: '',
            mostrarWin: 0,
            mostrarLin: 0,
            status: '',
            gruposCriados: [],
            tamanhoResposta: '',
            possuiRepeticao: false
        }
    }

    select = () => {
        if (this.state.name && this.state.resourceGroup !== '') {
            this.setState({ enviando: true })
            this.setState({ status: '' })
            this.state.resource.properties.template.resources[0].name = this.state.name
            fetch('https://dynamicspace.dev.objects.universum.blue/resourcegroups/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(resposta => resposta.json())
                .then(response => {
                    this.setState({ gruposCriados: response })
                    this.setState({ tamanhoResposta: response.length })
                    this.state.gruposCriados.forEach(element => {
                        if (element.grupoDeRecursos == this.state.resourceGroup) {
                            this.setState({ possuiRepeticao: true })
                            this.criarRecurso()
                        }
                    });
                    if (this.state.possuiRepeticao == false) {
                        this.adicionarGrupo()
                        this.criarRecurso()
                    }
                })
        } else {
            this.setState({ status: 'erro' })
        }
    }

    adicionarGrupo = () => {
        fetch('https://dynamicspace.dev.objects.universum.blue/resourcegroups', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                grupoDeRecursos: this.state.resourceGroup,
                grupoOnline: false
            })
        })
    }

    criarRecurso = () => {
        fetch('https://dynamicspace.dev.objects.universum.blue/' + this.state.resourceGroup, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                template: JSON.stringify(this.state.resource),
                nomeRecurso: this.state.name,
                tipoRecurso: 'StorageAccount',
                recursoOnline: 'false'
            })
        })
            .then(response => {
                this.setState({ status: response.status })
                console.warn(response)
                this.setState({ possuiRepeticao: false })
                audioSent.play()
                this.setState({ enviando: false })
                // this.setState({ tamanhoVM: '' })
                // this.setState({ region: '' })
                // this.setState({ name: '' })
                // this.setState({ resourceGroup: '' })
            })
    }

    componentDidMount = () => {

    }

    navigateVoltar = (event) => {
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
                        <div style={styles.flipInX}>
                            <p className="titleBarList" style={{ marginRight: 50 }}>Criar Storage Account</p>
                        </div>
                    </StyleRoot>
                    <div>

                    </div>
                    <div className="sendStatus">
                        {this.state.enviando == true ?
                            <div class="spinner">
                                <div class="bounce1"></div>
                                <div class="bounce2"></div>
                                <div class="bounce3"></div>
                            </div>
                            : <p />}
                    </div>
                </div>
                <StyleRoot>
                    <div className="sentStatus">
                        {this.state.status == 200 ?
                            <p style={styles.slideInRight}>Enviado!</p> :
                            <p></p>}
                        {this.state.status == 'erro' ?
                            <p style={styles.slideInRight}>Vazio</p> :
                            <p></p>}
                    </div>
                </StyleRoot>
                <StyleRoot>
                    <div style={styles.slideInLeft} className="criarBoxApp" >
                        <div className="criarInputsApp">
                            <input className="inputVM" placeholder='Grupo de recurso' value={this.state.resourceGroup} onChange={(event) => { this.setState({ resourceGroup: event.target.value }) }} />
                            <input className="inputVM" placeholder='Nome da Storage Account' value={this.state.name} onChange={(event) => { this.setState({ name: event.target.value }) }} />
                            <br />
                            {this.state.enviando != true
                                ? <button className="buttonVM" onClick={this.select}>Criar</button>
                                : <button className="buttonVM">Enviando</button>}
                            <button className="buttonVMConfig" onClick={this.mostrarWin}>N/A</button>
                        </div>
                        <div>
                            <img style={{ marginLeft: 120, marginTop: 11 }} height={170} src={require('../Assets/images/idk.png')} />
                        </div>
                    </div>
                </StyleRoot>
            </div>
        );
    }
}

export default CriarSA;
