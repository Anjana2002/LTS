import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import DashboardLayout from './components/DashboardLayout.jsx';
import Dashboard from './components/Dashboard.jsx';
import ProfileSection from './components/ProfileSection.jsx';
import Protected from './components/Protected.jsx';
import AddItem from "./components/AddItem.jsx";
import Counter from "./components/Counter.jsx";
import ViewItem from "./components/ViewItem.jsx";
import AddPet from "./components/AddPet.jsx"
function MainLayout() {
  return (
    <div className="app-container">
      <Header />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<Protected><DashboardLayout /></Protected>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/profile" element={<ProfileSection />} />
          <Route path="/additem" element={<AddItem />} />
          <Route path="/viewitem" element={<ViewItem />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/addpet" element={<AddPet />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
