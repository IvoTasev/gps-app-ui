import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Device } from 'src/models/device';
import { DeviceData } from 'src/models/device-data';
import { RequestUtil } from 'src/utils/request-util';


@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  constructor(private requestUtil: RequestUtil) { }

  public getDevices(page: number = 1): Observable<Device[]> {
    return this.requestUtil.getDevices(page);
  }

  public getDeviceData(deviceId: string, page: number = 0): Observable<DeviceData[]> {
    return this.requestUtil.getDeviceData(deviceId, page);
  }
}
