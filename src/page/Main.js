import styled from "styled-components";
import Concerts from "../component/Concerts";
import GenreConcerts from "../component/GenreConcerts";
import NewAlbums from "../component/NewAlbums";

const ConcertArea = styled.div`
  display: flex;
  padding-bottom: 20px;
  
`

export function Main({ token }) {
    return (
        <main>
            <NewAlbums token={token} />
            
            <ConcertArea>
                <Concerts/>
                <GenreConcerts/>
            </ConcertArea>
        </main>
    )
}