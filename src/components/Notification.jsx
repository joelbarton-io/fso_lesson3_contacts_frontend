/* eslint-disable react/prop-types */
export default function Notification({ message }) {
  return message ? <div className="success">{message}</div> : null;
}
