
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-0"> 
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/service" element={
              <div className="text-center p-10 text-2xl bg-blue-50 flex-1">Our Services Page Content</div>
          } />
          <Route path="*" element={
              <div className="text-center p-10 text-2xl bg-blue-50 flex-1">404 - Page Not Found</div>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}