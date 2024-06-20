import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: DataService) { }

  movie: any
  theatre: any
  cdate: any
  tdate: any
  datomo: any
  crdate: any
  datomod: any
  time:any
  seats:any
  dat:any



  ngOnInit(): void {
    this.detailView();



  }
  detailView() {

    let id = localStorage.getItem('id')
    console.log("id",id);


    this.service.movieDetails(id).subscribe({
      next: (result: any) => {
        this.movie = result
        console.log("result", result);
      }
    })
  }
  

  movieTheatre(movieId: any) {
    console.log("m", movieId);

    this.service.movieTheatre(movieId).subscribe({
      next: (res: any) => {
        this.theatre = res
        console.log("theatres", res);


        const currentDate = new Date();
        this.cdate = currentDate;

        const tomorrow = new Date(currentDate.setDate(currentDate.getDate()));
        this.tdate = tomorrow

        const datom = new Date(tomorrow.setDate(tomorrow.getDate() + 1));
        this.datomo = datom

        const currDate = new Date();
        this.crdate = currentDate;


        const datomd = new Date(tomorrow.setDate(tomorrow.getDate() + 1));
        this.datomod = datom
      }
    })
  }
  dates(v: any) {
    console.log("date", v);
    this.dat=v

  }
  timeSubmit(times: any) {
    console.log("time", times)
    this.time=times
  }

  seat(seat:any){
    console.log("seat",seat);
    this.seats=seat
    

  }
  booknow(theatreId:any){
    let orders={
      slot:this.time,
      seat:this.seats,
      pass:this.dat,
      theatreId:theatreId,
      movieId:this.movie.movieId

    }
      console.log("order",orders);

      this.service.book(orders)
      
   
  }
}
