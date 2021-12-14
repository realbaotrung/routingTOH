# Router tutorial: tour of heroes

## Objectives

-   Organizing the application features into modules.
-   Navigating to a component (Heroes link to "Heroes LIst").
-   Including a route parameter (passing the Hero `id` while routing to the "Hero Detail").
-   Child routes ( the Crisis Center has its own routes).
-   The `CanActivate` guard (checking route access).
-   The `CanActivateChild` guard (checking child route access).
-   The `CanDeactivate` guard (ask permission to discard unsaved changes).
-   The `Resolve` guard (pre-fetching route data).
-   Lazy loading an `NgModule`.
-   The `CanLoad` guard (check before loading feature module assets).

## Milestone 1 : getting started

### Add the Router Outlet

![angular](img/pic1.png)

`<router-outlet>` serves as a placeholder where the routed components are rendered.

### Define a Wildcard route

You have defined 2 routes: `/crisis-center` and `/heroes`. Any other URL causes the router to throw an error and crash the app.

**Error occurs when routerLink does not exist.**

![angular](img/pic2.png)

### Set up redirects

### Summary

-   Load the router library
-   Add a nav bar to the shell template with anchor tags, `routerLink` and `routerLinkActive` directives
-   Add a `router-outlet` to the shell template where views are displayed.
-   Configure the router module with `RouterModule.forRoot()`.
-   Set the router to compose HTML5 browser URLs.
-   handle invalid routes with a `wildcard` route.
-   Navigate to the default route when the application launches with an empty path.

## Milestone 2: Routing module

Routing Module has several characteristics:

-   Separates routing concerns from other application concerns.
-   Provides a module to replace or remove when testing the application.
-   Provides a well-known location for routing service providers such as guards and resolvers.
-   Does not declare components.

### Integrate routing with your app

With `--routing` option, you can create a project that does use routing.

```shell
ng generate module app-routing --module app --flat
```

To create an `AppRoutingModule` module in the `/app` folder to contain the routing configuration.

## Milestone 3: Heroes feature

This milestone covers the following:

-   Organizing the application and routes into feature areas using modules.
-   Navigating imperatively from one component to another.
-   Passing required and optional information in route parameters.

> A typical application has multiple feature areas, each dedicated to a particular business purpose with its own folder.

### Add heroes functionality

To manage the heroes, create a `HeroesModule` with routing in the heroes folder and register it with the root `AppModule`

```shell
ng generate module heroes/heroes --module app --flat --routing
```

This command does things:

-   Create: `app/heroes/heroes.module.ts`
-   Create: `app/heroes/heroes-routing.module.ts`
-   Update: `app/app.module.ts`

#### Hero feature routing requirements

> Only call `RouterModule.forRoot()` in the root `AppRoutingModule`. In any other module, you must call the `RouterModule.forChild()` method to register additional routes.

### Module import order

```shell
# src/app/app.module.ts

imports: [
  BrowserModule,
  FormsModule,
  HeroesModule,     #The order is very important!!!
  AppRoutingModule  #if AppRoutingModule is placed front of HeroesModule
                    #by the effect of `**` wildcard routes,
                    #you are navigated to `Page not found`
],
```

When all routes were in one `AppRoutingModule`, you put the default and `wildcard routes` last, after the `/heroes` route, so that the router had a chance to match a URL to the `/heroes` route before hitting the wildcard route and navigating to **"Page not found"**.

### Route Parameters

```shell
# src/app/heroes/heroes-routing.module.ts
{ path: 'hero/:id', component: HeroDetailComponent }
```

The `:id` token creates a slot in the path for a Route Parameter. In this case, this configuration causes the router to **insert the id of a hero into that slot**.

```shell
localhost:4200/hero/15
```

#### Setting the route parameters in the list view

```shell
# src/app/heroes/hero-list/hero-list.component.html
<a [routerLink]="['/hero', hero.id]">
```

link parameter `[routerLink]` has 2 items:

-   routing path: `'/hero'`
-   route parameter: `hero.id`

for example: we have `localhost:4200/hero/15`, the router extracts the route parameter `id: 15` from the URL and supplies it to the `HeroDetailComponent` using the `ActivatedRoute` service

### Activated Route in action

```shell
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

hero$: Observable<Hero>;

constructor(
  private route: ActivatedRoute,
  private router: Router,
  private service: HeroService
) {}
```

```shell
# src/app/heroes/hero-detail/hero-detail.component.ts
ngOnInit() {
  this.hero$ = this.route.paramMap.pipe(
    switchMap((params: ParamMap) =>
      this.service.getHero(params.get('id')!))
  );
}
```

`ngOnInit()` use the `ActivateRoute` service to retrieve route parameter, pull hero `id` from the parameters, and retrieve the hero to display

-   when the map changes, `paramMap` get `id` parameter from the changed parameters.
-   then tell `HeroSerice` to fetch hero with that `id` and return the result of `HeroService` request.
-   `switchMap` operator does 2 things:
    -   it flattens the `Observable<Hero>` that `HeroService` returns.
    -   cancels previous pending requests.

We have 2 things:

-   `ActivatedRoute.paramMap` and component reuse (here is `HeroDetailComponent`), the router re-uses a component instance when it re-navigates to the same component. The route parameters could change each time.
-   `ActivatedRoute.snapshot` won't reuse component, the router creates a new `HeroDetailComponent` instance each time. There is no way to navigate from one hero detail to another hero detail without visiting the list component in between.

```shell
# src/app/heroes/hero-detail/hero-detail.component.ts
ngOnInit() {
  this.hero$ = this.route.paramMap.pipe(
    switchMap((params: ParamMap) =>
      this.service.getHero(params.get('id')!))
  );
}
```

```shell
# src/app/heroes/hero-detail/hero-detail.component.ts
ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id')!;
  this.hero$ = this.service.getHero(id);
}
```

> `snapshot` only gets the initial value of the parameter map. Use the observable `paramMap` approach if there's a possibility that the router could re-use the component.

### Navigating back to the list component

`HeroDetailComponent` "back" button uses the `gotoHeroes()` method that navigates back to `HeroListComponent`

### Route parameters in the ActivatedRoute service

```shell
# src/app/heroes/hero-list/hero-list.component.ts
ngOnInit() {
this.heroes$ = this.route.paramMap.pipe(
  switchMap(params => {
    this.selectedId = parseInt(params.get('id')!, 10);
    return this.service.getHeroes();
  })
);
}
```

### Adding routable animations

```shell
# src/app/app.module.ts
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserAnimationsModule,
  ],
})
```

```shell
# src/app/heroes/heroes-routing.module.ts
const heroesRoutes: Routes = [
  { path: 'heroes',  component: HeroListComponent, data: { animation: 'heroes' } },
  { path: 'hero/:id', component: HeroDetailComponent, data: { animation: 'hero' } }
];
```

Create `src/app/animation.ts`

update in `app.component`

```shell
# src/app/app.component.ts
export class AppComponent {
    title = 'router-toh';

    getAnimationData(outlet: RouterOutlet) {
        return outlet?.activatedRouteData?.['animation'];
    }
}
```

```shell
# src/app/app.component.html
<div [@routeAnimation]='getAnimationData(routerOutlet)'>
    <router-outlet #routerOutlet='outlet'></router-outlet>
</div>
```

### Summary

This section covered the following:

-   Organizing the application into feature areas.
-   Navigating imperatively from one component to another.
-   Passing information along in route parameters and subscribe to them in the component.
-   Importing the feature area NgModule into the AppModule.
-   Applying routable animations based on the page.
