import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/core/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  isLoading: boolean = false;
  constructor(private readonly loaderService: LoaderService) { }

  ngOnInit() : void {
    
    this.loaderService.isLoading.subscribe(isLoading => {      
      this.isLoading = isLoading;
    });
  }

}
