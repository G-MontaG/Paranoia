import {Moment} from 'moment';
export interface fileInfo {
  name: string,
  fullPath: string,
  type: string,
  extension: string,
  size: string,
  accessTime: Moment,
  modifyTime: Moment,
  createTime: Moment
}