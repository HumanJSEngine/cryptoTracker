import React, { useState, useEffect } from 'react';
import {
    useParams,
    useLocation,
    Outlet,
    Link,
    useMatch,
} from 'react-router-dom';
import styled from 'styled-components';

interface Params {
    coinId: string;
}

interface ILocation {
    state: {
        name: string;
    };
}

interface ITag {
    coin_number: number;
    ico_counter: number;
    id: 'token-issuance';
    name: 'Token Issuance';
}
interface InfoData {
    id: object;
    name: object;
    symbol: object;
    rank: object;
    is_new: object;
    is_active: object;
    type: object;
    logo: object;
    tags: ITag[];
    team: object;
    description: object;
    message: object;
    open_source: object;
    started_at: object;
    development_status: object;
    hardware_wallet: object;
    proof_type: object;
    org_structure: object;
    hash_algorithm: object;
    links: object;
    links_extended: object;
    whitepaper: object;
    first_data_at: object;
    last_data_at: object;
}

interface PriceData {}
const Coin = () => {
    const { coinId } = useParams<{ coinId: string }>();
    const [loading, setLoading] = useState(true);
    const { state } = useLocation() as ILocation;
    const [info, setInfo] = useState({});
    const [priceInfo, setPriceInfo] = useState({});
    const priceMatch = useMatch('/:coinId/price');
    console.log(priceMatch);
    const chartMatch = useMatch('/:coinId/chart');
    console.log('차트매치', chartMatch);

    useEffect(() => {
        (async () => {
            const infoData = await (
                await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
            ).json();
            const priceData = await (
                await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
            ).json();
            setInfo(infoData);
            setPriceInfo(priceData);
            console.log('인포', infoData);
            console.log('가격', priceData);
            setLoading(false);
        })();
    }, []);

    return (
        <Container>
            <Header>
                <Title>
                    {state?.name
                        ? state.name
                        : loading
                        ? 'Loading...'
                        : info?.name}
                </Title>
            </Header>
            {loading ? (
                <Loader>Loading....</Loader>
            ) : (
                <>
                    <Overview>
                        <OverviewItem>
                            <span>Rank:</span>
                            <span>{info?.rank}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Symbol:</span>
                            <span>{info?.symbol}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Open Source:</span>
                            <span>{info?.open_source}</span>
                        </OverviewItem>
                        <Description>{info?.description}</Description>
                        <OverviewItem>
                            <span>Total Supply:</span>
                            <span>{priceInfo?.total_supply}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Max Supply:</span>
                            <span>{priceInfo?.max_supply}</span>
                        </OverviewItem>
                    </Overview>
                    <Tabs>
                        <Tab isActive={priceMatch !== null}>
                            <Link to={`/${coinId}/price`}>Price</Link>
                        </Tab>
                        <Tab isActive={chartMatch !== null}>
                            <Link to={`/${coinId}/chart`}>Chart</Link>
                        </Tab>
                    </Tabs>
                </>
            )}
            <Outlet />
        </Container>
    );
};

const Overview = styled.div`
    display: flex;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
    padding: 10px 20px;
    border-radius: 10px;
`;
const OverviewItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    span:first-child {
        font-size: 15px;
        font-weight: 450;
        text-transform: uppercase;
        margin-bottom: 10px;
    }
`;

const Description = styled.p`
    margin: 20px 0px;
`;

const Tabs = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 25px 0px;
    gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 450;
    background: rgba(0, 0, 0, 0.5);
    padding: 8px 0px;
    border-radius: 10px;
    color: ${(props) =>
        props.isActive ? props.theme.accentColor : props.theme.textColor};
    a {
        display: block;
    }
`;
const Title = styled.h1`
    font-size: 100px;
    color: ${(props) => props.theme.textColor};
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
export default Coin;
