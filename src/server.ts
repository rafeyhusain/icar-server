import 'dotenv/config';
import '@/index';
import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import CarsRoute from './routes/cars.route';

validateEnv();

const app = new App([
    new IndexRoute(), 
    new CarsRoute(), 
    new UsersRoute(), 
    new AuthRoute()
]);

app.listen();
