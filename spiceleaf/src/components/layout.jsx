import Header from './header.jsx';
import Footer from './footer.jsx';
import "../App.css";


export default function Layout({ children }) {
    return (
        <div className="app-container">
            <Header />
            <main className="content">
                {children}
            </main>
            <Footer />
        </div>
    )
}