import { Outlet } from "react-router-dom";
import "./App.css";
import "./Components/NavBar";
import NavBar from "./Components/NavBar";
import MyFooter from "./Components/MyFooter";

function App() {
  return (
    <>
      <NavBar />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <a className="App-link" target="_blank" rel="noopener noreference">
        Give 5$
      </a>
      <MyFooter />
    </>
  );
}

export default App;
