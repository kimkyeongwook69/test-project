import axios from "axios";

export const searchArtists = async ({token, keyValue}) => {
    
    const {data} = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            q: keyValue,
            type: "artist"
        }
    });
    console.log(data)
    
};

