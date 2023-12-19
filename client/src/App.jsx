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
      <MyFooter />
    </>
  );
}

export default App;
