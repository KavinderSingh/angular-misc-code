import { inject } from "@angular/core";
import { CanActivateFn, Router, UrlTree } from "@angular/router";
import { MsalBroadcastService, MsalGuard, MsalService } from "@azure/msal-angular";
import { InteractionStatus } from "@azure/msal-browser";
import { Observable, filter, map, of, switchMap } from "rxjs";
import { AuthenticationService } from "src/app/modules/auth/core/services/authentication.service";

export const unauthorizeGuard: CanActivateFn = (route, state) => {
  return isNotAuthenticated(inject(Router), inject(MsalService), inject(AuthenticationService), inject(MsalBroadcastService));
};

function isNotAuthenticated(
  router: Router,
  msalService: MsalService,
  authService: AuthenticationService,
  msalBroadcastService: MsalBroadcastService
):
  | boolean
  | UrlTree
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree> {
    var isAuthenticated = false;
    authService.isAuthenticated.subscribe(output =>  isAuthenticated = output);
  return msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        switchMap(() => {
          if (msalService.instance.getAllAccounts().length > 0) {
            router.navigate(['/dashboard']);
            return of(false);
          }
          return of(true);
        })
      );
  }

