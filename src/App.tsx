import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./routes";
import { PlacesProvider } from "./context/AppProvider";
function App() {
  return (
    <PlacesProvider>
      <Router>
        <AppRouter />
      </Router>
    </PlacesProvider>
  );
}

export default App;
