import { Component } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter, startWith } from "rxjs";
import { RouteDisplayName } from "../../enum";

@Component({
  selector: "app-breadcrumb",
  templateUrl: "./breadcrumb.component.html",
  styleUrls: ["./breadcrumb.component.scss"],
})
export class BreadcrumbComponent {
  cleanedUrl!: string;
  segments!: string[];
  constructor(private readonly router: Router) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        startWith(this.router)
      )
      .subscribe((event: any) => {
        
        this.cleanedUrl = decodeURI(router.url);
        this.segments = this.cleanedUrl.split("/");
        this.segments = this.segments.slice(1);
        this.generateSegments();
      });
  }

  generateSegments(): void {
    const changedSegments: string[] = [];

    this.segments.forEach((segment) => {  
      segment = this.getModifiedSegment(segment);
      changedSegments.push(segment);
    });
    this.segments = changedSegments;
  }
  getModifiedSegment(segment: string): string {
    var enumKey = segment as keyof typeof RouteDisplayName;    
    //if enumKey is equal to segment then check if that enum Key is in RouteDisplayName if not then just return enumKey
    //if enumKey is not equal to segment then just return enumKey
    return enumKey ===
      segment
      ? RouteDisplayName[enumKey] == undefined ? enumKey : RouteDisplayName[enumKey]
      : enumKey;
  }
  generateUrl(segment: string): void {
    const urlSegment =
      Object.keys(RouteDisplayName).find(
        (key) =>
          RouteDisplayName[key as keyof typeof RouteDisplayName] === segment
      ) ?? segment.charAt(0).toLowerCase() + segment.slice(1);
    const url = this.cleanedUrl.split(urlSegment)[0] + urlSegment;
    this.router.navigateByUrl(url);
  }
}
