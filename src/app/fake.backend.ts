import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { mergeMap, delay } from "rxjs/operators"
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): import("rxjs").Observable< HttpEvent<any>> {
    const users = [{
      "id": 1,
      "name": "Leanne Graham",
      "username": "Bret",
      "password": "Bret",
      "email": "Sincere@april.biz",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "1-770-736-8031 x56442",
      "website": "hildegard.org",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    },
    {
      "id": 2,
      "name": "Ervin Howell",
      "username": "Antonette",
      "password": "Antonette",
      "email": "Shanna@melissa.tv",
      "address": {
        "street": "Victor Plains",
        "suite": "Suite 879",
        "city": "Wisokyburgh",
        "zipcode": "90566-7771",
        "geo": {
          "lat": "-43.9509",
          "lng": "-34.4618"
        }
      },
      "phone": "010-692-6593 x09125",
      "website": "anastasia.net",
      "company": {
        "name": "Deckow-Crist",
        "catchPhrase": "Proactive didactic contingency",
        "bs": "synergize scalable supply-chains"
      }
    },
    ]

    return of(null).pipe(
      mergeMap(() => {
        if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
          const user = users.find(x => x.username === request.body.username && x.password === request.body.password);
          if (!user) return error('Username or password is incorrect');
          return ok({
            id: user.id,
            username: user.username,
            token: `fake-jwt-token`
          });
        }

        if (request.url.endsWith('/users') && request.method == 'GET') {
          return ok(users);
        }

        return next.handle(request);
      })
    ).pipe(delay(500))


    function ok(body) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function unauthorised() {
      return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    function error(message) {
      return throwError({ status: 400, error: { message } });
    }
  }

}
