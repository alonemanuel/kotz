import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <aside>
            <nav>
                <ul>
                    <li><Link to="/censorship">צנזורה</Link></li>
                    <li><Link to="/fake">פייק</Link></li>
                    <li>פרובוקציה</li>
                </ul>
            </nav>
        </aside>
    );
}
export default Sidebar;