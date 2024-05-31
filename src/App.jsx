import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authService from './appwrite/services';
import { login } from './store/authslice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          console.log(userData);
          dispatch(login({userData}));
      
        }
      } catch (error) {
        console.log(error);
        
      }
    };

    fetchCurrentUser();
  }, []);

  return <></>;
}

export default App;
