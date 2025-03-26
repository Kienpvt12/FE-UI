import axios from "axios";

async function GetListMoviesTop(request){
    try {
       const res = await axios.get("https://api.jikan.moe/v4/top/anime", request)
       return res.data
    }
    catch (err) {
        console.log("🚀 ~ Product ~ err:", err.message)
    }
}


async function GetListMoviesID(request){
    try {
       const res = await axios.get("https://api.jikan.moe/v4/anime/15/videos", request)
       return res.data
    }
    catch (err) {
        console.log("🚀 ~ Product ~ err:", err.message)
    }
}

export {
    GetListMoviesTop,
    GetListMoviesID,
}