import axios from 'axios';

async function GetListMovies(request) {
  try {
    const res = await axios.post('http://localhost:3333/api/movies', request);
    return res.data;
  } catch (err) {
    console.log('🚀 ~ Product ~ err:', err.message);
  }
}

async function GetListVideo(request) {
  try {
    const res = await axios.get('https://api.jikan.moe/v4/anime/15/videos', request);
    return res.data;
  } catch (err) {
    console.log('🚀 ~ Product ~ err:', err.message);
  }
}

export { GetListMovies, GetListVideo };
