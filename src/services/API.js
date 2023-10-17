const API = {
  url: '/data.json',

  fetchScores: async () => {
    const result = await fetch(API.url);
    return await result.json();
  }
};

export default API;
