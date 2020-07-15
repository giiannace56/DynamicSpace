import React, { Component } from "react";
import './criarApp.css';
import Navbar from '../Assets/navbar'
import { slideInRight, slideInLeft, slideInUp, zoomInDown, slideInDown, flipInX } from 'react-animations'
import Radium, { StyleRoot } from 'radium';
import basic from '../Assets/WebApp/AppService.json'
import Select from 'react-select'
var qs = require('qs');
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
        animation: 'x 1s',
        animationName: Radium.keyframes(flipInX, 'flipInX')
    }

}

class Criar extends Component {

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
        this.setState({ enviando: true })
        this.setState({ status: '' })
        this.state.resource.properties.template.resources[0].name = "WApp" + this.state.name
        this.state.resource.properties.template.resources[0].properties.serverFarmId = "/subscriptions/" + sessionStorage.getItem('Subscription') + "/resourcegroups/" + this.state.resourceGroup + "/providers/Microsoft.Web/serverfarms/SFarm" + this.state.name
        this.state.resource.properties.template.resources[0].dependsOn[0] = "Microsoft.Web/serverfarms/SFarm" + this.state.name
        this.state.resource.properties.template.resources[0].properties.name = "WApp" + this.state.name
        this.state.resource.properties.template.resources[1].name = "SFarm" + this.state.name
        this.state.resource.properties.template.resources[1].properties.name = "SFarm" + this.state.name
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
                tipoRecurso: 'WebApp',
                recursoOnline: 'false'
            })
        })
            .then(response => {
                this.setState({ status: response.status })
                this.setState({ possuiRepeticao: false })
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

    mostrarWin = () => {
        if (this.state.mostrarWin == 0) {
            this.setState({ mostrarWin: 1 })
        } else {
            this.setState({ mostrarWin: 0 })
        }
    }

    mostrarLin = () => {
        if (this.state.mostrarLin == 0) {
            this.setState({ mostrarLin: 1 })
        } else {
            this.setState({ mostrarLin: 0 })
        }
    }


    render() {
        return (
            <div className="backgroundRocket">
                <Navbar />
                <div className="backBar">
                    <a href="voltar" onClick={this.navigateVoltar}>
                        <img className="back" height={35} style={{ marginLeft: 10 }} src={require('../Assets/images/return.png')} />
                    </a>
                    <p className="titleBarList" style={{ marginRight: 50 }}>Criar Web App</p>
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
                    </div>
                </StyleRoot>
                <StyleRoot>
                    <div style={styles.slideInLeft} className="criarBoxApp" >
                        <div className="criarInputsApp">
                            <input className="inputVM" placeholder='Grupo de recurso' value={this.state.resourceGroup} onChange={(event) => { this.setState({ resourceGroup: event.target.value }) }} />
                            <input className="inputVM" placeholder='Nome do Web App' value={this.state.name} onChange={(event) => { this.setState({ name: event.target.value }) }} />
                            <br />
                            {this.state.enviando != true
                                ? <button className="buttonVM" onClick={this.select}>Criar</button>
                                : <button className="buttonVM">Enviando</button>}
                            <button className="buttonVMConfig" onClick={this.mostrarWin}>Mostrar configuração</button>
                        </div>
                    </div>
                </StyleRoot>
            </div>
        );
    }
}

export default Criar;
