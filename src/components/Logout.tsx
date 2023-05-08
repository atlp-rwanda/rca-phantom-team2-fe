import { logout } from '@/store/authApi';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  
  return (
    <div className="mt-6">

  <div className="flex items-center justify-start px-2 font-medium text-bgprimary bg-gray-200 py-2 text-xs rounded">

        <button onClick={() => { logout(); navigate('/signin'); }}>Logout</button>

  </div>
</div>
  );
};
export default Logout;