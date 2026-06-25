import { BrowserRouter, Routes, Route } from "react-router-dom";
import DataProvider from "./dataContext"
import { Landing, Access, Error, Donation, About, Menu, Contact } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/access" element={<Access />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/donation" element={<Donation />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
