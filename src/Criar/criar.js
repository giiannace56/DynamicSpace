import React, { Component } from "react";
import './criar.css';
import Navbar from '../Assets/navbar'
import { slideInRight, slideInLeft, slideInUp, zoomInDown } from 'react-animations'
import Radium, { StyleRoot } from 'radium';
import basic from '../Assets/VirtualMachine/UbuntuVM.json'
var qs = require('qs');
var assert = require('assert');
const styles = {
    slideInRight: {
        animation: 'x 1s',
        animationName: Radium.keyframes(slideInRight, 'slideInRight')
    },
    zoomInDown: {
        animation: 'x 1s',
        animationName: Radium.keyframes(zoomInDown, 'zoomInDown')
    },
    slideInUp: {
        animation: 'x 0.8s',
        animationName: Radium.keyframes(slideInUp, 'slideInUp')
    }

}

class Criar extends Component {

    constructor() {
        super();
        this.state = {
            resource: basic,
            tamanhoVM: 'asd',
            resourceGroup: 'GrupoTeste',
            region: 'asd',
            enviando: 0,
            name: 'Teste',
            status: '',
            gruposCriados: [],
            tamanhoResposta: '',
            possuiRepeticao: false
        }
    }

    select = () => {
        this.setState({ enviando: true })
        this.setState({ status: '' })
        this.state.resource.properties.template.resources[0].properties.ipConfigurations[0].properties.subnet.id = "/subscriptions/d1087c32-2f35-425e-8376-e824688e5d8b/resourceGroups/" + this.state.resourceGroup + "/providers/Microsoft.Network/virtualNetworks/VNetTeste01/subnets/SubNetTest01"
        this.state.resource.properties.template.resources[0].properties.ipConfigurations[0].properties.publicIPAddress.id = "/subscriptions/d1087c32-2f35-425e-8376-e824688e5d8b/resourceGroups/" + this.state.resourceGroup + "/providers/Microsoft.Network/publicIPAddresses/IPublic01"
        this.state.resource.properties.template.resources[3].properties.networkProfile.virtualNetworks[0].id = "/subscriptions/d1087c32-2f35-425e-8376-e824688e5d8b/resourceGroups/" + this.state.resourceGroup + "/providers/Microsoft.Network/virtualNetworks/VNetTeste01"
        this.state.resource.properties.template.resources[3].properties.networkProfile.networkInterfaces[0].id = "/subscriptions/d1087c32-2f35-425e-8376-e824688e5d8b/resourceGroups/" + this.state.resourceGroup + "/providers/Microsoft.Network/networkInterfaces/IFaceTeste01"
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
                tipoRecurso: 'VirtualMachine',
                recursoOnline: 'false'
            })
        })
            .then(response => {
                this.setState({ status: response.status })
                this.setState({ possuiRepeticao: false })
                this.setState({ enviando: false })
                console.warn(this.state.enviando)
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
            <div style={{ height: "100vh", backgroundColor: 'rgba(0, 0, 0, 0.15)' }}>
                <Navbar />
                <div className="backBar">
                    <a href="voltar" onClick={this.navigateVoltar}>
                        <img className="back" height={35} style={{ marginLeft: 5 }} src={require('../Assets/return.png')} />
                    </a>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginTop: 10, marginLeft: 200, marginRight: 200 }}>
                    <input placeholder='Grupo de recurso' value={this.state.resourceGroup} onChange={(event) => { this.setState({ resourceGroup: event.target.value }) }} />
                    <input placeholder='Nome da máquina' value={this.state.name} onChange={(event) => { this.setState({ name: event.target.value }) }} />
                    {/* <select value={this.state.tamanhoVM} onChange={(event) => { this.setState({ tamanhoVM: event.target.value }) }} className='select' name="GB">
                        <option> Selecione o Armazenamento</option>
                        <option value="32Gb">32Gb</option>
                        <option value="64Gb">64Gb</option>
                        <option value="120Gb">120Gb</option>
                    </select>
                    <select value={this.state.region} onChange={(event) => { this.setState({ region: event.target.value }) }} className='select' name="Localizacao">
                        <option value="selecione uma localização" selected> Selecione a Localização</option>
                        <option value="Brasil">Brasil</option>
                        <option value="EUA">Estados Unidos</option>
                        <option value="EU">França</option>
                    </select> */}
                    <br />
                    {this.state.enviando != true
                        ? <button onClick={this.select}>enviar</button>
                        : <button>-------------</button>}
                    <br />
                    {this.state.enviando == true
                        ? <p>Enviando...</p>
                        : <p />}
                    {this.state.status == 200 ?
                        <p>Enviado!</p> :
                        <p></p>}
                </div>
            </div>
        );
    }
}

export default Criar;
