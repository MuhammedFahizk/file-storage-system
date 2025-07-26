// hoc/withPublic.js
'use client';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const withPublic = (WrappedComponent) => {
  return function PublicComponent(props) {
    const { isLoggedIn } = useSelector((state) => state.auth);
    console.log(isLoggedIn);
    
    const router = useRouter();

    useEffect(() => {
      if (isLoggedIn) {
        router.replace('/');
      }
    }, [isLoggedIn]);

    if (isLoggedIn) return null;

    return <WrappedComponent {...props} />;
  };
};

export default withPublic;
