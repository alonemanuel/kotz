import React from "react";
import myImage from './images/Notobasis_syriaca.jpg'

function MainContent() {
    return (
        <main>
            <img src={myImage} alt="Kotz Magazine" className="magazine-image"/>
            <p>ברוכים הבאים למגזין קוץ.</p>
        </main>
    );
}
export default MainContent;