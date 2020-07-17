import React, { Component } from "react";
import './listar.css';
import Navbar from '../Assets/navbar'
import { slideInLeft, slideInDown, slideInRight, shake, flipInX } from 'react-animations'
import Radium, { StyleRoot } from 'radium';
let audioRemove = new Audio(require('../Assets/Audio/remove.mp3'))
let audioCheck = new Audio(require('../Assets/Audio/check.mp3'))
const styles = {
    slideInLeft: {
        animation: 'x 0.5s',
        animationName: Radium.keyframes(slideInLeft, 'slideInLeft')
    },
    slideInDown: {
        animation: 'x 0.2s',
        animationName: Radium.keyframes(slideInDown, 'slideInDown')
    },
    notification: {
        animation: 'x 1s',
        animationName: Radium.keyframes(shake, 'shake')
    },
    slideInRight: {
        animation: 'x 0.2s',
        animationName: Radium.keyframes(slideInRight, 'slideInRight')
    },
    flipInX: {
        animation: 'x 0.4s',
        animationName: Radium.keyframes(flipInX, 'flipInX')
    }
}

class Listar extends Component {

    constructor() {
        super();
        this.state = {
            lista: [],
            data: [],
            universumLoading: false,
            deleteLoading: false,
            deletado: '',
            resourceGroups: [],
            deploy: [],
            tutorial: 0,
            enviando: false
        }
    }

    navigateVoltar = (event) => {
        event.preventDefault()
        this.props.history.push('/home')
    }

    deleteGroup = (element) => {
        this.setState({ enviando: true })
        sessionStorage.removeItem(element.grupoDeRecursos)
        this.setState({ grupoDeletado: element.id })
        fetch('https://management.azure.com/subscriptions/' + sessionStorage.getItem('Subscription') + '/resourcegroups/' + element.grupoDeRecursos + '?api-version=2019-10-01', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        })
        fetch('https://dynamicspace.dev.objects.universum.blue/vnext/' + element.grupoDeRecursos, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        fetch('https://dynamicspace.dev.objects.universum.blue/resourcegroups/' + element.id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            audioRemove.play()
            this.setState({ enviando: false })
            this.componentDidMount()
            this.componentDidMount()
        })

    }

    select = (element) => {
        this.componentDidMount(element.grupoDeRecursos)
        sessionStorage.setItem(element.grupoDeRecursos, element.grupoOnline)
        console.warn(this.state.data)
    }

    reload = () => {
        this.componentDidMount()
    }

    async componentDidMount(element) {
        this.setState({ enviando: true })
        console.warn(this.state.resourceGroups)
        this.setState({ recursoCriado: element })
        this.setState({ recursoCriado: '' })
        this.setState({ universumLoading: true })
        await fetch('https://dynamicspace.dev.objects.universum.blue/' + element, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resposta => resposta.json())
            .then(response => {
                this.setState({ lista: [] })
                this.setState({ data: response })
                this.state.data.forEach(element => {
                    this.state.lista.push(JSON.parse(element.template))
                });
                this.setState({ lista: this.state.lista })
                this.setState({ universumLoading: false })
            })
        await fetch('https://dynamicspace.dev.objects.universum.blue/resourcegroups/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resposta => resposta.json())
            .then(response => {
                this.setState({ resourceGroups: response })
            })
        this.setState({ enviando: false })
    }

    deployGroup(element) {
        this.setState({ enviando: true })
        fetch('https://dynamicspace.dev.objects.universum.blue/resourcegroups/' + element.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                grupoOnline: 'true'
            })
        })
        fetch('https://management.azure.com/subscriptions/' + sessionStorage.getItem('Subscription') + '/resourcegroups/' + element.grupoDeRecursos + '?api-version=2019-10-01', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            body: JSON.stringify({
                location: 'eastus'
            })
        })
            .then(() => {
                sessionStorage.setItem(element.grupoDeRecursos + 'IsOff', 'false')
                sessionStorage.setItem(element.grupoDeRecursos, true)
                this.setState({ enviando: false })
                audioCheck.play()
                this.componentDidMount(element.grupoDeRecursos)
                this.componentDidMount(element.grupoDeRecursos)
            })
    }

    deactivateGroup(element) {
        this.setState({ enviando: true })
        fetch('https://management.azure.com/subscriptions/' + sessionStorage.getItem('Subscription') + '/resourcegroups/' + element.grupoDeRecursos + '?api-version=2019-10-01', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        })
        fetch('https://dynamicspace.dev.objects.universum.blue/resourcegroups/' + element.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                grupoOnline: 'false'
            })
        }).then(() => {
            sessionStorage.setItem(element.grupoDeRecursos + 'IsOff', 'true')
            this.componentDidMount()
            this.componentDidMount()
        })
    }

    deployResource(element) {
        switch (element.tipoRecurso) {
            case 'VirtualMachine':
                this.setState({ enviando: true })
                fetch('https://dynamicspace.dev.objects.universum.blue/' + element._pk + '/' + element.id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        recursoOnline: 'true'
                    })
                })
                fetch('https://management.azure.com/subscriptions/' + sessionStorage.getItem('Subscription') + '/resourcegroups/' + element._pk + '/providers/Microsoft.Resources/deployments/' + element.nomeRecurso + '?api-version=2019-10-01', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                    },
                    body: JSON.stringify(JSON.parse(element.template))
                }).then(() => {
                    audioCheck.play()
                    this.setState({ enviando: false })
                    this.componentDidMount()
                })
                break;
            case 'WebApp':
                this.setState({ enviando: true })
                fetch('https://dynamicspace.dev.objects.universum.blue/' + element._pk + '/' + element.id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        recursoOnline: 'true'
                    })
                })
                fetch('https://management.azure.com/subscriptions/' + sessionStorage.getItem('Subscription') + '/resourcegroups/' + element._pk + '/providers/Microsoft.Resources/deployments/WApp' + element.nomeRecurso + '?api-version=2019-10-01', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                    },
                    body: JSON.stringify(JSON.parse(element.template))
                }).then(() => {
                    audioCheck.play()
                    this.setState({ enviando: false })
                    this.componentDidMount()
                })
                break;
            case 'CosmoDB':
                this.setState({ enviando: true })
                fetch('https://dynamicspace.dev.objects.universum.blue/' + element._pk + '/' + element.id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        recursoOnline: 'true'
                    })
                })
                fetch('https://management.azure.com/subscriptions/' + sessionStorage.getItem('Subscription') + '/resourcegroups/' + element._pk + '/providers/Microsoft.DocumentDB/databaseAccounts/' + element.nomeRecurso + '?api-version=2020-04-01', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                    },
                    body: JSON.stringify(JSON.parse(element.template))
                }).then(() => {
                    audioCheck.play()
                    this.setState({ enviando: false })
                    this.componentDidMount()
                })
                break;
            case 'StorageAccount':
                this.setState({ enviando: true })
                fetch('https://dynamicspace.dev.objects.universum.blue/' + element._pk + '/' + element.id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        recursoOnline: 'true'
                    })
                })
                fetch('https://management.azure.com/subscriptions/' + sessionStorage.getItem('Subscription') + '/resourcegroups/' + element._pk + '/providers/Microsoft.Resources/deployments/' + element.nomeRecurso + '?api-version=2019-10-01', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                    },
                    body: JSON.stringify(JSON.parse(element.template))
                }).then(() => {
                    audioCheck.play()
                    this.setState({ enviando: false })
                    this.componentDidMount()
                })
                break;
            default:
                break;
        }

    }



    render() {
        return (
            <div className="fundoDelete">
                <Navbar />
                <div className="barFixed">
                    <div className="backBar">
                        <a href="voltar" onClick={this.navigateVoltar}>
                            <img draggable="false" className="back" height={35} src={require('../Assets/images/return.png')} />
                        </a>
                        <StyleRoot>
                            <div style={styles.flipInX}>
                                <p className="titleBarList">Deploy de recursos</p>
                            </div>
                        </StyleRoot>
                        <a onClick={this.reload}>
                            <img draggable="false" className="refresh" height={35} src={require('../Assets/images/refresh.png')} />
                        </a>
                    </div>
                </div>
                <img width={550} style={{ position: 'fixed', zIndex: 0, top: 135, left: 474 }} src={require('../Assets/images/rocket.png')} />
                <div className="EnviandoStatusList">
                    {this.state.enviando == true ?
                        <div class="spinner">
                            <div class="bounce1"></div>
                            <div class="bounce2"></div>
                            <div class="bounce3"></div>
                        </div>
                        : <p />}
                </div>
                <section style={{ overflowX: 'hidden' }}>
                    <div className="spacing" />
                    <StyleRoot>
                        <div style={styles.slideInDown} className="titleList">
                            <img draggable="false" className="imgGrp" height={60} src={require('../Assets/images/group.png')} />
                            <img draggable="false" className="imgGrp" height={60} src={require('../Assets/images/single.png')} />
                        </div>
                    </StyleRoot>
                    <div className="mainView" >
                        <div className="resourcegroupList">
                            {this.state.resourceGroups == '' ?
                                <StyleRoot>
                                    <img draggable="false" style={styles.notification} height={100} className="backgroundLoading" src={require('../Assets/images/loading.png')} />
                                </StyleRoot>
                                : <div />
                            }
                            {this.state.resourceGroups.map((element) => {
                                if (element.id != this.state.grupoDeletado) {
                                    return (
                                        <StyleRoot>
                                            <div style={styles.slideInLeft} className="listagemCard">
                                                <div onClick={() => this.select(element)} className="listagemText">
                                                    <p className="tag">Grupo:</p>
                                                    <p className="info">{element.grupoDeRecursos}</p>
                                                </div>
                                                <div className="btns">
                                                    {element.grupoOnline != 'true' || sessionStorage.getItem(element.grupoDeRecursos) == ''
                                                        ?
                                                        <img onClick={() => this.deployGroup(element)} className="deleteButton" draggable='false' width={25} src={require('../Assets/images/create.png')} />
                                                        :
                                                        <img onClick={() => this.deactivateGroup(element)} className="deactivate" draggable='false' width={25} src={require('../Assets/images/correct.png')} />
                                                    }
                                                    <img onClick={() => this.deleteGroup(element)} className="deleteButton" draggable='false' width={25} src={require('../Assets/images/remove.png')} />
                                                </div>
                                            </div>
                                        </StyleRoot>
                                    )
                                }
                                else {
                                    return (
                                        <StyleRoot>

                                            <div style={styles.slideInLeft} className="listagemCardDeletadoGrupo">
                                                <div className="listagemText">
                                                    <p className="tag">Grupo:</p>
                                                    <p className="info">{element.grupoDeRecursos}</p>
                                                </div>
                                            </div>
                                        </StyleRoot>
                                    )
                                }
                            })}
                        </div>
                        <div className="resourceList">
                            {this.state.data.map((element) => {
                                if (element.id != this.state.deletado) {
                                    return (
                                        <StyleRoot>
                                            <div style={styles.slideInRight} className="listagemCard2">
                                                <div className="listagemText2">
                                                    <p className="tag">Recurso:</p>
                                                    <p className="info">{element.nomeRecurso}</p>
                                                </div>
                                                <div className="statusText">
                                                    {element.recursoOnline == 'true' && sessionStorage.getItem(element._pk + 'IsOff') == 'false' || sessionStorage.getItem(element._pk + 'IsOff') == '' ?
                                                        <p className="online">OK!</p>
                                                        :
                                                        <p className="offline"></p>
                                                    }
                                                </div>
                                                <div className='tipoRecursoList'>
                                                    <p>{element.tipoRecurso}</p>
                                                </div>
                                                <div className="btns">
                                                    {sessionStorage.getItem(element._pk) == 'true' ?
                                                        <img onClick={() => this.deployResource(element)} className="deleteButton" draggable='false' width={25} src={require('../Assets/images/right-arrow.png')} />
                                                        : <img className="deleteButtonOff" draggable='false' width={25} src={require('../Assets/images/question.png')} />
                                                    }
                                                </div>
                                            </div>
                                        </StyleRoot>
                                    )
                                }

                                else {
                                    return (
                                        <StyleRoot>
                                            <div style={styles.slideInRight} className="listagemCardDeletado">
                                                <div className="listagemText">
                                                    <p className="tag">Recurso:</p>
                                                    <p className="info">{element.nomeRecurso}</p>
                                                </div>
                                            </div>
                                        </StyleRoot>
                                    )
                                }
                            })}
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Listar;
