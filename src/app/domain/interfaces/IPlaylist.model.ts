import { IMusicModel } from './IMusic.model';

export interface IPlaylistModel {
  id: string;
  name: string;
  description?: string;
  imageUrl: string;
  musics?: IMusicModel[];
}
