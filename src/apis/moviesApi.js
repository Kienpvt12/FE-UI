import axios from "axios";

async function GetListMovies(request){
    try {
       const res = await axios.post("http://localhost:3333/api/movies", request)
       console.log("🚀 ~ Product ~ res:", res)
       return res.data
    }
    catch (err) {
        console.log("🚀 ~ Product ~ err:", err.message)
    }
}

export {
    GetListMovies
}