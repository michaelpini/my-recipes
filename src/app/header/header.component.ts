import { Component } from '@angular/core';
import { LoggingService } from '../shared/logging.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  // providers: [LoggingService]
})
export class HeaderComponent {
  collapsed = true;
  path: string = 'recipies';

  constructor(private loggingService: LoggingService) { }

  onShowLogs() {
    this.loggingService.showAllLogs();
  }

}
