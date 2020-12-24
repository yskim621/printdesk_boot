import { useEffect } from 'react';

export default function (Component) {
  function AuthCheck(props) {
    useEffect(() => {
      console.log('ddd');
    }, []);

    return <Component />;
  }

  return AuthCheck;
}
