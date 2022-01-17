import { RootStateOrAny, useSelector } from 'react-redux';

const useAuth = () => {
	const { user } = useSelector((state: RootStateOrAny) => state.user);
    return Boolean(user);
};

export default useAuth;
