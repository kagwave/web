import React from "react";
//import reactDom from "react-dom";
//import onbtn from './style/onthin.png';
//import offbtn from './style/offthin.png'
import './index.scss';
import PadBank from "./PadBank";

 

class DrumApp extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      power: false,
      display: String.fromCharCode(160),
      sliderVal: 0.3
    };
    this.togglePower = this.togglePower.bind(this);
    this.displayClipName = this.displayClipName.bind(this);
    //this.adjustVolume = this.adjustVolume.bind(this);
    //this.powerControl = this.powerControl.bind(this);
  }

  componentDidMount() {
    var powerbtn = document.querySelector('.powerbtn');
    powerbtn.classList.add('power-on');
    this.setState({
      power: true
    });
  }
  
 
  togglePower(){
    this.setState({
      power: !this.state.power,
      display: ''
    });
    var powerbtn = document.querySelector('.powerbtn');
    if (this.state.power === false) {
      this.setState({
        display: 'Welcome'
      });  
      powerbtn.classList.remove('power-off');
      powerbtn.classList.add('power-on');
    } else {
      powerbtn.classList.remove('power-on');
      powerbtn.classList.add('power-off');
    }
    console.log(this.state.power);
  }

  displayClipName(name) {
    if (this.state.power === true) {
      this.setState({
        display: name
      });
    }
  }

  

  render() {
    return (
      <div className="DrumApp">
        <div className="top-header">
          <button className="powerbtn"
             onClick={this.togglePower}
          ></button>
        </div>
        <div className="drum-machine">
          <div className="edges"></div>
          <PadBank 
          power={this.state.power}
          updateDisplay={this.displayClipName}/>
          <div className="mid-seperator"></div>
          <div className="controls-container">

            <div className='display'>{this.state.display}</div>

            <div className='volume-slider'>
              <input
                max='1'
                min='0'
                onChange={this.adjustVolume}
                step='0.01'
                type='range'
                value={this.state.sliderVal}
              />
            </div>

          </div>
          
           <div className="edges"></div>
        </div>
        <div className="bottom-header">
          <div className="plugin-info">Virtual Drum Rack</div><div className="version-info">v1.2</div>
        </div>
      </div>
    );
  }
}

export default DrumApp;
