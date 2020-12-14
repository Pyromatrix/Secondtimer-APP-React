import React from 'react';
import SecondTimerNumbers from './SecondTimerNumbers.jsx';
import SecondTimerList from './SecondTimerList.jsx';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


class SecondTimer extends React.Component {
  constructor(props) {
    super(props);

    

    // Start funktio määrittää running arvon -> true, joka kertoo sen, että kello käy. Tallentaa tänne ajan, josta SeconTimerNumber hakee tiedon
    this.state = {
      running: false, // Alustettu falseksi, eli ohjelman avatessa kello ei käy
      currentTimeMs: 0,
      currentTimeSec: 0,
      currentTimeMin: 0,
    };
  }

  

  // Muuttaa kelloajan numeraaliset luvut stringiksi, sekä lisää yhdet nollat lukuun, jotta luvut ei ns. pompi silmillä.
  formatTime = (val, ...rest) => {
    let value = val.toString();
    if (value.length < 2) {
      value = '0' + value;
    }
    if (rest[0] === 'ms' && value.length < 3) {
      value = '0' + value;
    }
    return value;
  };

  // Start napista painalla käynnistää tämän funktion. Muuttaa state running trueksi, eli kello käy. SetInterval on Reactin oma sekuntikello, ja this.pace 10 määrittelee sadasosasekunnit
  start = () => {
    if (!this.state.running) {
      this.setState({ running: true });
      this.watch = setInterval(() => this.pace(), 10);
    }
  };

  // Stop painikkeesta muuttaa running staten falseksi -> kello pysähtyy, sekä tyhjentää sekuntikellon (pysäyttää).
  stop = () => {
    this.setState({ running: false });
    clearInterval(this.watch);
  };

  // Määrittelee kellon toiminnan
  pace = () => {
    this.setState({ currentTimeMs: this.state.currentTimeMs + 10 }); // Lisää 10ms kerrallaan

    // Kun millisekunteja 1000, lisää yhden sekunnin, sekä muuttaa millisekuntien arvoksi 0 kierroksen jälkeen
    if (this.state.currentTimeMs >= 1000) {
      this.setState({ currentTimeSec: this.state.currentTimeSec + 1 });
      this.setState({ currentTimeMs: 0 });
    }

    // Kun sekunteja on 60, lisää yhden minuutin, sekä muuttaa sekuntien arvoksi 0 kierroksen jälkeen
    if (this.state.currentTimeSec >= 60) {
      this.setState({ currentTimeMin: this.state.currentTimeMin + 1 });
      this.setState({ currentTimeSec: 0 });
    }
  };

  // Määrittää (resetoi) staten allaolevat arvot nollaksi, jolloin sekuntikello voidaan taas aloittaa alusta
  resetTime = () => {
    this.setState({
      currentTimeMs: 0,
      currentTimeSec: 0,
      currentTimeMin: 0,
    });
  };



  // UserInterface eli käyttöliittymä renderöityy tässä
  render() {
    return (
      <div className={'main-div'}>
        <div className={'left'}>
          {this.state.running === false && (
            <Button className={"start-stop-reset-nappi"} variant="success" size="lg" onClick={this.start}>START</Button>
          )}
          {this.state.running === true && (
            <Button className={'start-stop-reset-nappi'} variant="warning" size="lg" onClick={this.stop}>PAUSE</Button>
          )}
          <Button className={'start-stop-reset-nappi'} variant="danger" size="lg" onClick={this.resetTime}>RESET</Button>



          <div className={'tulostaulu-main'}>
          <SecondTimerNumbers
            ref="display"
            {...this.state}
            formatTime={this.formatTime}
          />
          </div>
            
        </div>
        
        <div className={'right'}>
          <SecondTimerList clickResetTime={this.resetTime}  {...this.state} formatTime={this.formatTime} />
        </div>

      </div>
    );// Yllä oleva ClickResetTime funktio on tämän sivut resetTime funktio.
    // Tällä saan kutsuttua funktiota toisesta componentista, tavallaan "injektoin" funktion tähän componenttiin.
  }
}

export default SecondTimer;
