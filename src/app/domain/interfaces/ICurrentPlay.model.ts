import { IMusicModel } from './IMusic.model';

export interface ICurrentPlayModel {
  isPlaying: boolean | null;
  music: IMusicModel;
  context?: 'artist' | 'playlist' | 'album';
  contextUri?: string | null;
  progressMilliseconds?: number | null;
}
