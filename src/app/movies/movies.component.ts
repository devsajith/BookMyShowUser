import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {


  constructor(private service: DataService, private router: Router) { }

  movie: any
  theatre: any
  cdate: any
  tdate: any
  datomo: any
  crdate: any
  datomod: any
  time: any
  seats: any
  dat: any
  movId: any
  searchMovie: any = ''
  showSpinner: boolean = false;
  searchM:any



  ngOnInit(): void {




    this.listMovies();
    //  this.listMoviesSearch();
  }

  searchForm = new FormGroup({
    searchs: new FormControl('')
  })



  search() {
    this.searchMovie = "var";
    this.listMoviesSearch();
  }

  listMoviesSearch() {

    this.searchM = this.searchForm.controls['searchs'].value


    let queryParam = new HttpParams()
      .append('movie', this.searchM );

    this.service.listMoviesSearch(queryParam).subscribe({
      next: (result: any) => {
        console.log(result);
        this.movie = result
      }, error: (err: any) => {
        console.log(err);
      }

    })
  }

  listMovies() {
    this.service.listMovie().subscribe({
      next: (result: any) => {
        console.log(result);
        this.movie = result
      }, error: (err: any) => {
        console.log(err);
      }

    })
  }

  detailView(mid: any) {

    // let id = localStorage.getItem('id')
    // console.log("id",id);


    this.service.movieDetails(mid).subscribe({
      next: (result: any) => {
        this.movie = result
        console.log("result", result);
      }
    })
  }





  movieTheatre(movieId: any) {
    console.log("m", movieId);
    this.movId = movieId;

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
    this.dat = v

  }


  timeSubmit(times: any) {
    console.log("time", times)
    this.time = times
  }

  seat(seat: any) {
    console.log("seat", seat);
    this.seats = seat
  }

  booknow(theatreId: any) {
    this.showSpinner=true  

    let orders = {
      slot: this.time,
      seat: this.seats,
      pass: this.dat,
      theatreId: theatreId,
      movieId: this.movId


    }
    console.log("order", this.movie.movieId);

    this.service.book(orders).subscribe({
      next: (response: any) => {
        console.log(response);
        this.showSpinner = false

        // alert("Successfully Added")
        this.router.navigate(['ending'])
      },
      error: (response: any) => {
        console.log(response)
        this.showSpinner = false
      }

    });
}


}
