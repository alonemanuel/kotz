import React, { useState, useEffect } from "react";
import IssueSidebar from "./IssueSidebar";
import CensorPageMain from "./CensorPageMain";

const CensorshipPage2 = () => {
    const [articles, setArticles] = useState([]);
    const [selectedArticleId, setSelectedArticleId] = useState(null);

    useEffect(() => {
        // Fetch articles from your backend here and set them in state
        // fetch(`${process.env.REACT_APP_STRAPI_API_URL}/api/articles?populate=cover`)
        fetch(`http://localhost:1337/api/articles?populate=cover`)
            .then((response) => {
                console.log('hi');
                return response.json();
            })
            .then((data) => {
                // Transform data as needed and snet it
                console.log('data:');
                console.log(data);
                setArticles(data);
            });
    }, []);

    console.log('articles:');
    console.log(articles);
    
    const selectedArticle = articles.find((article) => article.id === selectedArticleId);

    return (
        <div className="censorship-page">
            <IssueSidebar articles={articles} onSelectArticle={setArticles} />
            <CensorPageMain selectedArticle={selectedArticle} />
        </div>
    );
};

export default CensorshipPage2;