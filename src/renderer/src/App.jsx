import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import Navigation from "./components/Navigation";
import SignIn from "./components/SignIn";

function App() {

  return (
    <>
    <nav className=" " />
    <div className="flex">
    <Navigation />
    <div className=" ml-24 w-screen ">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/signIn" element={<SignIn />}/>
      </Routes>
      </div>
    </div>
    </>
  )
}

export default App
