import { render, screen } from '@testing-library/react';
import SecondTimerList from '../components/SecondTimerList.jsx';
import SecondTimer from '../components/SecondTimer.jsx';

// DOM puu on läjä html elementtejä

test("Notification of empty list", async () => {
  render(<SecondTimerList />); // Renderöi SeconTimerList komponentin ja tarkistaa onko kirjoitusvirheitä

  const isThere = screen.getByText("No times my friend!"); // SecondTimerList componentissa state aikoja alustettu tila on false, joten renderöitäessä tämän kuuluu näkyä

  screen.debug(); // printtaa renderinnin consoliin
});