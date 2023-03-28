import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface CoinInterface {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}

const Coins = () => {
    const [coins, setCoins] = useState<CoinInterface[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const response = await fetch(
                'https://api.coinpaprika.com/v1/coins'
            );
            const json = await response.json();
            setCoins(json.slice(0, 20));
            setLoading(false);
        })();
    }, []);
    return (
        <Container>
            <Header>
                <Title>코인</Title>
            </Header>
            <CoinsList>
                {loading ? (
                    <Loader>Loading....</Loader>
                ) : (
                    <CoinsList>
                        {coins.map((coin) => (
                            <Coin key={coin.id}>
                                <Link
                                    to={{
                                        pathname: `/${coin.id}`,
                                    }}
                                    state={{ name: coin.name }}
                                >
                                    <Img
                                        src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                                    />
                                    {coin.name} &rarr;
                                </Link>
                            </Coin>
                        ))}
                    </CoinsList>
                )}
            </CoinsList>
        </Container>
    );
};

const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`;
const Loader = styled.span`
    text-align: center;
    display: block;
`;
const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
    background-color: ${(props) => props.theme.textColor};
    color: ${(props) => props.theme.bgColor};

    margin-bottom: 10px;
    border-radius: 15px;
    font-size: 40px;
    a {
        transition: color 0.3s ease-in;
        display: flex;
        padding: 20px;
        align-items: center;
    }

    &:hover {
        a {
            color: ${(props) => props.theme.accentColor};
        }
    }
`;

const Title = styled.h1`
    font-size: 100px;
    color: ${(props) => props.theme.textColor};
`;

export default Coins;
