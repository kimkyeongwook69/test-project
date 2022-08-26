// import React from 'react'
// import { useLocation } from 'react-router-dom'


// function Test() {
//     const {state} = useLocation();
//     const [artists, setArtists] = useState([]);

//     useEffect(() => {if(keyValue != "" && {token}) {searchArtists();}}, [keyValue])
    
//     const searchArtists = async () => {
//         const {data} = await axios.get("https://api.spotify.com/v1/search", {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             },
//             params: {
//                 q: keyValue,
//                 type: "artist,album"
//             }
//         })
//         setArtists(data.artists.items)
//     }
    
//     const renderArtists = () => {
//       return artists.map(artist => (
//           <SearchItem key={artist.id}>
//               {artist.images.length ? <a href={artist.external_urls.spotify} target="_blank"><img width={"100%"} src={artist.images[0].url} alt=""/></a> : <a href={artist.external_urls.spotify} target="_blank"><img width={"100%"} src="img/no_image.png"/></a>}
//               {artist.name}
//           </SearchItem>
//       ))
//     }


//     return(
//         <SearchArea>
//             <h1>'{keyValue}' 에 대한 검색 결과 입니다.</h1>
//             <SortMenu>
//               <button onClick={sortPopularity}>인기순</button>
//             </SortMenu>
//             {renderArtists()}
//         </SearchArea>
//     )
// }

// export default Test