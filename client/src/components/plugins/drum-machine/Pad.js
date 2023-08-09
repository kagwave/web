import React from 'react';
//import reactDom from 'react-dom';

const inactiveStyle = {
  backgroundColor: '#EEE4DB',
  boxShadow: '3px 3px 5px gray'
};

const activeStyle = {
  backgroundColor: 'orange',
  boxShadow: 'none',
};

class Pad extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      padStyle: inactiveStyle
    };
    this.activatePad = this.activatePad.bind(this);
    this.playSound = this.playSound.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  activatePad() {
    if (this.props.power === true) {
      if (this.state.padStyle.backgroundColor === 'orange') {
        this.setState({
          padStyle: inactiveStyle
        });
      } else {
        this.setState({
          padStyle: activeStyle
        });
      }
    }
  }

  playSound() {
    const sound = document.getElementById(this.props.keyTrigger);
    sound.currentTime = 0;
    if (this.props.power === true){
      sound.play();
      this.activatePad();
      setTimeout(() => this.activatePad(), 100);
      this.props.updateDisplay(this.props.clipId.replace(/-/g, ' '));
    }
  }
  
  render(){
    return(
      <div className="pad"
      onClick = {this.playSound} 
      style={this.state.padStyle}
      id={this.props.clipId}>
        <audio
          className='clip'
          id={this.props.keyTrigger}
          src={this.props.clip}
        />
      </div>
    );
  }
}

export default Pad;