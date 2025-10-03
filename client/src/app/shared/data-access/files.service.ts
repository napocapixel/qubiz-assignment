import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileInfo } from '../models/file-info.model';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:3000/api';

  getFiles(path: string): Observable<FileInfo[]> {
    const params = new HttpParams().set('path', path);
    return this.http.get<FileInfo[]>(`${this.apiUrl}/files`, { params });
  }

  getFileInfo(path: string): Observable<FileInfo> {
    const params = new HttpParams().set('path', path);
    return this.http.get<FileInfo>(`${this.apiUrl}/file`, { params });
  }
}
