import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SecondTimer from '../components/SecondTimer.jsx';


  // Tämä testii katsoo toimiiko kello
  test("Second timer testing", async () => {
    render(<SecondTimer />); // Rendering SeconTimer komponentin ja tarkistaa onko kirjoitusvirheitä

  const start = screen.getByText("START"); // constantti muuttuja määritellään ominaisuudeksi, joka etsii START sanaa screeniltä. ilman All määritettä etsii ensimmäisen kohteen
  fireEvent.click(start); // Tämä triggeröi painikkeen, jossa START lukee, eli ns. "klikkaa" sitä

  // Funktio, jossa haetaan screeniltä lukua 00:01:00, eli katsotaan eteneekö kello. 2sec timoutilla. 
  // Viive on noin 500msec, joten pidän timeoutin 1s suurempana ettei tule turhaa virhereaktiota liian pienen timeoutin takia
  await waitFor(() => screen.getByText(/00:01:00/i), {
    timeout: 2000
  });

  screen.debug(); // printtaa renderinnin consoliin, ns shortcutti console.log(prettyDOM()). Printtaa domin konsoliin, html "puun"
});


// Tämä testi etsii napin START, painee sitä, odottaa 2s ja sinäaikana haettu 00:01:00 tulee mittariin --> etsitään nappi PAUSE, painetaan sitä
// --> muutetaan inputin value Turhapuroksi --> etsitään teksti (button) SAVE TIME, painetaan sitä ja tarkastetaan löytyykö Turhapuro 00:01:00 historialistasta 
// (löytyykö tätä stringiä, jonka elementti on li, koska historialista on li ja sekuntikello span niin tämä fokusoi sen listaan)
test("Time saved", async () => {
  render(<SecondTimer />);

  const start = screen.getByText("START");
  fireEvent.click(start);

  await waitFor(() => screen.getByText(/00:01:00/i), {
    timeout: 2000
  });

  const pause = screen.getByText("PAUSE");
  fireEvent.click(pause); 

  const title = screen.getByPlaceholderText("Title");
  fireEvent.change(title, { target: { value: 'Turhapuro' } })

  const saveTime = screen.getByText("SAVE TIME"); 
  fireEvent.click(saveTime); 

  screen.getByText(/Turhapuro 00:01:00/i, {selector: 'li'})


  screen.debug(); // printtaa renderinnin consoliin
});