import React, { useRef, useState, useEffect } from "react";
import myImage2 from './images/kabar.jpg';


function CensorPage() {

    const [articles, setArticles] = useState([]);

    // Function to render rich text body
    const renderRichText = (body) => {
        return body.map((paragraph, index) => (
            <p key={index}>
                {paragraph.children.map((child, childIndex) => (
                    <span key={childIndex}>{child.text}</span>
                ))}
            </p>
        ));
    };

    console.log(`articles:`);
    console.log(articles);

    // Create an array of refs
    // const itemRefs = useRef([]);
    // itemRefs.current = Array(12).fill(null).map((_, i) => itemRefs.current[i]
    // ?? React.createRef());

    // Scroll to item function
    // const scrollToItem = (index) => {
    //     itemRefs.current[index].current.scrollIntoView({
    //         behavior: 'smooth',
    //         block: 'start',
    //     })

    // }

    useEffect(() => {
        // Replace with real url
        fetch('http://localhost:1337/api/articles?populate=cover')
            .then((Response) => Response.json())
            .then((data) => {
                setArticles(data.data.map(article => article.attributes));
            })
            .catch((error) => console.log(`Error: ${error}`));
    }, []);


    return (
        <div className="censorPage">
            <h2>צנזורה</h2>
            <aside className="sidebar">
                {/* Navigation - Ideally, this becomes dynamic based on fetched articles */}

                <nav>
                    <ul>
                        {
                            console.log('yo')}
                        {
                            articles.map((article, index) => (
                                <li key={index}>
                                    כתבה {index}
                                </li>
                            ))
                        }
                        {/* {Array.from({ length: 12 }, (_, i) => (
                            <li key={i} onClick={() => scrollToItem(i)}>
                                אייטם {i}
                            </li>
                        ))} */}
                    </ul>
                </nav>
            </aside>
            <main>
                {articles.map((article, index) =>
                (

                    <article key={article.id}>
                        <h2>
                            {article.title}
                        </h2>
                        <h3>
                            {article.author}
                        </h3>
                        <p>
                            {renderRichText(article.body)}
                        </p>
                        <img src={`http://localhost:1337${article.cover?.data?.attributes.url}`} alt="" />
                        <hr />
                    </article>
                )
                )}
            </main>
            {/* <main>
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
            </main> */}
        </div>
    );
}

export default CensorPage;