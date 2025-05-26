const SERVER_URL = `https://${process.env.REACT_APP_SERVER_URL}`;
const PUBLIC_URL = `https://${process.env.REACT_APP_PUBLIC_URL}`;
const ADMIN_URL  = `http://${process.env.REACT_APP_ADMIN_URL}`;

const MAX_FILES = 5;
const MAX_SIZE = 150000; // 150 KB

export { SERVER_URL, PUBLIC_URL, ADMIN_URL, MAX_FILES, MAX_SIZE };