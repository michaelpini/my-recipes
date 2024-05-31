import { Component, OnInit } from "@angular/core";
import { crapService } from "../crap-service";
import { map } from "rxjs";

@Component({
    selector: 'crap-child',
    templateUrl: './crap-child.component.html'
})
export class CrapChildComponent implements OnInit{
    isActive = false;
    constructor( private crapService: crapService ) { }

    ngOnInit(): void {
        this.crapService.crapSubject
            .pipe(map(x => x))
            .subscribe(p => this.isActive = !this.isActive)
    }
    
    

 }