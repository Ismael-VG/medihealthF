import { Component, HostListener} from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  title = "MediHealth";
  
  constructor(
    private authSrv: AuthService
  ) {

  }

  @HostListener("window:beforeunload", ["$event"]) unloadHandler() {
    this.authSrv.logout();
  }
}
