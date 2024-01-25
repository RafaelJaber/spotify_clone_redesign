import { IMusicModel } from './IMusic.model';

export interface IPlaylistModel {
  id: string;
  name: string;
  imageUrl: string;
  musics?: IMusicModel[];
}
