import { DeviceType } from "./device-type"

export class Device {

    id: string = "";
    deviceType: DeviceType = DeviceType.Aircraft;
    latestDataDate: string = "";
    latestDataLocation: string = "";
    currentPage: number = 1;
    pages: number = 1;
    visible: boolean = true;

}