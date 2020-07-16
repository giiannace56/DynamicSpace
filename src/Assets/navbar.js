import React, { Component } from 'react'
const { remote } = window.require('electron');

class Navbar extends Component {

    constructor() {
        super();
    }

    close = () => {
        var win = remote.BrowserWindow.getFocusedWindow();
        win.close()
    }

    render() {
        return (
            <div style={{ height: 25, overflowX: 'hidden' }}>
                <div style={{ position: 'fixed', zIndex: 100 }}>
                    <img height={17} style={{ zIndex: 110, position: "fixed", top: 4, left: 7 }} src={require('../Assets/images/universum.png')} />
                    <p style={{ position: 'fixed', color: 'white', zIndex: 200, color: 'rgba(80, 80, 80, 1)', fontSize: 13, fontFamily: 'Roboto', left: 34, top: 5 }}>UNIVERSUM</p>
                    <div class="bar" style={{ display: 'flex', height: 25, marginTop: 0, position: "relative", width: 900, backgroundColor: "rgba(30, 30, 30, 1)", zIndex: 100 }} />
                    <div style={{ display: 'flex', height: 25, marginTop: 0, justifyContent: 'space-between', position: "absolute", width: 124, top: 0, left: 900, backgroundColor: "rgba(30, 30, 30, 1)", zIndex: 20 }} >
                        <div style={{ zIndex: 20 }} />
                        <a draggable='false' onClick={this.close} href='close'>
                            <img draggable='false' width={14} height={14} style={{ marginRight: 10, marginTop: 5 }} src={require('../Assets/images/close.png')} />
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Navbar
