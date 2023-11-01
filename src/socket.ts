import { Socket, io } from 'socket.io-client';

const URL : string = import.meta.env['VITE_API_URL'];


const getCookie = (name: string) => {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  };

let socket: Socket;

const jwt_token = getCookie('jwt_token');

if (jwt_token) {
  localStorage.setItem('jwt_token', jwt_token as string);
  socket = io(URL, {
  query: {jwt_token: jwt_token},
      autoConnect: true,
  });
  } else {
    socket = io(URL);
    socket.connect();
  }

export function setJwtToken(jwtToken: string) {
  socket.disconnect();

  socket.io.opts.query = {
    jwt_token: jwtToken
  };

  socket.connect();
}

export default socket;