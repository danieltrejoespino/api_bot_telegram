const axios = require('axios');

const animeActions = {

  healtAPi : async () => {
    const apiUrl ='http://localhost:5001/api/anime/health'
    const rspta = await axios.get(apiUrl)    
    return rspta.data; 
  },    

  getListAnime : async () => {
  const apiUrl ='http://localhost:5001/api/anime/day/list_animes'
  const rspta = await axios.get(apiUrl)
  return rspta.data; 
  }

}




module.exports =animeActions