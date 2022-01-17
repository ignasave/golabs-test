import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
//@ts-ignore
const Layout = ({ children }) => {
	const auth = useAuth();
	return (
		<>
			<div>
				{auth ? (
					<Link to='/' className='nav-link'>
						Recipes
					</Link>
				) : (
					<>
						<Link to='/login' className='nav-link'>
							Login
						</Link>
						<Link to='/register' className='nav-link'>
							Register
						</Link>
					</>
				)}
			</div>
			{children}
		</>
	);
};

export default Layout;
