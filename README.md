# Scaffolding based modular UI system

One of the more frustrating issues we as front-end developers contend with are UI build systems that are laden with restrictive UI opinions. These solutions leave no alternative other then to add more UI Code to over-write the previous opinion and then write even more code to then add in the desired customization.

This proof of concept is opening the discussion; how to use Sass to construct initial UI scaffoldings with a 100% configurable API that allows for customizations, extensions, and in some cases, controlled mutability.

## The Modular UI Manifesto

1. A scaffolding selector is tied to a specific physical selector and its states, and should not contain other selectors, without them being passed in as param. This ensures modularity.
1. TBD

## Dependency hierarchy

This proof of concept takes into account a dependency hierarchy like the following;

```
Sass
  > common lib toolset (Bourbon for example)
    > domain specific tools
      > theme tools (location of scaffoldings)
        > extended customized theme (location of generators)
```

## Why do we need scaffolding modular UI?

As stated prior, many UI build systems have issues with overly opinionated base component UIs that leave little opportunity for themed customization other then;

1. global variables that have to wide an impact with updates
1. super global variables, vars that are outside the common structure of the theme CSS (consumed via JSON blob or other alternate structure)
1. long tail direct CSS updates/overrides to already in-use selectors

As we are evolving the ideas of Web App Development, the clear Holy Grail is to build truly modular UI systems. Functional and presentational. The problems is that there have been really great leaps forward in the space of modular component functionality, but UI has been left in the dust. The only solution that more and more devs are gravitating to are simply writing all the presentation within the scope of the functional code, and that typically means writing CSS in JS. Not everyone is sold on that idea.


## The problems I have seen over and over and over ...

These above solutions leave front-end developers restricted and they commonly run into issues that cause high frustration with CSS.

With a limited global variable API, this ties the hands of the developer more to what they `can't` to versus what they `can` do. Solutions are common place for setting large impact variables that will have a global effect on the UI. Colors, font-families, browser support matrix, common padding and spacing.

Then there are the global vars that are set as vars, but never really change from theme to theme; variables like grid spacing, base border-radius, and RWD breakpoints. Sure  these variables add a semantic name to typically a numerical value, but do you ever really remember the semantic name? No. That's why we are always looking things up, referencing unkept API docs and are simply making things harder then we need them to be in the spirit of making things easier.

In any case, these types of vars have two distinct issues; 1) extremely limited in application and customization, 2) global theme influence

The next common solution is the attempt to scope global vars to their respective component types. But again, these are in the global scope and have a large influence on the entire UI. Using a var like `$border-radius-small` in the global scope is great if you want to update all your values from `2px` to `4px`, but changing that value can have large unintended ramifications as you are totally unaware of the unintended use of `$border-radius-small` outside what you (the UI architect) had in mind.

Global var concepts like `$border-radius-small` were great ideas at the time, but in use they offered really little value. How is something like this typically used when building new UI functionality?

> A developer will look at an existing similar UI in the inspector. Will see `border-radius: 2px;`. Will then look at the selector as written in the Sass to discover that the code is:

> ```
> border-radius: $border-radius-small;
> `

What is the value of using `$border-radius-small` over `2px` really? Other then the hypothetical possibility that someday `$border-radius-small` will be updated at the global scope? This is a one-time set var that offers little to the ongoing day-to-day work of building new UI components.

Over the years that I have been using systems like this, I have never once instinctively said, "Oh, that `$border-radius-small`". As UI build systems get even more complex, that scenario becomes less and less likely.

Even worse; what about cases when the var is set this way?

```
$border-radius-small: $default-border-radius;
```

Even worse then that, making the value of `$border-radius-small` the result of a convoluted function that is pulling values from a list or possibly deriving values from a `@for` loop that is difficult to understand. This leaves the developer in a place where they can't change anything, updates are way too complicated, framework fragility is at 11 and developers end up doing things like this:

```
.block {
  // TODO: address non-conforming variable use later ...
  $border-radius-small: 6px;
  ...
  border-radius: $border-radius-small;
}
```

As modular code truly starts to be modular, global vars have their place, but the values that end creating the UI itself are best kept within the scope of the module itself.

## The promise of a scaffolding modular UI

While global vars and super global vars are good tools to take advantage of, their vast influence makes them a difficult tool to use within the specific scope of a component UI. This also places the responsibility on the framework builder to have super human insight into all the possible combinations of any UI that a developer will run into. This, of course, is completely impossible.

This proof of concept is to illustrate an example of:

1. how we can make use of global vars in an encapsulated way that ensures consistent use
1. use an easily understandable path of dependencies,
1. build a clearly defined UI API
1. create an opportunity for customization and extensibility
