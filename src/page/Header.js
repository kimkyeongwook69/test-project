import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CLIENT_ID, REDIRECT_URI, AUTH_ENDPOINT, RESPONSE_TYPE } from '../config'

const TopHeader = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  position: relative;
`;

const LogoImg = styled.img`
  margin-right: 20px;
  vertical-align: bottom;
`;

const LogoName = styled.h1`
  font-size: 2rem;
  width: 12%;
  min-width: 170px;
  font-family: 'Berkshire Swash', cursive;
  color: #005666;
  cursor: pointer;
`;

const SearchForm = styled.form`
  width: 55%;
  position: relative;
`;

const SearchSelect = styled.select`
  position: absolute;
  border: none;
  background-color:transparent;
  padding: 8px 5px;
  padding-left: 15px;
  left: 12px;
  outline: none;
`

const SearchInput = styled.input`
  border: 2px solid skyblue;
  padding: 0.5rem 2rem;
  padding-left: calc(135px + 0.8rem);
  border-radius: 30px;
  width: 100%;
  outline: none;
`;

const SearchButton = styled.button`
  position: absolute;
  background-color:transparent;
  border: none;
  right: 0.5rem;
  cursor: pointer;
`;

const LogoutButton = styled.button`
  padding: 10px 15px;
  border: 1px solid white;
  background-color: skyblue;
  color: white;
  margin-left: 2rem;
  cursor: pointer;
`;

export function Header({ token, setToken }) {
  const searchRef = useRef("");
  const searchSelectRef = useRef("");
  const navigate = useNavigate();

  const searchArtists = async (e) => {
    e.preventDefault();
    let searchInputValue = searchRef.current.value;
    let searchKey = searchSelectRef.current.value;

    let data = {
      option: searchKey,
      value: searchInputValue
    }

    switch (searchKey) {
      case "artist":
        navigate('/search', { state: data });
        break;
      case "album":
        navigate('/search', { state: data });
        break;
      default:
        break;
    }
  }

  const logout = () => {
    window.localStorage.removeItem("token");
    setToken('');
  }

  const goMain = () => {
    navigate("/");
    searchRef.current.value = "";
  }

  return (
    <div>
      <TopHeader>
        <LogoName onClick={goMain}>
          <LogoImg src="img/logo.png" width="36px" />Music
        </LogoName>

        {token ? (
          <SearchForm onSubmit={searchArtists}>
            <SearchSelect ref={searchSelectRef}>
              <option value="artist" selected>Artist</option>
              <option value="album" >Album</option>
            </SearchSelect>
            <SearchInput type="text" ref={searchRef} />
            <SearchButton type={"submit"}><img src="img/search.png" width="32px" /></SearchButton>
          </SearchForm>
        ) :
          (
            <h2>Please Login</h2>
          )
        }

        {!token ?
          <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
            to Spotify</a>
          : <LogoutButton onClick={logout}>Logout</LogoutButton>}
      </TopHeader>
    </div>
  )
}