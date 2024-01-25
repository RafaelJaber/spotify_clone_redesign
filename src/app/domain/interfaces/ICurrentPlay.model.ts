import { IMusicModel } from './IMusic.model';

export interface ICurrentPlayModel {
  isPlaying: boolean | null;
  music: IMusicModel;
}
