import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { CampaignService } from '../campaign.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  
  budgetdimensionoptions = ['139', '399', '999'];

  campaign = { 'name': '', 'budget': 0, 'country': '', 'category': null, 'goal': '' }; // create a model
  constructor(private toastController: ToastController,
    public campaignService:CampaignService ) { }

  ngOnInit() {
    this.reset_campaign();
  }
  /**
   * Render an error message to user
   */
  async presentToast(error_msg, status) {
    const toast = await this.toastController.create({
      message: error_msg,
      duration: 2000,
      color: status
    });
    toast.present();
  }
  /**
   * Reset campaign input fields when loading the page or when successfully added a campaign.
   */
  reset_campaign(){
    this.campaign = { 'name': '', 'budget': 0, 'country': '', 'category': null, 'goal': '' };
  }
  /**Validate all fields are filled with data */
  validate() {
    let error_msg = '';
    if (!this.campaign['name'] || !this.campaign['budget'] || !this.campaign['country'] || !this.campaign['goal']) {
      error_msg = 'Please fill in all form fields';
    }
    else if (isNaN((this.campaign['budget']))) {
      error_msg = 'Budget should be a number';
    }
    else if (this.campaign['budget'] <= 0) {
      error_msg = 'Budget should be greater than zero';
    }
    else if (this.campaign['name'] && this.campaign['name'].length > 25) {
      error_msg = 'Name should be less than 25 characters';
    }
    else if (this.campaign['country'] && this.campaign['country'].length > 25) {
      error_msg = 'Country should be less than 25 characters';
    }
    return error_msg;
  }

  /**Handle submit btn clicked to validate data if valid proceed to saving else
   * show an error notification
   */
  submit() {
    let error_msg = this.validate();
    if (error_msg) {
      this.presentToast(error_msg, 'danger');
    }
    else {
      this.save();
    }
  }

  /**
   * Call backend service and pass the campaign object to it 
   * in order to be saved
   */
   save(){
     this.campaignService.add_campaign(this.campaign).subscribe( data =>{
         this.presentToast('Campaign is saved successfully', 'success');
         this.reset_campaign();
     }
     )
   }
}