import { Pipe, PipeTransform } from "@angular/core";
import { FileType } from "../enums/file-type.enum";
import { FileInfo } from "../models/file-info.model";

@Pipe({
    name: 'fileType'
})
export class FileTypePipe implements PipeTransform {
    transform(items: FileInfo[], fieldType: FileType): FileInfo[] {
        return items.filter(item => item.type === fieldType);
    }
}
