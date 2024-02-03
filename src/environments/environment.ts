export const environment = {
  authEndpoint: 'https://accounts.spotify.com/authorize',
  redirectUri: 'https://spotify-clone-redesign-tau.vercel.app/login/',
  scopes: [
    'user-read-currently-playing',
    'user-read-recently-played',
    'user-read-playback-state',
    'user-top-read',
    'user-modify-playback-state',
    'user-library-read',
    'playlist-read-private',
    'playlist-read-collaborative',
    'user-follow-read',
    'user-library-modify',
    'user-read-private',
    'user-read-email',
    'streaming',
  ],
};
