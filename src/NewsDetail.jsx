import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const NewsDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=2a483ff6039847f2b5b3a7c6d9a24cea&id=${id}`
        );

        setArticle(response.data); // Assuming the API response contains the article details
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    fetchArticle();
  }, [id]);

  return (
    <div>
      <h2>News Detail</h2>
      {article ? (
        <div>
          <h3>{article.title}</h3>
          <p>{article.description}</p>
          <img src={article.imageUrl} alt={article.title} />
          <p>{article.content}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            Read more
          </a>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default NewsDetail;
