import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import XMLParser from 'react-xml-parser'
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

const GeneConcertsWrap = styled.div`
    width: 360px;
    cursor: pointer;
    & h1{
        font-size: 0.8rem;
        font-weight: bold;
        padding: 15px 0;
    }
`

const GeneList = styled.div`
    font-size: 0;
    & li{
        display: inline-block;
        width: 120px;
        line-height: 35px;
        border: 1px solid lightgray;
        font-size: 0.8rem;
        font-weight: bold;
        text-align: center;
        cursor: pointer;
    }
    & li:nth-child(2){
        border-left: none;
        border-right: none;
    }
    & li.on{
        background-color: lightgray;
        color: white;
    }
`

const GeneConcertList = styled.div`
    border: 1px solid lightgray;
`

const GeneConcert = styled.div`
    height: 120px;
    display: flex;
    align-items: center;
    font-size: 0.8rem;
    font-weight: bold;
    

    & div:nth-child(1){
        width: 10%;
        text-align: center;
        padding-left: 13px;
    }
    & div:nth-child(2){
        width: 25%;
        padding: 15px;
        & img{
            border: 1px solid lightgray;
        }
    }
    & div:nth-child(3){
        width: 65%;
        padding: 30px 10px;
    }
`

function parseJson(dataSet) {
    const dataArr = new XMLParser().parseFromString(dataSet);
    return dataArr;
}



function GeneConcerts(){
    const [data, setData] = useState([]);
    const [gene, setGene] = useState(0);
    const geneLiRef = useRef([]);
    const navigate = useNavigate();

    const readShowList = async (geneCode) => {
        try {
            let url = '/pblprfr?service=5142c77db2284ca09ff559832f6858e2&stdate=20220703&eddate=20220801&cpage=1&rows=10';

            if(geneCode !== undefined){
                url += "&shcate=" + geneCode;
            }else{
                url += "&shcate=AAAB";
                
            }
            const response = await axios.get(
                url,
            );

           const xmlData = response.data;
           const jsonData = parseJson(xmlData);
           // const parse
           setData(jsonData.children);

        } catch (e) {
          console.log(e);
        }
    };

    useEffect(() => {
        readShowList();
        setGene(1);
        geneLiRef.current[1].classList.toggle("on");
    },[]);

    const changeGene = (e) => {
        geneLiRef.current[gene].classList.toggle("on");
        switch(e.target.innerText){
            case "뮤지컬":
                readShowList("AAAB");
                setGene(1);
                break;
            case "클래식":
                readShowList("CCCA");
                setGene(2);
                break;
            case "오페라":
                readShowList("CCCB");
                setGene(3);
                break;
            default:
                break;
        }
        e.target.classList.toggle("on");
        
    }

    const goDetail = (id) => {
        navigate("/detail", {state : {id : id}});
        // searchRef.current.value = "";
      }

    return(
        <GeneConcertsWrap>
            <h1>장르별 공연 목록</h1>
            <GeneList>
                <ul>
                    <li id="gene-1" ref={elem => (geneLiRef.current[1] = elem)} onClick={changeGene}>뮤지컬</li>
                    <li id="gene-2" ref={elem => (geneLiRef.current[2] = elem)} onClick={changeGene}>클래식</li>
                    <li id="gene-3" ref={elem => (geneLiRef.current[3] = elem)} onClick={changeGene}>오페라</li>
                </ul>
            </GeneList>
            <GeneConcertList>
            {data.length !== 0 &&
            (
                data.map((item, index) => (
                    <GeneConcert onClick={() => {goDetail(item.children[0].value)}}>
                        <div>
                            <span>{index + 1}</span>
                        </div>
                        <div>
                            <img src={item.children[5].value} width={"100%"}/>
                        </div>
                        <div>
                            <span>{item.children[1].value}</span>
                        </div>
                    </GeneConcert>)
                )
            )}
            </GeneConcertList>
        </GeneConcertsWrap>
    );
}

export default GeneConcerts;