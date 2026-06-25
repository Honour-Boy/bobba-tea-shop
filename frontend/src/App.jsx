import { BrowserRouter, Routes, Route } from "react-router-dom";
import DataProvider from "./dataContext";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import OrderSync from "./components/OrderSync";
import {
  Landing,
  Access,
  Error,
  Donation,
  About,
  Menu,
  Contact,
  Receipt,
  Orders,
} from "./pages";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <DataProvider>
            <OrderSync />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/access" element={<Access />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/receipt" element={<Receipt />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/donation" element={<Donation />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </DataProvider>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
