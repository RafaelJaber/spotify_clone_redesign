import { IMusicModel } from './IMusic.model';

export interface IPlaylistModel {
  id: string;
  name: string;
  description?: string | null;
  imageUrl: string;
  musics?: IMusicModel[];
}
