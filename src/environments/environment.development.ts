export const environment = {
  clientId: 'd344b09a67c84ace80caee4b98dfd84a',
  authEndpoint: 'https://accounts.spotify.com/authorize',
  redirectUri: 'http://localhost:4200/login/',
  scopes: [
    'user-read-currently-playing', // musica tocando agora.
    'user-read-recently-played', // ler musicas tocadas recentemente
    'user-read-playback-state', // ler estado do player do usuário
    'user-top-read', // top artistas e músicas do usuário
    'user-modify-playback-state', // alterar do player do usuário.
    'user-library-read', // ler biblioteca dos usuários
    'playlist-read-private', // ler playlists privadas
    'playlist-read-collaborative', // ler playlists colaborativas
    'user-follow-read', // ler quem o usuário segue
    'user-read-private', // ler algo
    'user-read-email', // ler email
    'streaming', // realizar o streaming
  ],
};
