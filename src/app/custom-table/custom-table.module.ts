import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core"
import { MatTableModule } from "@angular/material/table";
import { CustomTableComponent } from "./custom-table.component";

@NgModule({
    imports: [CommonModule, MatTableModule],
    declarations: [CustomTableComponent],
    exports: [CustomTableComponent],
    schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class CustomTableModule { }