import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core"
import { MatTableModule } from "@angular/material/table";
import { DeviceTableComponent } from "./device-table.component";
import { CustomTableModule } from "../custom-table/custom-table.module";

@NgModule({
    imports: [CommonModule, MatTableModule, CustomTableModule],
    declarations: [DeviceTableComponent],
    exports: [DeviceTableComponent],
    schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class DeviceTableModule { 
    
}