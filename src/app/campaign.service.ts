import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalhostService } from "./localhost.service";
@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(public http: HttpClient,
    public localhostService:LocalhostService) { }

add_campaign(campaign){
  let header = new HttpHeaders();
  header.append('Access-Control-Allow-Origin', '*');
  header.append('withcredentials', 'true');
  header.append('Content-Type','application/json');
  header.append('Accepts','application/json');
  
  console.log("**************----------------------------------***************")
  console.log(header)
  //return this.http.get(this.localhostService.localhost+"api/campaign/get_campaign/",
 //headers :header});
  //}

  return this.http.post(this.localhostService.localhost+"api/campaign/add_campaign/",
{'name':campaign['name'],'country':campaign['country'],'budget':campaign['budget'],
'goal':campaign['goal'],'category':campaign['category']},{ headers : header});
}
}
