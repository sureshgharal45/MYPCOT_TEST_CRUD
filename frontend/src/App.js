import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginRegister from "./pages/LoginRegister";
import AllUsers from "./pages/AllUsers";
import CreateRecord from "./pages/CreateRecord";
import UpdateRecord from "./pages/UpdateRecord.js";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginRegister />}/>
          <Route path="/users" element={<AllUsers />}/>
          <Route path="/create" element={<CreateRecord />}/>
          <Route path="/update/:id" element={<UpdateRecord />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
