import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  constructor(private httpClient : HttpClient) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.getData();

  }

  getData() {

    // send request 20 times to see the new_access_token in the header


      // this.httpClient.get('http://localhost:8080/api/v1/demo-controller',{
      //   responseType: 'text' as const,
      // }).subscribe((data) => {
      //   console.log(data);
      // });

      // wait for 60 seconds to see the new_access_token in the header
      setTimeout(() => {
        this.httpClient.get('http://localhost:8080/api/v1/demo-controller',{
          responseType: 'text' as const,
        })
        .subscribe((data) => {
          console.log(data);
        })
      }, 60000); // 60 seconds


  }
}


