import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  path;
 animation = document.querySelector('#moveTheWave');
 m = 0.512286623256592433;

  constructor() { }

  ngOnInit() {
    
    this.path = document.querySelector('#wave');
    this.buildWave(90, 60);
    
  }

   

buildWave(w, h) {
  
  const a = h / 4;
  const y = h / 2;
  
  const pathData = [
    'M', w * 0, y + a / 2, 
    'c', 
      a * this.m, 0,
      -(1 - a) * this.m, -a, 
      a, -a,
    's', 
      -(1 - a) * this.m, a,
      a, a,
    's', 
      -(1 - a) * this.m, -a,
      a, -a,
    's', 
      -(1 - a) * this.m, a,
      a, a,
    's', 
      -(1 - a) * this.m, -a,
      a, -a,
    
    's', 
      -(1 - a) * this.m, a,
      a, a,
    's', 
      -(1 - a) * this.m, -a,
      a, -a,
    's', 
      -(1 - a) * this.m, a,
      a, a,
    's', 
      -(1 - a) * this.m, -a,
      a, -a,
    's', 
      -(1 - a) * this.m, a,
      a, a,
    's', 
      -(1 - a) * this.m, -a,
      a, -a,
    's', 
      -(1 - a) * this.m, a,
      a, a,
    's', 
      -(1 - a) * this.m, -a,
      a, -a,
    's', 
      -(1 - a) * this.m, a,
      a, a,
    's', 
      -(1 - a) * this.m, -a,
      a, -a
  ].join(' ');
  
  this.path.setAttribute('d', pathData);
}


}
