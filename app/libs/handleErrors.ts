interface ErrorClientProps {
  message: string;
  response: { data: { message: string; success: boolean } };
}
export const handleErrorsClient = (err: ErrorClientProps) => {
  return err && err.response && err.response.data
    ? err.response.data.message
    : err.message;
};
