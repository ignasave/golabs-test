import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router';
import { Provider } from 'react-redux';

import Router from '../Router';
import store from '../../redux/store';
import Layout from '../Layout';

const App = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Layout>
					<Routes>{Router()}</Routes>
				</Layout>
			</BrowserRouter>
		</Provider>
	);
};

export default App;
