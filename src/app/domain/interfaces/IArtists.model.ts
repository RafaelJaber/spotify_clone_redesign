import { IMusicModel } from './IMusic.model';

export interface IArtistsModel {
  id: string;
  name: string;
  imageUrl: string;
  musics?: IMusicModel[];
  additionalInfo?: string;
}
