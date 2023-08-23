import { useSnackbar } from 'notistack';

/**
 * @param message(string) - notification message to be displayed
 * @param variant("success" | "warning" | "error") - determines variant of the error
 * @param duration(number) - duration of the notification in milliseconds
 */

const useQuickNotif = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const renderNotif = (
    message: string,
    variant?: 'success' | 'warning' | 'error',
    duration?: number
  ) => {
    enqueueSnackbar(message, {
      variant: variant || 'warning',
    });
    window.setTimeout(() => closeSnackbar, duration || 1500);
  };
  return renderNotif;
};

export default useQuickNotif;
