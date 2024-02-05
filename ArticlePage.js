import React, { useState, useEffect } from 'react';

function ArticlePage() {
    const [article, setArticle] = useState(null);

    useEffect(() => {
        fetch('http://localhost:1337/articles')
            .then((response => response.json()))
            .then((data) => {
                // Assuming you want the first article
                setArticle(data[0]);

            })
            .catch((error) => console.error(`Error fetching data: ${error}`));
    }, []);

    // Render loading state while waiting for fetch to complete
    if (!article) {
        return (
            <div>
                Loading...
            </div>
        );
    }

    return (
        <article>
            <h1>
                {article.title}
            </h1>
            <img src={`http://localhost:1337${article.cover.url}`} alt={article.title} />
            <p>
                {article.body}
            </p>
        </article>
    );

}
export default ArticlePage;