import { Component, EventEmitter, Output } from "@angular/core";
import { Device } from "src/models/device";
import { DevicesService } from "src/services/devices.service";

@Component({
    selector: 'device-table',
    templateUrl: './device-table.component.html',
    styleUrls: ['./device-table.component.css']
})

export class DeviceTableComponent {
    title: string = "Devices"
    devices: Device[] = [];
    currentPage: number = 1;
    pages: number = 0;
    columns: string[] = ["Device ID", "Device Type", "Latest Data Location", "Latest Data Date"];
    devicePropertiesToDisplay: any[] = ["id", "deviceType", "latestDataLocation", "latestDataDate"]
    sortingData: any[] = [{ name: "Device ID", selected: true }, { name: "Device Type", selected: false }, { name: "Latest Data Location", selected: false }, { name: "Latest Data Date", selected: false }];
    filterData: any = { deviceId: "", deviceType: "" };

    @Output() onItemNavigation = new EventEmitter();

    constructor(private deviceService: DevicesService) { }

    ngOnInit(): void {
        this.onPageChange(this.currentPage);
    }

    onPageChange(page: number): void {
        this.refreshModel(page);
    }

    refreshModel(page: number): void {
        this.deviceService.getDevices(page).subscribe((res: Device[]) => {
            res.forEach(d => {
                d.latestDataDate = new Date(d.latestDataDate).toLocaleString();
                d.visible = true;
            })
            this.devices = res
            this.currentPage = res[0].currentPage;
            this.pages = res[0].pages;

            this.applyFilters();
        });
    }

    onItemClick(item: any): void {
        this.onItemNavigation.emit(item);
    }

    applySorting(event: any): void {
        let sortBy = event.detail.sortBy;
        let sortOrder = event.detail.sortOrder;

        switch (sortBy) {
            case "Device ID": {
                if (sortOrder === "Descending") this.devices.sort((a, b) => b.id.localeCompare(a.id));
                else this.devices.sort((a, b) => a.id.localeCompare(b.id));
                break;
            }
            case "Device Type": {
                if (sortOrder === "Descending") this.devices.sort((a, b) => b.deviceType.toString().localeCompare(a.deviceType.toString()));
                else this.devices.sort((a, b) => a.deviceType.toString().localeCompare(b.deviceType.toString()));
                break;
            }
            case "Latest Data Location": {
                if (sortOrder === "Descending") this.devices.sort((a, b) => b.latestDataLocation.localeCompare(a.latestDataLocation));
                else this.devices.sort((a, b) => a.latestDataLocation.localeCompare(b.latestDataLocation));
                break;
            }
            case "Latest Data Date": {
                if (sortOrder === "Descending") this.devices.sort((a, b) => new Date(b.latestDataDate).getTime() - new Date(a.latestDataDate).getTime());
                else this.devices.sort((a, b) => new Date(a.latestDataDate).getTime() - new Date(b.latestDataDate).getTime());
                break;
            }
        }
    }

    onDeviceIdLookup(event: any): void {
        let deviceId = event.srcElement.typedInValue.toLowerCase();

        this.filterData.deviceId = deviceId;
        this.applyFilters();

    }

    onDeviceTypeLookup(event: any): void {
        let deviceType = event.srcElement.typedInValue;

        this.filterData.deviceType = deviceType;
        this.applyFilters();
    }

    applyFilters(): void {
        let deviceId = this.filterData.deviceId;
        let deviceType = this.filterData.deviceType;
        
        this.devices.forEach(d => {
            if ((d.id.toLowerCase().includes(deviceId) && d.deviceType.toString().toLowerCase().includes(deviceType))) { d.visible = true }
            else d.visible = false;
        });
    }

}