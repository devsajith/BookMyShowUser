import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  API_URL = "http://localhost:8080/";


  constructor(private http: HttpClient, private router: Router) { }

  login(data: any) {
   return this.http.post(`${this.API_URL}login`, data.value)
  }

  listMoviesSearch(queryParam:any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Contacts ' + localStorage.getItem('accessToken')
      })
    }
    let accessToken= 'Contacts ' + localStorage.getItem('accessToken')

    return this.http.get(`${this.API_URL}movies/moviesearch`, { params: queryParam, "headers": { "Content-Type": "application/json", "Authorization": accessToken } })
  }

  listMovie() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Contacts ' + localStorage.getItem('accessToken')
      })
    }
    return this.http.get(`${this.API_URL}movies/mov`, httpOptions)
  }
  movieDetails(id: any) {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization':'Contacts ' +localStorage.getItem('accessToken')
   })
    }
    return this.http.get(`${this.API_URL}movies/` + id, httpOptions)
  }
  movieTheatre(movieId:any){
    const httpOptions ={
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Contacts ' + localStorage.getItem('accessToken')
      
      })
   }
   return this.http.get(`${this.API_URL}theatres/movie/` + movieId, httpOptions)

}
book(orders:any){
  const httpOptions ={
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Contacts ' + localStorage.getItem('accessToken')
    
    })
  }
  return this.http.post(`${this.API_URL}orders`, orders, httpOptions)
}
registration(data:any){

  this.http.post(`${this.API_URL}users`, data.value).subscribe({
    next: (response: any) => {
      // alert("Successfully Registerd")
      this.router.navigate([''])
      
    },
    error: (error: any) => {
      console.log(error)


      if (error.error.status == 400) {

        if (error.error.message == "400 BAD_REQUEST") {
          alert("INVALID DATA")
        }
        else {
          alert("Invalid Credentials")
        }
      }
      else {
        alert("Invalid  Password")
      }
    }
  });

}




history(){
  let id=  localStorage.getItem('id')
  console.log("id",id);
  

  const httpOptions ={
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Contacts ' + localStorage.getItem('accessToken')
    
    })
  }
  return this.http.get(`${this.API_URL}orders/user/`+id, httpOptions)
}

}
