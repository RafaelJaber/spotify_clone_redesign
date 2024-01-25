import { IShortArtistsModel } from './IShortArtists.model';
import { IAlbumModel } from './IAlbum.model';

export interface IMusicModel {
  id: string;
  title: string;
  artists: IShortArtistsModel[];
  album: IAlbumModel;
  time: string;
  uri: string;
}
