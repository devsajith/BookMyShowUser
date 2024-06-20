import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  history: any;

  constructor(private service:DataService) { }

  ngOnInit(): void {
    this.service.history().subscribe({
      next:(result:any) =>{
        this.history=result;
        console.log("hist",this.history);
        
        
        
      }
    })
  }

}
