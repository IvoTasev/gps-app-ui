import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core"
import { MatTableModule } from "@angular/material/table";
import { DeviceTableModule } from "../device-table/device-table.module";
import { DeviceFclComponent } from "./device-fcl-page.component";
import { NgApexchartsModule } from "ng-apexcharts";
import { CustomTableModule } from "../custom-table/custom-table.module";

@NgModule({
    imports: [CommonModule, MatTableModule, DeviceTableModule, CustomTableModule, NgApexchartsModule],
    declarations: [DeviceFclComponent],
    exports: [DeviceFclComponent],
    schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class DeviceFclModule { }