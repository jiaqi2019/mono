import { useEffect } from 'react';
import './index.css';
import { get as userInfo } from '@api/user/info';
import { useNavigate } from '@modern-js/runtime/router';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { code, data } = await userInfo();
      if (code !== 0) {
        navigate('/login');
      } else {
        console.log(data);
      }
    })();
  });
  return <div className="container-box">home</div>;
};

export default Index;
