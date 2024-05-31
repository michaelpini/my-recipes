import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Observer, Subscription, filter, interval, map } from 'rxjs';
import { crapService } from './crap-service';


// // Define the Observable
// const obs1 = new Observable((observer: Observer<string>) => {
//   observer.next('ok')                   // execute once new data is available
//   observer.error('an Error occurred')   // execute on error -> kills further execution
//   observer.complete();                  // execute once no more data is expected
// })

// // Subscribe
// const subscriber1: Subscription = obs1.subscribe(
//   (str) => {console.log(str)}
// )

// // Subscribe with options
// const subscriber2: Subscription = obs1.subscribe({
//   next: (str) => {console.log(str)},      // executed on next
//   error: (err) => console.log(err),       // called on error
//   complete: () => console.log('done')     // called on complete
// })

// // Unsubscribe
// subscriber1.unsubscribe();

// // Unsubscribe 2 when 1 gets unsubscribed
// subscriber1.add(subscriber2)
  


@Component({
  selector: 'crap',
  templateUrl: './crap.component.html'
})
export class CrapComponent implements OnInit, OnDestroy {
  counterSlowSub: Subscription;
  counterFastSub: Subscription;
  rxCounterObservable: Observable<number>
  myCounterObservable: Observable<number>;
  constructor(
    private crapService: crapService,
  ) {}

  ngOnInit(): void {
    // rxJs Interval
    this.rxCounterObservable = interval(250);

    // custom Interval
    this.myCounterObservable = new Observable((observer: Observer<number>) => {
      let count = 0;
      window.setInterval(() => {
        try {
          count++;
          observer.next(count)
          if (count === 10) observer.complete()     // -> cancels observer
          if (count === 5) throw new Error('> 10')  // -> does not cancel observer
        } catch(err) {
          observer.error(new Error('= 10'))         // -> cancels observer
        }
      }, 1000)
    }) 
          
    // Subscribing slow and fast counter
    this.counterSlowSub = this.myCounterObservable.subscribe( {
      next: (p) => console.warn('count slow: ' + p),
      error: (err) => console.error(err),
      complete: () => console.warn('completed')
    } )
    
    // Using pipe to transform the data
    this.counterFastSub = this.rxCounterObservable
      .pipe(                            // pipe takes operators as argument:
        filter(p => p % 2 === 0),       // filter even numbers
        map(p => 'count fast: ' + p)    // transform to string
      )
      .subscribe(p => console.log(p))

    // Adding the fast subsscription to the slow, so both get cancelled on unsubscribe
    this.counterSlowSub.add(this.counterFastSub)

  }

  ngOnDestroy(): void {
    // Unsubscribe slow counter (includes fast counter) 
   this.counterSlowSub.unsubscribe();
  }

  onActivateChild() {
    this.crapService.crapSubject.next(true);
  }


 }

