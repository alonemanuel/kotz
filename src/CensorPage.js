import React, { useRef, useEffect } from "react";
import myImage2 from './images/kabar.jpg';


function CensorPage() {

    // Create an array of refs
    const itemRefs = useRef([]);
    itemRefs.current = Array(12).fill(null).map((_, i) => itemRefs.current[i] ?? React.createRef());

    // Scroll to item function
    const scrollToItem = (index) => {
        itemRefs.current[index].current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
    }

    return (
        <div className="censorPage">
            <h2>צנזורה</h2>
            <aside className="sidebar">
                <nav>
                    <ul>
                        {Array.from({ length: 12 }, (_, i) => (
                            <li key={i} onClick={() => scrollToItem(i)}>
                                אייטם {i}
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
            <main>
                {Array.from({ length: 12 }, (_, i) => (
                    <div ref={itemRefs.current[i]} key={i} className="contentItem">

                        <h2>
                            אייטם {i}
                        </h2>
                        <p>
                            לורם איפסום דולור סיט אמט
                        </p>
                    </div>
                ))}
                <img src={myImage2} alt="הקבר המזמר" className="magazine-image" />
            </main>
        </div>
    );
}

export default CensorPage;