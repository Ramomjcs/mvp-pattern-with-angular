import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';

let mockHeroes = [
  { id: 11, name: 'Mr. Nice' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' },
];

export const mockApiInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<any> => {
  const { method, urlWithParams, url, body } = req;

  if (method === 'GET' && url.endsWith('api/heroes')) {
    return of(new HttpResponse({ status: 200, body: mockHeroes }));
  }

  if (method === 'GET' && /api\/heroes\/\d+$/.test(url)) {
    const id = parseInt(url.split('/').pop() || '', 10);
    const hero = mockHeroes.find((h) => h.id === id);
    return of(new HttpResponse({ status: 200, body: hero }));
  }

  if (method === 'GET' && urlWithParams.includes('api/heroes') && urlWithParams.includes('id=')) {
    const id = parseInt(urlWithParams.split('id=')[1], 10);
    const hero = mockHeroes.filter((h) => h.id === id);
    return of(new HttpResponse({ status: 200, body: hero }));
  }

  if (method === 'GET' && urlWithParams.includes('api/heroes') && urlWithParams.includes('name=')) {
    const term = decodeURIComponent(urlWithParams.split('name=')[1]).toLowerCase();
    const filtered = mockHeroes.filter((h) =>
      h.name.toLowerCase().includes(term)
    );
    return of(new HttpResponse({ status: 200, body: filtered }));
  }

  if (method === 'POST' && url.endsWith('api/heroes')) {
    const newHero = { id: Date.now(), ...body };
    mockHeroes.push(newHero);
    return of(new HttpResponse({ status: 201, body: newHero }));
  }

  if (method === 'PUT' && /api\/heroes\/\d+$/.test(url)) {
    const id = parseInt(url.split('/').pop() || '', 10);
    mockHeroes = mockHeroes.map((h) => (h.id === id ? { ...h, ...body } : h));
    const updatedHero = mockHeroes.find((h) => h.id === id);
    return of(new HttpResponse({ status: 200, body: updatedHero }));
  }

  if (method === 'DELETE' && /api\/heroes\/\d+$/.test(url)) {
    const id = parseInt(url.split('/').pop() || '', 10);
    mockHeroes = mockHeroes.filter((h) => h.id !== id);
    return of(new HttpResponse({ status: 204 }));
  }

  return next(req);
};
