import logo from '../assets/chilli.png'
import "../App.css";


export default function Header() {
    return (
        <header className="header">
            <div className="logo-title">
                <img src={logo} alt="SpiceLeaf Logo" className="logo" />
                <h1>
                    <span className="spice">Spice</span>
                    <span className="leaf">Leaf</span>
                </h1>
            </div>

            <nav className="navbar">
                <a href="#" className="nav">Home</a>
                <a href="#" className="nav">About Us</a>
                <a href="#" className="nav">Contact</a>
            </nav>
        </header>
    )
}
