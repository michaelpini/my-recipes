import { Component } from '@angular/core';
import { LoggingService } from './shared/logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: []  
})
export class AppComponent {
  title = 'my-recepies';

  constructor(private loggingService: LoggingService) { }
}
