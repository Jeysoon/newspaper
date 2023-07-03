import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private appService: AppService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {}
  title = 'newspaper';
  currentRoute = '';
  ngOnInit(): void {
    this.appService.currentRoute$.subscribe((route) => {
      setTimeout(() => {
        this.currentRoute = route;
        this.changeDetectorRef.detectChanges(); // Manually trigger change detection
      });
    });
  }
  navigateTo() {
    if (this.currentRoute === '/blackwhite') {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['blackwhite']);
    }
  }
}
