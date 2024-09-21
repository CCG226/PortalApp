import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { EventService } from '../SERVICES/event.service';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

  constructor(private eventService: EventService, private route: ActivatedRoute, private router: Router) { }

  isExpanded = false;

  curPage: string = "/";
  ngOnInit() {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
    
      this.UpdateNavBar(this.router.url);
    });

  
  }
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  InviteUser() {
    this.eventService.sendRegisterEvent();
  }
  private UpdateNavBar(url:string) {
    this.curPage = url;
    console.log(this.curPage);
  }

}
