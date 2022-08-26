import { Outlet } from "react-router-dom";
import Footer from "../component/Footer";
import styled from "styled-components";
import { Header } from "./Header";
import { useEffect } from 'react';

const Container = styled.div`
  padding: 3rem 5rem;
  min-width: 1400px;
  max-width: 1400px;
  margin: 0 auto;
`;

export function Common({ token, setToken, setSearchKey }) {

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token);
        }

        setToken(token)
    }, [])

    return (
        <Container>
            <header>
                <Header token={token} setToken={setToken} setSearchKey={setSearchKey} />
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </Container>
    )
}