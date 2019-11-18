export interface ServiceStatus {
  internalError: string;
  loading: boolean;
}

export const sendServiceStatus = ({
  internalError = '',
  loading = false,
}) => ({
  internalError,
  loading,
});
