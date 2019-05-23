import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { AlertController } from '@ionic/angular';
import { ApplicationRef, ChangeDetectorRef } from '@angular/core';
declare var require: any;
var groupArray = require('group-array');
// import {groupArray} from 'group-array';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  data = [{
    "name": "n1",
    "country": "USA",
    "budget": 149,
    "goal": "Awareness",
    "category": "Technology"
  }, {
    "name": "n2",
    "country": "USA",
    "budget": 149,
    "goal": "Awareness",
    "category": "Sports"
  }, {
    "name": "n3",
    "country": "EGY",
    "budget": 349,
    "goal": "Awareness",
    "category": "Technology"
  }, {
    "name": "n4",
    "country": "USA",
    "budget": 249,
    "goal": "Awareness",
    "category": "Sports"
  }, {
    "name": "n5",
    "country": "USA",
    "budget": 349,
    "goal": "Conversion",
    "category": "Sports"
  }];
  @ViewChild('barCanvas') barCanvas;
  barChart;
  xdimensionoptions = ['category', 'country', 'goal', 'name'];
  ydimensionoptions = ['category', 'country', 'goal', 'name'];
  options = ['category', 'country', 'goal', 'name'];
  chartform = { 'xdimension': '', 'ydimension': '' };
  colors = ['red', 'green', 'blue', 'yellow'];
  dimensions = { 'x-axis': 'country', 'y-axis': 'budget' };
  datalabels = [];
  datavalues = [];
  datasets = [];
  constructor(public alertController: AlertController, private app: ApplicationRef,
  private changedetector: ChangeDetectorRef) { }

  /**
   * Get parameters values to generate the required chart
   */
  submit() {
    if (!this.chartform['xdimension'] || !this.chartform['ydimension']) {
      this.presentAlert();
      return;
    }
    this.dimensions['x-axis'] = this.chartform['xdimension'].trim();
    this.dimensions['y-axis'] = this.chartform['ydimension'].trim();
    this.set_data();
    this.draw_chart();
  }

  /**
   * Render data labels and data values
   * group data by selected x-axis dimension to show totals
   */
  set_data() {
    this.datavalues = [];
    this.datalabels = [];
    let grouping = groupArray(this.data, this.dimensions['x-axis']);
    this.datasets = [];
    let subgroup_datasets = {};
    for (let g in grouping) {
      this.datalabels.push(g);
      let totalgroup = 0;
      let subgroups = groupArray(grouping[g], this.dimensions['y-axis']);
      for (let subgroup in subgroups) {
        if (subgroup_datasets[subgroup]) {
          subgroup_datasets[subgroup].push(subgroups[subgroup].length);
        }
        else {
          subgroup_datasets[subgroup] = [subgroups[subgroup].length];
        }
      }
      this.datavalues.push(totalgroup);
    }

    let counter = 0;
    for (let subgroup in subgroup_datasets) {
      if (counter > 3)
        counter = 0;
      counter += 1;
      this.datasets.push({
        label: subgroup,
        data: subgroup_datasets[subgroup],
        backgroundColor: this.colors[counter],
        borderWidth: 1
      });
    }
  }

  /**
   * Draw bar chart to represent data according to user's choice
   */
  draw_chart() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.datalabels,
        datasets: this.datasets,
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  /**
   * Show error message to the user
   */
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Please select X-axis and Y-axis dimensions',
      cssClass: 'alertCustomCss',
      buttons: ['OK']
    });
    await alert.present();
  }


  /**
   * Remove selected dimension from the other dimensions options
   */
  change_dimension_options(dimension) {
    if (dimension == 'xdimension') {
     this.ydimensionoptions = this.options.filter(l => l != this.chartform[dimension].trim());
      this.chartform['ydimension'] = '';
    }
  }
}

