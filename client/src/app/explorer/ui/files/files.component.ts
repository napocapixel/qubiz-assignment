import { Component, inject, input, output } from "@angular/core";
import { FileInfo } from "../../../shared/models/file-info.model";
import { FileTypePipe } from "../../../shared/pipes/file-type.pipe";
import { DatePipe } from "@angular/common";
import { FileType } from "../../../shared/enums/file-type.enum";
import { Router } from "@angular/router";

@Component({
    selector: 'app-files',
    templateUrl: './files.component.html',
    styleUrls: ['./files.component.scss'],
    imports: [
        FileTypePipe,
        DatePipe,
    ]
})
export class FilesComponent {
    private router = inject(Router);

    files = input<FileInfo[]>([]);
    pathSelected = output<string>();
    fileTypeEnum = FileType;

    navigateToDetails(path: string) {
        this.router.navigate(['/details'], { queryParams: { path: encodeURIComponent(path) } });
    }
}