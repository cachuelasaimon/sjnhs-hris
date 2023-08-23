import { FC, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { IUser, ROLES } from '~/types';
import { Get, collections, useLogin } from '~/utils';

interface IWithAuthProps {
  requireAdmin: boolean;
  Component: any;
}

export const WithAuth: FC<IWithAuthProps> = ({ Component, requireAdmin }) => {
  const { checkState, isLoading, user } = useLogin();
  const [userInfo, setUserInfo] = useState<IUser | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    checkState();
    // only run checkState on mount and nowhere else
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    /**
     * Fetches userInfo using the Get hook
     */
    const getUserInfo = async () => {
      const data = await Get<IUser>({
        docRef: `${collections.users.string}/${user?.uid}`,
      });

      setUserInfo(data);
    };

    // if a user is logged in but user info is not yet fetched, fetch user information from user collection
    if (!userInfo && user) getUserInfo();

    /**  Checks if:
     * - the route passed requires admin privileges
     * - if the user is an admin
     *
     * if the route requires admin privilege, and the user is not an admin, then redirect the user back to homepage
     */

    if (
      userInfo &&
      user &&
      !userInfo.roles.includes(ROLES.ADMIN) &&
      requireAdmin
    )
      navigate('/');

    // only run this useEffect function when userInfo and user changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo, user]);

  if (!requireAdmin) return <>{!isLoading && <Component user={user} />}</>;

  return (
    <>
      {userInfo &&
        user &&
        userInfo.roles.includes(ROLES.ADMIN) &&
        requireAdmin && <Component user={user} />}
    </>
  );
};
