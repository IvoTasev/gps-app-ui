import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, ViewChild } from '@angular/core';

import "@ui5/webcomponents-fiori/dist/FlexibleColumnLayout";
import FlexibleColumnLayout from '@ui5/webcomponents-fiori/dist/FlexibleColumnLayout';
import FCLLayout from '@ui5/webcomponents-fiori/dist/types/FCLLayout';
import { ApexChart, ApexNonAxisChartSeries, ApexResponsive, ChartComponent } from 'ng-apexcharts';
import { Device } from 'src/models/device';
import { DeviceData } from 'src/models/device-data';
import { DevicesService } from 'src/services/devices.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'device-fcl',
  templateUrl: './device-fcl-page.component.html',
  styleUrls: ['./device-fcl-page.component.css']
})

export class DeviceFclComponent {
  @ViewChild("fcl") fcl!: ElementRef<FlexibleColumnLayout>;
  chartOptions: ChartOptions;

  currentPage: number = 1;
  pages: number = 1;
  title = "Data"
  columns: string[] = ["Location", "Date"];
  dataPropertiesToDisplay: any[] = ["location", "date"]
  sortingData: any[] = [{ name: "Location", selected: true }, { name: "Date", selected: false }];
  filterData: any = { location: "" };

  data: DeviceData[] = [];
  device?: Device;
  layout: string = FCLLayout.TwoColumnsMidExpanded;

  constructor(private deviceService: DevicesService) {
    this.chartOptions = {
      series: [1, 1, 1, 1, 1],
      chart: {
        width: 380,
        type: "pie"
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  ngOnInit(): void {

  }

  navigateToDevice(event: any): void {
    this.updateSelectedItem(event);
  }

  applySorting(event: any): void {
    let sortBy = event.detail.sortBy;
    let sortOrder = event.detail.sortOrder;

    switch (sortBy) {
      case "Location": {
        if (sortOrder === "Descending") this.data.sort((a, b) => b.id.localeCompare(a.id));
        else this.data.sort((a, b) => a.id.localeCompare(b.id));
        break;
      }
      case "Date": {
        if (sortOrder === "Descending") this.data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        else this.data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      }
    }
  }

  onLocationLookup(event: any): void {
    let location = event.srcElement.typedInValue.toLowerCase();

    this.filterData.location = location;
    this.applyFilters();
  }

  applyFilters(): void {
    let location = this.filterData.location;

    this.data.forEach(d => {
      if ((d.location.toLowerCase().includes(location))) { d.visible = true }
      else d.visible = false;
    });
  }


  updateSelectedItem(item: Device) {
    let device = new Device();
    device.id = item.id;
    device.deviceType = item.deviceType;
    this.device = device;

    this.deviceService.getDeviceData(item.id).subscribe((res: DeviceData[]) => {
      res.forEach(d => {
        d.date = new Date(d.date).toLocaleString();
        d.visible = true;
      })
      this.data = res;

      this.calculateChartData();

      this.fcl.nativeElement.layout = FCLLayout.TwoColumnsMidExpanded
      this.layout = this.setLayout("col1");
    });

  }

  calculateChartData() {
    let locations: Map<string, number> = new Map();

    let entryPercentage = (100 / this.data.length)
    this.data.forEach(d => {
      let locationPercentage = locations.get(d.location);
      if (locationPercentage) {
        locations.set(d.location, locationPercentage += entryPercentage);
      } else locations.set(d.location, entryPercentage);
    })
    this.chartOptions = { ...this.chartOptions, ...{ labels: [...locations.keys()] } }
    this.chartOptions = { ...this.chartOptions, ...{ series: [...locations.values()] } }
  }

  setLayout(target: string): string {
    if (target === "col1") {
      return "TwoColumnsMidExpanded";
    }
    return "OneColumn";
  }

}
