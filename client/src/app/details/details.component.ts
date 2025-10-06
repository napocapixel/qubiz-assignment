import { Component, inject, signal } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FileInfo } from "../shared/models/file-info.model";
import { FilesService } from "../shared/data-access/files.service";
import { catchError, switchMap, tap } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { toObservable } from "@angular/core/rxjs-interop";
import { AsyncPipe, DatePipe } from "@angular/common";
import { FileSizePipe } from "../shared/pipes/file-size.pipe";

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
    imports: [
        AsyncPipe,
        FileSizePipe,
        DatePipe
    ]
})
export default class DetailsComponent {
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    private filesService = inject(FilesService);

    path = signal<string>('');
    errorMessage = signal<string>('');
    fileInfo$: Observable<FileInfo> = toObservable(this.path).pipe(
        tap((_: string) => this.errorMessage.set('')),
        switchMap((path: string) => this.filesService.getFileInfo(path).pipe(
            catchError((err) => {
                this.errorMessage.set(err.error?.error || err.message);
                return of({} as FileInfo);
            })
        ))
    );

    ngOnInit() {
        this.route.queryParams.subscribe((params) => {
            this.path.set(decodeURIComponent(params['path']));
        });
    }

    goBack() {
        this.router.navigate(['/explorer']);
    }
}