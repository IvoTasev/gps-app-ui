import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";

import "@ui5/webcomponents/dist/Table";
import "@ui5/webcomponents/dist/TableCell";
import "@ui5/webcomponents/dist/TableColumn";
import "@ui5/webcomponents/dist/TableRow";
import "@ui5/webcomponents/dist/Title";
import "@ui5/webcomponents/dist/Button";
import "@ui5/webcomponents/dist/Input";
import "@ui5/webcomponents-fiori/dist/Bar"
import "@ui5/webcomponents-fiori/dist/ViewSettingsDialog"
import "@ui5/webcomponents-fiori/dist/SortItem"
import "@ui5/webcomponents-fiori/dist/FilterItem"
import "@ui5/webcomponents-icons/dist/AllIcons"
import ViewSettingsDialog from "@ui5/webcomponents-fiori/dist/ViewSettingsDialog";
import Table from "@ui5/webcomponents/dist/Table";

@Component({
    selector: 'custom-table',
    templateUrl: './custom-table.component.html',
    styleUrls: ['./custom-table.component.css']
})

export class CustomTableComponent {
    @Input()
    items!: any[];
    @Input()
    itemProperties!: string[];
    @Input()
    title!: string;
    @Input()
    columns!: string[];
    @Input()
    currentPage!: number;
    @Input()
    pages!: number;
    @Input()
    sortingData!: any[];
    @Input()
    isFirstFilterEnabled: boolean = true;
    @Input()
    isSecondFilterEnabled: boolean = true;
    @Output() onPageChange = new EventEmitter();
    @Output() applySorting = new EventEmitter();
    @Output() onFirstColumnLookup = new EventEmitter();
    @Output() onSecondColumnLookup = new EventEmitter();
    @Output() onItemClick = new EventEmitter();

    @ViewChild("sortingDialog") sortingDialog: ElementRef<ViewSettingsDialog> | undefined;
    @ViewChild("customTable") customTable: ElementRef<Table> | undefined;

    constructor() { }

    ngOnInit(): void {

    }

    openSortingDialog(): void {
        this.sortingDialog?.nativeElement.show();
    }

    onItemSelect(item: any): void {
        this.onItemClick.emit(item);
    }

}