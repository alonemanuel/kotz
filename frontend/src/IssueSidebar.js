import { Link } from "react-router-dom";
import React, { useState } from 'react';

const IssueSidebar = ({ articles, onSelectArticle }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className={`issue-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <button onClick={() => setIsCollapsed(!isCollapsed)}>
                {isCollapsed ? 'Expad' : 'Collapse'}
            </button>
            <ul>
                {articles.map((article) => (
                    <li key={article.id} onClick={() => onSelectArticle(article.id)}>
                        {article.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};


export default IssueSidebar;