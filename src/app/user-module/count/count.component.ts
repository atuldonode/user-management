import { Component, ElementRef, QueryList, ViewChildren, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.scss']
})
export class CountComponent implements AfterViewInit {
  @ViewChildren('countSpan') countSpans!: QueryList<ElementRef>;
  
  ngAfterViewInit() {
    let speed = 200;
    this.countSpans.forEach(span => {
      let currentValue = +span.nativeElement.getAttribute('data-count');
      let initialValue = +span.nativeElement.innerText;
      let new_increment = Math.floor(currentValue/speed)
      const update = () => {
        initialValue = initialValue + new_increment
        span.nativeElement.innerText = initialValue;
        if (initialValue < currentValue ) {
          setTimeout(() => {update() }, 5);
        }
      };
      update(); // Start updating the count
    });
  }
}
