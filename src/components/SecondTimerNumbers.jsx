import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

class SecondTimerNumbers extends React.Component {

// Hyvin yksinkertainen komponentti, joka renderöi ainoastaan spaniin Secondtimer sivulla stateen tallentuvat ajat

  render() {
    return (
      <div className={'stopwatch__display'}>
        <span>
          {this.props.formatTime(this.props.currentTimeMin)}:
          {this.props.formatTime(this.props.currentTimeSec)}:
          {this.props.formatTime(this.props.currentTimeMs)}
        </span>
      </div>
    );
  }
}


export default SecondTimerNumbers;
