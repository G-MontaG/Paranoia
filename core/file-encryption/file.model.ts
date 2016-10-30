import moment = require("moment");
import Moment = moment.Moment;
export interface FileListItem {
  name: string,
  fullPath: string,
  path: string,
  type: string,
  extension: string,
  size: string,
  accessTime: Moment,
  modifyTime: Moment,
  createTime: Moment
}