import { CanActivateFn } from '@angular/router';

export const actionGuard: CanActivateFn = (route, state) => {
  return true;
};
