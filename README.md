# Registrated Users (https://user-registration-d9498.web.app)

## About app

Angular + Firebase project.
Bulma - CSS library

When the app loads, you are on the register page.
You need to register or if you already have an account you can log in.

When registration is successfully done you are redirected to list of users page.
You can't navigate to list of users page if you are not logged in and if you try to do that you will be redirected to login page.
Also if you are logged in, you are not able to navigate to login or register screen.

On list of users page the search field is live and react to any change in the input field.
When the search is performed, results appear under the search box.

When you click on a specific user you are taken to user details page where you can find more info about that user.
The Back button returns you back to list of users.

If you navigate to page that doesn't exist 'Page not found' will be shown.

Project is deployed to Firebase: https://user-registration-d9498.web.app





## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
