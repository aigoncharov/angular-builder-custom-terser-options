# angular-builder-custom-terser-options

Custom Angular builder that allows Terser (Uglify) customization. It's a sub-class of Angular's default builder and it does a very small customization of its logic by extending final webpack config with your custom options for Terser.

**PLEASE UPVOTE [THIS ISSUE](https://github.com/angular/angular-cli/issues/3861) TO BRING TERSER (UGLIFY) CUSTOMIZATION INTO ANGULAR'S DEFAULT BUILDER!!!**

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Quick start](#quick-start)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Quick start

1. Install

   ```
   npm i -D angular-builder-custom-terser-options
   ```

1. Add builders from this package to your `angular.json`.

   1. Set `projects.yourProjectName.architect.build` to `angular-builder-custom-terser-options:browser-custom-terser`
   1. Set `projects.yourProjectName.architect.build.configurations.production.optimization` to `true`
   1. Set `projects.yourProjectName.architect.build.configurations.production.terserOptions` to an object with any minify options supported by Terser. You can find the list of available options [here](https://github.com/terser-js/terser#minify-options).
   1. Set `projects.yourProjectName.architect.serve` to `angular-builder-custom-terser-options:dev-server-custom-terser`

   ```json
   {
     // ... rest of the default config ,
     "projects": {
       "yourProjectName": {
         "architect": {
           "build": {
             // Set our custom builder here
             "builder": "angular-builder-custom-terser-options:browser-custom-terser",
             "options": {
               // Your default options. Leave it as is
             },
             "configurations": {
               "production": {
                 // Add any options supported by Terser here
                 "terserOptions": {
                   "keep_classnames": true
                 },
                 // Enable optimization to enable Terser itself
                 "optimization": true
               }
             }
           },
           "serve": {
             // Set our custom builder here
             "builder": "angular-builder-custom-terser-options:dev-server-custom-terser"
             // Rest of the config. Leave it as is
           }
         }
       }
     }
   }
   ```
