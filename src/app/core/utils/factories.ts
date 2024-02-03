import { ICurrentPlayModel } from '@domain/interfaces/ICurrentPlay.model';
import { IArtistsModel } from '@domain/interfaces/IArtists.model';
import { IMusicModel } from '@domain/interfaces/IMusic.model';
import { IAlbumModel } from '@domain/interfaces/IAlbum.model';
import { IShortArtistsModel } from '@domain/interfaces/IShortArtists.model';
import { IPlaylistModel } from '@domain/interfaces/IPlaylist.model';

export function newArtists(): IArtistsModel {
  return {
    id: '',
    name: '',
    imageUrl: '',
    musics: [],
  };
}

export function newMusic(): IMusicModel {
  return {
    id: '',
    title: '',
    artists: [],
    album: newAlbum(),
    time: '0:00',
    uri: '',
  };
}

export function newAlbum(): IAlbumModel {
  return {
    id: '',
    name: '',
    imageUrl: '',
  };
}

export function newShortArtist(): IShortArtistsModel {
  return {
    id: '',
    name: '',
  };
}

export function newCurrentPlay(): ICurrentPlayModel {
  return {
    isPlaying: null,
    music: newMusic(),
  };
}

export function newPlaylist(): IPlaylistModel {
  return {
    id: '',
    name: '',
    imageUrl: '',
    musics: [],
  };
}
