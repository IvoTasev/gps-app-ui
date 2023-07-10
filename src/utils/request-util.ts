import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Device } from 'src/models/device';
import { DeviceData } from 'src/models/device-data';

@Injectable({
  providedIn: 'root'
})
export class RequestUtil {

  constructor(private http : HttpClient) { }

  private apiUrl: string = "https://localhost:7036/api";

  public getDevices(page: number = 1): Observable<Device[]> {
    return this.http.get<Device[]>(`${this.apiUrl}/devices?page=${page}`);
  }

  public getDeviceData(deviceId: string, page: number = 0): Observable<DeviceData[]> {
    return this.http.get<DeviceData[]>(`${this.apiUrl}/devices/${deviceId}/data?page=${page}`);
  }
}
