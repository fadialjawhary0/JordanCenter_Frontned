import { useState, useEffect } from 'react';
import { getActiveArticles, getArticlesSectionSettings } from '../queries/article.queries';

export const useArticles = () => {
  const [articles, setArticles] = useState([]);
  const [sectionSettings, setSectionSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [articlesResponse, settingsResponse] = await Promise.all([
          getActiveArticles(),
          getArticlesSectionSettings(),
        ]);
        // API interceptor returns response.data, so response is { success: true, data: [...] }
        setArticles(articlesResponse?.data || []);
        setSectionSettings(settingsResponse?.data || null);
        setError(null);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError(err);
        setArticles([]);
        setSectionSettings(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { articles, sectionSettings, loading, error };
};

export default useArticles;
