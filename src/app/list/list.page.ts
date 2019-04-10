import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { Router } from '@angular/router';

 

interface Verb {
  verb: string;
  order: number;
  definition: string;
  irregular: string;
}


@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

	public terms: any; 
  verbs: any;

    descending: boolean = false;
    order: number;
    column: string = 'name';
	
	isSearching = false; 
	 


  constructor(public api: RestApiService,
    public loadingController: LoadingController,
    public router: Router) {   
	}



  ngOnInit() {
    console.log('List page');
    this.getVerbList();

  }
 
	
  async getVerbList() {
    const loading = await this.loadingController.create({
      content: 'Loading'
    });
    await loading.present();
    await this.api.getVerbs()
      .subscribe(res => {
        console.log(res);
        this.verbs = res;
        this.verbs.forEach(v => {
          v['showDetails'] = true;
		  v['searchTerms'] = v.verb + v.definition; 
        });
		this.initVerbList = JSON.parse(JSON.stringify(this.verbs));
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

  showDetail(id) {
    this.router.navigate(['/detail', JSON.stringify(id)]);
  }

  // toggleDetails(data) {
  //   console.log('toggle details', data);
  //   data.showDetails = !data.showDetails;
  // }

    sort() {
        this.descending = !this.descending;
        this.order = this.descending ? 1 : -1;
    }
	
	toggleSearching(e) {
		console.log("toggleSearching", this.isSearching); 
		this.isSearching = !this.isSearching;  
			console.log("setting isSearching = ", this.isSearching); 
		if (!this.isSearching) { 
			this.terms = '';  
			this.verbs = JSON.parse(JSON.stringify(this.initVerbList));
		}
	}
	


  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
