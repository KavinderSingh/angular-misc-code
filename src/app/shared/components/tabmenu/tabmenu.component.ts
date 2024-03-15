import { Component, Input, ViewChild } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { MenuItem } from "primeng/api";
import { TabMenu } from "primeng/tabmenu";
import { filter, startWith } from "rxjs";

@Component({
  selector: "app-tabmenu",
  templateUrl: "./tabmenu.component.html",
  styleUrls: ["./tabmenu.component.scss"],
})
export class TabMenuComponent {
  @ViewChild(TabMenu) tabMenu!: TabMenu;
  @Input() items: MenuItem[] | undefined;
  @Input({ required: true }) baseUrl: string | undefined;
  count = 12;

  activeItem: MenuItem | undefined;

  ngOnInit() {
    const activeTabName = decodeURI(this._router.url).split("/").slice(-1)[0];

    let activeTabIndex = this.items?.findIndex(
      (tab) => tab.label == activeTabName
    );
    if (activeTabIndex == undefined || activeTabIndex == -1) {
      activeTabIndex = 0;
    }
    this.activeItem = this.items![activeTabIndex];
    this._router.navigateByUrl(
      `/${this.baseUrl}/${this.items![activeTabIndex].label}`
    );
  }

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _router: Router
  ) {}

  loadUrl(event: any): void {
    let currentSegment;
    this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        startWith(this._router)
      )
      .subscribe((event: any) => {
        const segments = event.url.split("/");
        currentSegment = segments[segments.length - 1];
      });
    
    this._router.navigate([`/${this.baseUrl}/`, event.label]);
  }
}