import {fileInfo} from './file-info.model';

export interface AbstractFileModel extends fileInfo {
  selected: boolean,
  isSelected(): boolean
  switchSelection()
}