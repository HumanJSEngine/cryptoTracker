import { createBrowserRouter } from 'react-router-dom';
import Root from './Root';
import ErrorPage from './routes/ErrorPage';
import Coin from './routes/Coin';
import Coins from './routes/Coins';
import Price from './routes/Price';
import Chart from './routes/Chart';

const Router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
    },
    {
        path: ':coinId',
        element: <Coin />,
        children: [
            { path: 'price', element: <Price /> },
            { path: 'chart', element: <Chart /> },
        ],
    },
]);

export default Router;
