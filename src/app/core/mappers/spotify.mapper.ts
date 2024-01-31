import { IUserModel } from '@domain/interfaces/IUser.model';
import { ICurrentPlayModel } from '@domain/interfaces/ICurrentPlay.model';
import { IShortArtistsModel } from '@domain/interfaces/IShortArtists.model';
import { IPlaylistModel } from '@domain/interfaces/IPlaylist.model';
import { newArtists, newMusic, newPlaylist } from '@core/utils/factories';
import { IArtistsModel } from '@domain/interfaces/IArtists.model';
import { IMusicModel } from '@domain/interfaces/IMusic.model';
import { IAlbumModel } from '@domain/interfaces/IAlbum.model';
import { format, addMilliseconds } from 'date-fns';

export function SpotifyUserModelToUser(
  user: SpotifyApi.CurrentUsersProfileResponse,
): IUserModel {
  return {
    id: user.id,
    name: user.display_name == undefined ? '' : user.display_name,
    // @ts-ignore
    imageUrl: user.images == undefined ? '' : user.images.pop().url,
  };
}

export function SpotifyPlaylistModelToPlaylist(
  playlist: SpotifyApi.PlaylistObjectSimplified,
): IPlaylistModel {
  return {
    id: playlist.id,
    name: playlist.name,
    // @ts-ignore
    imageUrl: playlist.images == undefined ? '' : playlist.images.pop().url,
  };
}

export function SpotifySinglePlaylistModelToPlaylist(
  playlist: SpotifyApi.SinglePlaylistResponse,
): IPlaylistModel {
  if (!playlist) return newPlaylist();

  return {
    id: playlist.id,
    name: playlist.name,
    // @ts-ignore
    imageUrl: playlist.images == undefined ? '' : playlist.images.pop().url,
    description: playlist.description,
    musics: [],
  };
}

export function SpotifySingleArtistModelToArtist(
  artist: SpotifyApi.SingleArtistResponse,
): IArtistsModel {
  if (!artist) return newArtists();

  return {
    id: artist.id,
    name: artist.name,
    // @ts-ignore
    imageUrl: artist.images == undefined ? '' : artist.images.pop().url,
    musics: [],
    additionalInfo: artist.followers.total + ' Seguidores',
  };
}

export function SpotifyArtistsModelListToArtists(
  artists: SpotifyApi.ArtistObjectFull,
): IArtistsModel {
  return {
    id: artists.id,
    name: artists.name,
    imageUrl: artists.images
      ? // @ts-ignore
        artists.images.sort((a, b) => a.width - b.width).pop().url
      : '',
  };
}

export function SpotifyMusicModelToMusic(
  spotifyTrack: SpotifyApi.TrackObjectFull,
): IMusicModel {
  const msToMinutes = (ms: number) => {
    const date = addMilliseconds(new Date(0), ms);
    return format(date, 'mm:ss');
  };
  return {
    id: spotifyTrack.id,
    title: spotifyTrack.name,
    album: SpotifyAlbumModelToAlgum(spotifyTrack.album),
    artists: spotifyTrack.artists.map(SpotifyArtistsModelListToShortArtists),
    time: msToMinutes(spotifyTrack.duration_ms),
    uri: spotifyTrack.uri,
  };
}

export function SpotifyAlbumModelToAlgum(
  album: SpotifyApi.AlbumObjectSimplified,
): IAlbumModel {
  return {
    id: album.id,
    name: album.name,
    imageUrl: album.images
      ? // @ts-ignore
        album.images.sort((a, b) => a.width - b.width).pop().url
      : '',
  };
}

export function SpotifyArtistsModelListToShortArtists(
  artists: SpotifyApi.ArtistObjectSimplified,
): IShortArtistsModel {
  return {
    id: artists.id,
    name: artists.name,
  };
}

export function SpotifyCurrentPlayToCurrentPlay(
  currentPlay: SpotifyApi.CurrentlyPlayingObject,
): ICurrentPlayModel {
  return {
    isPlaying: currentPlay.is_playing,
    music: currentPlay.item
      ? SpotifyMusicModelToMusic(currentPlay.item)
      : newMusic(),
  };
}
