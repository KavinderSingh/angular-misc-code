import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthenticationService } from 'src/app/modules/auth/core/services/authentication.service';

export const authGuard: CanActivateFn = (route, state) => {
  return isAuthenticated(inject(Router), inject(AuthenticationService));
};

function isAuthenticated(router: Router, authService: AuthenticationService) {
  return authService.validateSession().pipe(map((response: any) => {
    const token = localStorage.getItem('token');
    if(response == false || token == null) {
      if(token == null) {
        authService.signOut().subscribe(() => {
          window.location.href = "/signin";
        });
        return false;
      }
      router.navigate(["/signin"]);
      return false;
    }
    return true;
  }));
}
