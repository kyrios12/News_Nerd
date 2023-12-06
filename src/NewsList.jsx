import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsList = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await axios.get(
        'https://newsapi.org/v2/top-headlines?country=us&apiKey=2a483ff6039847f2b5b3a7c6d9a24cea'
      );
      setNews(response.data.articles);
    };

    fetchNews();
  }, []);

  return (
    <div>
      <h2>Latest News</h2>
      <ul>
        {news.map((article) => (
          <li key={article.url}>
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <a href={`/news/${encodeURIComponent(article.url)}`}>Read more</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsList;