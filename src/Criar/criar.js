import React, { Component } from "react";
import './criar.css';
import Navbar from '../Assets/navbar'
import { slideInRight, slideInLeft, slideInUp, zoomInDown, slideInDown, flipInX } from 'react-animations'
import Radium, { StyleRoot } from 'radium';
import basic from '../Assets/VirtualMachine/UbuntuVM.json'
import basicWin from '../Assets/VirtualMachine/WindowsVM.json'
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

class Criar extends Component {

    constructor() {
        super();
        this.state = {
            resource: basic,
            resourceWin: basicWin,
            tamanhoVM: 'Standard_A2_v2',
            resourceGroup: '',
            region: '',
            enviando: 0,
            name: '',
            nameWin: '',
            mostrarWin: 0,
            mostrarLin: 0,
            status: '',
            gruposCriados: [],
            tamanhoResposta: '',
            possuiRepeticao: false,
            tamanhoVMWin: 'Standard_A2_v2',
            resourceGroupWin: ''
        }
    }

    select = () => {
        console.warn(this.state.resourceGroup)
        if (this.state.name && this.state.resourceGroup !== '') {
            this.setState({ enviando: true })
            this.setState({ status: '' })
            this.state.resource.properties.template.resources[0].properties.ipConfigurations[0].properties.subnet.id = "/subscriptions/" + sessionStorage.getItem('Subscription') + "/resourceGroups/" + this.state.resourceGroup + "/providers/Microsoft.Network/virtualNetworks/VNet" + this.state.name + "/subnets/SubNet" + this.state.name
            this.state.resource.properties.template.resources[0].name = "IFace" + this.state.name
            this.state.resource.properties.template.resources[0].dependsOn[0] = "Microsoft.Network/virtualnetworks/VNet" + this.state.name
            this.state.resource.properties.template.resources[0].properties.ipConfigurations[0].properties.publicIPAddress.id = "/subscriptions/" + sessionStorage.getItem('Subscription') + "/resourceGroups/" + this.state.resourceGroup + "/providers/Microsoft.Network/publicIPAddresses/I" + this.state.name
            this.state.resource.properties.template.resources[1].name = "VNet" + this.state.name
            this.state.resource.properties.template.resources[1].properties.subnets[0].name = "SubNet" + this.state.name
            this.state.resource.properties.template.resources[2].name = "I" + this.state.name
            this.state.resource.properties.template.resources[3].name = "VMubuntu" + this.state.name
            this.state.resource.properties.template.resources[3].properties.osProfile.computerName = "VMubuntu" + this.state.name
            this.state.resource.properties.template.resources[3].properties.hardwareProfile.vmSize = this.state.tamanhoVM
            this.state.resource.properties.template.resources[3].properties.networkProfile.virtualNetworks[0].id = "/subscriptions/" + sessionStorage.getItem('Subscription') + "/resourceGroups/" + this.state.resourceGroup + "/providers/Microsoft.Network/virtualNetworks/VNet" + this.state.name
            this.state.resource.properties.template.resources[3].properties.networkProfile.networkInterfaces[0].id = "/subscriptions/" + sessionStorage.getItem('Subscription') + "/resourceGroups/" + this.state.resourceGroup + "/providers/Microsoft.Network/networkInterfaces/IFace" + this.state.name
            this.state.resource.properties.template.resources[3].properties.storageProfile.osDisk.name = "ubuntudisk" + this.state.name
            this.state.resource.properties.template.resources[3].dependsOn[0] = "Microsoft.Network/virtualnetworks/VNet" + this.state.name
            this.state.resource.properties.template.resources[3].dependsOn[1] = "Microsoft.Network/networkInterfaces/IFace" + this.state.name
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

    selectWin = () => {
        if (this.state.nameWin && this.state.resourceGroupWin !== '') {
            this.setState({ enviando: true })
            this.setState({ status: '' })
            this.state.resourceWin.properties.template.resources[0].properties.ipConfigurations[0].properties.subnet.id = "/subscriptions/" + sessionStorage.getItem('Subscription') + "/resourceGroups/" + this.state.resourceGroupWin + "/providers/Microsoft.Network/virtualNetworks/VNet" + this.state.nameWin + "/subnets/SubNet" + this.state.nameWin
            this.state.resourceWin.properties.template.resources[0].name = "IFace" + this.state.nameWin
            this.state.resourceWin.properties.template.resources[0].dependsOn[0] = "Microsoft.Network/virtualnetworks/VNet" + this.state.nameWin
            this.state.resourceWin.properties.template.resources[0].properties.ipConfigurations[0].properties.publicIPAddress.id = "/subscriptions/" + sessionStorage.getItem('Subscription') + "/resourceGroups/" + this.state.resourceGroupWin + "/providers/Microsoft.Network/publicIPAddresses/I" + this.state.nameWin
            this.state.resourceWin.properties.template.resources[1].name = "VNet" + this.state.nameWin
            this.state.resourceWin.properties.template.resources[1].properties.subnets[0].name = "SubNet" + this.state.nameWin
            this.state.resourceWin.properties.template.resources[2].name = "I" + this.state.nameWin
            this.state.resourceWin.properties.template.resources[3].name = "VM" + this.state.nameWin
            this.state.resourceWin.properties.template.resources[3].properties.osProfile.computerName = "VM" + this.state.nameWin
            this.state.resourceWin.properties.template.resources[3].properties.networkProfile.virtualNetworks[0].id = "/subscriptions/" + sessionStorage.getItem('Subscription') + "/resourceGroups/" + this.state.resourceGroupWin + "/providers/Microsoft.Network/virtualNetworks/VNet" + this.state.nameWin
            this.state.resourceWin.properties.template.resources[3].properties.networkProfile.networkInterfaces[0].id = "/subscriptions/" + sessionStorage.getItem('Subscription') + "/resourceGroups/" + this.state.resourceGroupWin + "/providers/Microsoft.Network/networkInterfaces/IFace" + this.state.nameWin
            this.state.resourceWin.properties.template.resources[3].properties.storageProfile.osDisk.name = "windowsdisk" + this.state.nameWin
            this.state.resourceWin.properties.template.resources[3].properties.hardwareProfile.vmSize = this.state.tamanhoVM
            this.state.resourceWin.properties.template.resources[3].dependsOn[0] = "Microsoft.Network/virtualnetworks/VNet" + this.state.nameWin
            this.state.resourceWin.properties.template.resources[3].dependsOn[1] = "Microsoft.Network/networkInterfaces/IFace" + this.state.nameWin
            this.state.resourceWin.properties.template.resources[3].properties.networkProfile.networkSucurityGroupName.value = this.state.nameWin
            this.state.resourceWin.properties.template.resources[3].dependsOn[1] = "Microsoft.Network/networkInterfaces/IFace" + this.state.nameWin
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
                            this.criarRecursoWin()
                        }
                    });
                    if (this.state.possuiRepeticao == false) {
                        this.adicionarGrupoWin()
                        this.criarRecursoWin()
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

    adicionarGrupoWin = () => {
        fetch('https://dynamicspace.dev.objects.universum.blue/resourcegroups', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                grupoDeRecursos: this.state.resourceGroupWin,
                grupoOnline: false
            })
        })
    }


    navigateNext = (event) => {
        event.preventDefault()
        this.props.history.push('/criarapp')
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
                audioSent.play()
                this.setState({ enviando: false })
                // this.setState({ tamanhoVM: '' })
                // this.setState({ region: '' })
                // this.setState({ name: '' })
                // this.setState({ resourceGroup: '' })
            })
    }

    criarRecursoWin = () => {
        fetch('https://dynamicspace.dev.objects.universum.blue/' + this.state.resourceGroupWin, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                template: JSON.stringify(this.state.resourceWin),
                nomeRecurso: this.state.nameWin,
                tipoRecurso: 'VirtualMachine',
                recursoOnline: 'false'
            })
        })
            .then(response => {
                this.setState({ status: response.status })
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
                    <StyleRoot>
                        <div style={styles.flipInX}>
                            <p className="titleBarList" style={{ marginRight: 50 }}>Máquina Virtual</p>
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
                    <div style={styles.slideInLeft} className="criarBox" >
                        <div className="criarInputs">
                            <select style={{
                                border: "0px solid #090B80", borderRadius: "2px", marginBottom: "8px", width: "350px"
                            }} value={this.state.tamanhoVM} onChange={(event) => { this.setState({ tamanhoVM: event.target.value }) }} className='select' name="GB">
                                <option value="Standard_A2_v2">Econômica</option>
                                <option value="Standard_D2_v3">Intermediária</option>
                                <option value="Standard_D4a_v4">Alto custo</option>
                            </select>
                            <input className="inputVM" placeholder='Grupo de Recursos' value={this.state.resourceGroup} onChange={(event) => { this.setState({ resourceGroup: event.target.value }) }} />
                            <input className="inputVM" placeholder='Nome da máquina' value={this.state.name} onChange={(event) => { this.setState({ name: event.target.value }) }} />
                            <br />
                            {this.state.enviando != true
                                ? <button className="buttonVM" onClick={this.select}>Criar</button>
                                : <button className="buttonVM">Enviando</button>}
                            <button className="buttonVMConfig" onClick={this.mostrarWin}>Mostrar configuração</button>
                        </div>
                        <StyleRoot>
                            {this.state.mostrarWin == 1 ?
                                <div style={styles.flipInX} className="infoBox">
                                    <p>Nome da máquina: {this.state.name}</p>
                                    <p>Região: West US 2</p>
                                    <p>Capacidade da Máquina : {this.state.tamanhoVM}</p>
                                </div>
                                :
                                <img draggable="false" style={{ marginRight: 100, marginTop: 11 }} height={170} src={require('../Assets/images/linux.png')} />
                            }
                        </StyleRoot>
                    </div>
                    <div style={styles.slideInRight} className="criarBox2" >
                        <div className="criarInputs">
                            <select style={{
                                border: "0px solid #090B80", borderRadius: "2px", marginBottom: "8px", width: "350px"
                            }} value={this.state.tamanhoVMWin} onChange={(event) => { this.setState({ tamanhoVMWin: event.target.value }) }} className='select' name="GB">
                                <option value="Standard_A2_v2">Econômica</option>
                                <option value="Standard_D2_v3">Intermediária</option>
                                <option value="Standard_D4a_v4">Alto custo</option>
                            </select>
                            <input className="inputVM" placeholder='Grupo de recurso' value={this.state.resourceGroupWin} onChange={(event) => { this.setState({ resourceGroupWin: event.target.value }) }} />
                            <input className="inputVM" placeholder='Nome da máquina' value={this.state.nameWin} onChange={(event) => { this.setState({ nameWin: event.target.value }) }} />
                            <br />
                            {this.state.enviando != true
                                ? <button className="buttonVM" onClick={this.selectWin}>Criar</button>
                                : <button className="buttonVM">Enviando</button>}
                            <button className="buttonVMConfig" onClick={this.mostrarLin}>Mostrar configuração</button>
                        </div>
                        <StyleRoot>
                            {this.state.mostrarLin == 1 ?
                                <div style={styles.flipInX} className="infoBox">
                                    <p>Nome da máquina: {this.state.nameWin}</p>
                                    <p>Região: West US 2</p>
                                    <p>Capacidade da Máquina : {this.state.tamanhoVM}</p>
                                </div>
                                :
                                <img draggable="false" style={{ marginRight: 100, marginTop: 10 }} height={180} src={require('../Assets/images/windows.png')} />
                            }
                        </StyleRoot>
                    </div>
                </StyleRoot>
                <StyleRoot>
                    <div onClick={this.navigateNext} className="nextIconCriar" style={styles.slideInRight}>
                        <img height={40} src={require('../Assets/images/next.png')} />
                    </div>
                </StyleRoot>
                <StyleRoot>
                    <div style={styles.slideInUp} className="footer">
                        <p>Crie seus recursos</p>
                    </div>
                </StyleRoot>
            </div>
        );
    }
}

export default Criar;
