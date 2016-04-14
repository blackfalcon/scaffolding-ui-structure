# UI Scaffoldings 

UI scaffoldings play a role in pre-defining the model of a configureable UI component. 

A UI scaffolding will consist of two parts, the scaffolding mixin that defines the UI model, and the default-settings that are the configurable mapped values. 

The scaffolding mixin defines the scope and initial opinion of the UI component. Each scaffolding will clearly define it's dependencies at the component level. For example: 

```
@import "lib/mixins/is-deprecated";
@import "default-settings";
```

## Deprecation support

Within the scope of the scaffolding mixin, a few things need to be included to address some core functionality.

Deprecation support is added by including the `is-deprecated` mixin

```
@include is-deprecated($configs);
```

Deprecation settings are managed within the `default-settings.scss` file associated to the component UI.

* flag: boolean
* warning: string

```
deprecate: (
  is-deprecated: (
    flag: true,
    warning: 'this scaffolding component set deprecated and scheduled to be removed in version 3.1.'
  ),
),
```

### Deactivation of a component UI

Within the scope of the component UI, wrap all rules with: 

```
@if map-get-z($configs, deprecate, is-deactivated) == false {
  ...
}
```

Again, managed within the `default-settings.scss` file; 

```
deprecate: (
  is-deactivated: false,
),
```

* is-deactivated: boolean

This setting allows for the full deactivation of the pre-defined component UI opinion without having to set all the mapped values to `null`. 


## Manage deprecation support from super-global settings

Future idea ...

Manage these deprecation setting from a source outside the physical framework/CSS dev. 

Using a tool like [Theo](https://github.com/salesforce-ux/theo) you could conceivably control these settings in an external JSON doc allowing for management of the UI scaffoldings without having to deploy a new library update. 













