import React from "react";
import myImage2 from './images/kabar.jpg';

function FakePage() {
    return (
        <div>
            <h2>פייק</h2>
            <aside>
                <nav>
                    <ul>
                        <li>בינה מלאכותית</li>
                        <li>יצירה עמוקה</li>
                        <li>האם זה חוקי?</li>

                    </ul>
                </nav>
            </aside>
            <main>
                <p>
                    לורם איפסום
                </p>
                <img src={myImage2} alt="הקבר המזמר" className="magazine-image"/>
            </main>
        </div>
    );
}

export default FakePage;