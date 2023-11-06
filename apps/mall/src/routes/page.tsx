import { useEffect } from 'react';
import './index.css';
import { get as userInfo } from '@api/user/info';

const Index = () => {
  useEffect(() => {
    (async () => {
      const { code } = await userInfo();
      if (code !== 0) {
        alert(1);
      }
      alert(2);
    })();
  });
  return <div className="container-box">home</div>;
};

export default Index;
