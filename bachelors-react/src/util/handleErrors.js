
export default function (status, message) {
  switch (status) {
    case 400:
      return message;
    case 500:
      return 'Internal server error.';
    default: return message;
  }
}
