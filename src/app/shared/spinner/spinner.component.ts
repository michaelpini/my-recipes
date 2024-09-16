import {AfterViewInit, Component, ElementRef, Input, ViewChild} from "@angular/core";

@Component({
    selector: "spinner",
    templateUrl: './spinner.component.html',
    styleUrl: 'spinner.component.scss',
})
export class SpinnerComponent implements AfterViewInit {
    private dialog: HTMLDialogElement;
    @ViewChild('dialog', { static: false }) dialogRef: ElementRef;
    @Input() set open(value: boolean){
        if (!this.dialog) return;
        if (value) {
            this.dialog.showModal();
        } else {
            this.dialog.close();
        }
    }

    ngAfterViewInit(): void {
        this.dialog = this.dialogRef.nativeElement;
    }


}
