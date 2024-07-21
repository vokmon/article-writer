type ErrorMessageType = {
  message: string;
};
export default function ErrorMessage({ message }: ErrorMessageType) {
  return <div>{message}</div>;
}
