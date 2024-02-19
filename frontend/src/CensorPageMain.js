import React, { useRef, useState, useEffect } from "react";
import myImage2 from './images/kabar.jpg';


const CensorPageMain = ({ selectedArticle }) => {
    return (
        <div className="censor-main">
            {selectedArticle ? (
                <>
                    <h1>
                        {selectedArticle.title}
                    </h1>
                    <p>
                        {selectedArticle.content}
                    </p>
                    {/* Display image if exists */}
                    {selectedArticle.cover && <img src={selectedArticle.cover} alt={selectedArticle.title} />}
                </>
            ) : (
                <p>
                    Selected an article from the sidebar
                </p>
            )}
        </div>
    )
}


export default CensorPageMain;