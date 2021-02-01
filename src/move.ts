import { Folder } from './Folder';
import { File } from './File';
import deepCopy from "./deepCopy";

// Please update this type as same as with the data shape.
type List = Folder[];

export default function move(list: List, source: string, destination: string): List {
  let expectedFile: File | undefined;
  let expectedFolder: Folder | undefined;

  const copied = deepCopy(list);

  copied.forEach((folder) => {
    if (folder.id === source) {
      throw new Error('You cannot move a folder');
    }
    if (folder.id === destination) {
      expectedFolder = folder;
    }

    const index = folder.files.findIndex((f) => {
      if (f.id === destination) {
        throw new Error('You cannot specify a file as the destination');
      }
      return f.id === source;
    });
    if (index > -1) {
      const [file] = folder.files.splice(index, 1);
      expectedFile = file;
    }
  });
  if (expectedFile && expectedFolder) {
    expectedFolder.files.push(expectedFile);
  }

  return copied;
}
