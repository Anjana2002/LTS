import "../App.css";


export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Quick Links */}
                <div className="footer-links">
                    <h4>Quick Links</h4>
                    <a href="#">Home</a>
                    <a href="#">About Us</a>
                    <a href="#">Contact</a>
                </div>

                {/* Contact Info */}
                <div className="footer-contact">
                    <h4>Contact</h4>
                    <p>Email: info@spiceleaf.com</p>
                    <p>Phone: +91 123 456 7890</p>
                </div>

                {/* Social Links */}
                <div className="footer-social">
                    <h4>Follow Us</h4>
                    <a href="#">Facebook</a>
                    <a href="#">Instagram</a>
                    <a href="#">Twitter</a>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2025 SpiceLeaf. All rights reserved.</p>
            </div>
        </footer>
    );
}
