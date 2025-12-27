import { API } from '../services/API';

export const getActiveArticles = async () => {
  try {
    // API interceptor already returns response.data
    const response = await API.get('/articles/active');
    return response;
  } catch (error) {
    console.error('Error fetching active articles:', error);
    throw error;
  }
};

export const getArticlesSectionSettings = async () => {
  try {
    // API interceptor already returns response.data
    const response = await API.get('/articles/settings');
    return response;
  } catch (error) {
    console.error('Error fetching articles section settings:', error);
    throw error;
  }
};
