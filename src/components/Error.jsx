/* eslint-disable react/prop-types */
export default function Error({ message }) {
  return message ? <div className="error">{message}</div> : null;
}
