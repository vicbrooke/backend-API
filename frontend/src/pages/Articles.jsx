import React, { useEffect, useState } from "react";
import axios from "axios";

function Articles() {
  const [articles, setArticles] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:4000/articles", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        setArticles(response.data.articles);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (isLoading) {
    console.log(articles);
  }
  return (
    !isLoading && (
      <section>
        {articles.map((article) => {
          return (
            <div>
              <h1>{article.title}</h1>
              <p>{article.body}</p>
            </div>
          );
        })}
      </section>
    )
  );
}

export default Articles;
