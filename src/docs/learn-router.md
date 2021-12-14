# Router tutorial: tour of heroes

## Objectives

- Organizing the application features into modules.
- Navigating to a component (Heroes link to "Heroes LIst").
- Including a route parameter (passing the Hero `id` while routing to the "Hero Detail").
- Child routes ( the Crisis Center has its own routes).
- The `CanActivate` guard (checking route access).
- The `CanActivateChild` guard (checking child route access).
- The `CanDeactivate` guard (ask permission to discard unsaved changes).
- The `Resolve` guard (pre-fetching route data).
- Lazy loading an `NgModule`.
- The `CanLoad` guard (check before loading feature module assets).

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

- Load the router library
- Add a nav bar to the shell template with anchor tags, `routerLink` and `routerLinkActive` directives
- Add a `router-outlet` to the shell template where views are displayed.
- Configure the router module with `RouterModule.forRoot()`.
- Set the router to compose HTML5 browser URLs.
- handle invalid routes with a `wildcard` route.
- Navigate to the default route when the application launches with an empty path.
