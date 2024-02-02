/* eslint-disable @typescript-eslint/ban-ts-comment */
import { IMusicModel } from '@domain/interfaces/IMusic.model';
import { addMilliseconds, format } from 'date-fns';
import { IAlbumModel } from '@domain/interfaces/IAlbum.model';
import { IShortArtistsModel } from '@domain/interfaces/IShortArtists.model';

export function PlayerAlbumToAlbum(album: Spotify.Album): IAlbumModel {
  return <IAlbumModel>{
    id: album.uri,
    name: album.name,
    imageUrl: album.images
      ? // @ts-expect-error
        album.images.sort((a, b) => a.width - b.width).pop().url
      : '',
  };
}

export function PlayerArtistToShortArtist(
  artist: Spotify.Entity,
): IShortArtistsModel {
  return {
    id: artist.uri,
    name: artist.name,
  };
}

export function PlayerTrackToMusic(track: Spotify.Track): IMusicModel {
  const msToMinutes = (ms: number) => {
    const date = addMilliseconds(new Date(0), ms);
    return format(date, 'mm:ss');
  };

  return {
    id: track.uid,
    title: track.name,
    time: msToMinutes(track.duration_ms),
    uri: track.uri,
    album: PlayerAlbumToAlbum(track.album),
    artists: track.artists.map(PlayerArtistToShortArtist),
  };
}
