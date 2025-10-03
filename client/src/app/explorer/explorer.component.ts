import { Component, computed, inject, signal } from "@angular/core";
import { FilesService } from "../shared/data-access/files.service";
import { ExplorerFormComponent } from "./ui/explorer-form/explorer-form.component";
import { FileInfo } from "../shared/models/file-info.model";
import { catchError, filter, Observable, of, switchMap, tap } from "rxjs";
import { AsyncPipe } from "@angular/common";
import { FileTypePipe } from "../shared/pipes/file-type.pipe";
import { FileType } from "../shared/enums/file-type.enum";
import { toObservable } from "@angular/core/rxjs-interop";
import { BreadcrumbComponent } from "./ui/breadcrumb/breadcrumb.component";

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss'],
  imports: [
    ExplorerFormComponent,
    BreadcrumbComponent,
    AsyncPipe,
    FileTypePipe
  ]
})
export default class ExplorerComponent {

    private filesService = inject(FilesService);

    searchText = signal<string>('');
    breadcrumbs = computed(() => this.searchText().length > 0 ? this.searchText().split('\\').map((name, index, array) => ({
        name,
        path: array.slice(0, index + 1).join('\\')
    })) : []);
    errorMessage: string = '';
    fileTypeEnum = FileType;

    files$: Observable<FileInfo[]> = toObservable(this.searchText).pipe(
        tap((_) => this.errorMessage = ''),
        filter((searchText: string) => searchText.length > 0),
        switchMap((searchText: string) => 
            this.filesService.getFiles(searchText).pipe(
                catchError((err) => {
                    this.errorMessage = err.error?.error || err.message;
                    return of([]);
                })
            )
        )
    );
}