import { useEffect, useState } from 'react';

import type { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { auth, useErrorNotif } from '~/utils';

export const useLogin = (redirectTo?: string) => {
  const [loggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const showError = useErrorNotif();
  const navigate = useNavigate();

  const checkState = () => setIsLoading(false);

  useEffect(() => {
    const checkIfUserIsLoggedIn = async () => {
      try {
        await onAuthStateChanged(auth, (user) => {
          if (user) {
            // console.log("logged in", user);
            setUser(user);
            setIsLoggedIn(true);
          } else {
            navigate(redirectTo || '/');
          }
        });
      } catch (err) {
        showError((err as any).message);
      } finally {
        setIsLoading(false);
      }
    };

    if (!isLoading) checkIfUserIsLoggedIn();
    // This useEffect should only monitor the isLoading state
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     console.log("logged in", user);
  //     setUser(user);
  //     setIsLoggedIn(true);
  //   } else {
  //     navigate("/");
  //   }
  // });

  return { loggedIn, user, isLoading, checkState };
};
