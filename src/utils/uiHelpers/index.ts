import { useSnackbar } from 'notistack';

export const useErrorNotif = () => {
  const firebaseErrors = [
    { firebaseErr: 'auth/wrong-password', message: 'Wrong Password' },
    { firebaseErr: 'auth/user-not-found', message: 'User not found' },
    {
      firebaseErr: 'auth/email-already-in-use',
      message: 'Email is already in use',
    },
    {
      firebaseErr: 'auth/too-many-requests',
      message: 'Too many wrong attempts, please try again later',
    },
  ];
  const { enqueueSnackbar } = useSnackbar();
  const renderError = (err?: any) => {
    if (err) {
      const message = firebaseErrors.some(({ firebaseErr }) =>
        err.includes(firebaseErr)
      )
        ? firebaseErrors.find(({ firebaseErr }) => err.includes(firebaseErr))
            ?.message
        : 'Something went wrong';

      enqueueSnackbar(message, { variant: 'error' });
    } else {
      enqueueSnackbar(typeof err === 'string' ? err : 'Something went wrong', {
        variant: 'error',
      });
    }
  };
  return renderError;
};

export { default as useQuickNotif } from './useQuickNotif';
export * from './createHashMap';

export const altImageName: (imgName: string) => string = (imgName) =>
  imgName.toLowerCase().split(' ').join('-');
