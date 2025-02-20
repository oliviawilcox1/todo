import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import ThemeProvider from './theme';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
