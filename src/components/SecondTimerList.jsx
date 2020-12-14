import React from 'react';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


class SecondTimerList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [],
      aikoja: false, // Alkuvaiheessa tallennettuja aikoja ei ole
      value: "", // Alustetaan input kentän value arvo, ilman tätä ensimmäinen tulostettu arvo ilman kenttään koskemista on defined. Uncontrolled --> Controlled
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  reset = () => { 
    this.setState({value: ""});
  };


  handleChange(event) {    this.setState({value: event.target.value});  }
  handleSubmit(event) {
    event.preventDefault();
  }

  // Ylläpitää historialistan näkyvillä myös päivityksen jälkeen
  componentDidMount() {
    this.setHistoryState();
  }

  // Tallentaa history stateen localstoragen times avaimesta kaikki tiedot 
  setHistoryState = () => {
    if (localStorage.times) {
      this.setState({ history: localStorage.times.split('|') });
    } else {
      this.setState({ history: [] });
    }
  };


  // Tässä funktiossa tallennetaan Local Storageen kellon taulussa olevat arvot, sekä title inputin value
  saveToLocalStorage = () => {

    let titletieto = `${this.state.value}`; // title input

    // Määrittää LocalStoragen avaimeen times tietoja. Erottelee | merkillä Local Storagessa
    if (localStorage.times) {
      localStorage.times =
        `${titletieto} ${this.props.formatTime(
          this.props.currentTimeMin
        )}:${this.props.formatTime(
          this.props.currentTimeSec
        )}:${this.props.formatTime(this.props.currentTimeMs)}|` +
        localStorage.times;
    } else {
      localStorage.times = `${titletieto} ${this.props.formatTime(
        this.props.currentTimeMin
      )}:${this.props.formatTime(
        this.props.currentTimeSec
      )}:${this.props.formatTime(this.props.currentTimeMs)}|`;
    }
  };

  // Jos LocalStorage on käytössä, suorittaa funktion saveToLocalStorage(), jonka jälkeen suorittaa setHistoryState()
  saveTime = () => {
    if (typeof Storage !== 'undefined') {
      this.saveToLocalStorage();
  
    } else {
      console.error('local storage not supported');
    }
    this.setHistoryState();
  };

  // Poistaa Local Storagesta kohteen "times", eli käytännössä siis tyhjentää koko historian -> Tämän jälkeen suorittaa setHistoryState() funktion
  resetHistory = () => { 
    if (localStorage.times) {
      localStorage.removeItem('times');
      this.noTimesFunction();

    }
    this.setHistoryState();
  };


  // Tässä funktiossa suoritetaan kaksi asiaa, ajan tallennus, sekä input kentän tyhjennys
  tuplahomma = () => {
    this.saveTime();
    this.reset();
    this.props.clickResetTime(); // Funktio ( resetTime() ) SecondTimer componentissa, joka resetoi staten arvot
    this.noTimesFunction();

  }  


  noTimesFunction = () => {

    if (localStorage.times) {
      this.setState({ aikoja: true });
      console.log(`Aikoja on, muutettu state value: true`)
    }else {
      this.setState({ aikoja: false });
      console.log(`Aikoja ei ole, muutettu state value: false`)
    }
  }



  setHistoryState = () => {
    if (localStorage.times) {
      this.setState({ history: localStorage.times.split('|') });
    } else {
      this.setState({ history: [] });
    }
  };




 // Tarkastelee input kenttää ja tallentaa arvoa muuttuvasti state.valueen.
 // Kaksi nappia jotka suorittavat ajan tallennus ja historian tyhjennysfunktiot.
 // Historia lista ajoista. Hakee tiedot state historysta ja printtaa ne listaksi

 // Disabled =  "true" herjaa testissä --> OIKEA TAPA disabled={true}
  render() {
    return (
      
      <div className={'sekuntikello-list'}>
        <div className="container">
          <form id="title-value" onSubmit={this.handleSubmit} 
                disabled={true}>
            <label>
              <Form.Control className={'input-field'} placeholder="Title" type="text" value={this.state.value} onChange={this.handleChange} /></label>
          </form>
        </div>
        
        <div className={'save-reset-napit-div'}>

          <Button className={"save-reset-nappi"} variant="success" size="lg" onClick={this.tuplahomma}>SAVE TIME</Button>
          <Button className={"save-reset-nappi"} variant="danger" size="lg" onClick={this.resetHistory}>RESET HISTORY</Button>
        </div>
        <h3>LAPS</h3>
        <div className={'tulostaulu-main'}>
          <div id={'aikalista'} className={'tulostaulu'}>
            <ul>
              {this.state.aikoja === false && ('No times my friend!')}
              {this.state.aikoja === true && (<div>{this.state.history.map((item, index) => <li key={index}>{item}</li>)}</div>)}
            </ul>
          </div>
        </div>
        
      </div>
    );
  }
}

export default SecondTimerList;