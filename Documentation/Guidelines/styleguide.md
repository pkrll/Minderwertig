# Minderwertig's Style Guide

## Table of Contents

* [Background](#background)
* [General](#general)
  * [Formatting rules](#formatting-rules)
    * [Indentation](#indentation)
    * [Capitalization](#capitalization)
* [HTML](#html)
  * [General](#general-1)
  * [Formatting rules](#formatting-rules-1)
  * [Document type](#document-type)
  * [Validity](#validity)
  * [Semantics](#semantics)
  * [Separation of Concerns](#separation-of-concerns)
  * [Type attributes](#type-attributes)
* [CSS](#css)
  * [General](#general-2)
  * [Formatting rules](#formatting-rules-2)
* [Javascript](#javascript)
  * [General](#general-3)
  * [Variables and Constants](#variables-and-constants)
  * [Delete](#delete)
  * [Naming](#naming)

## Background

This style guide outlines the coding conventions for the Minderwertig project, and is adapted from Google's [HTML/CSS style guide](https://google.github.io/styleguide/htmlcssguide.html) and [JavaScript style guide](https://google.github.io/styleguide/javascriptguide.xml).

If you come across a case that's not covered here, use Google's style guide. If it's not covered in that document, use common sense, be consistent and communicate with the team.

## General

### Formatting rules

#### Indentation

Use tabs to indent the code. The tab size should be 2 spaces.

```html
<section>
  <div id="foo">
    <span class="bar">Hello World!</span>
  </div>
</section>
```

```css
#foo {
  ...
}

.bar {
  ...
}
```

#### Capitalization

All HTML/CSS code (element names, attributes, CSS selectors, properties and property values) should be in lowercase.

```html
<div>
  <span class="foo"></span>
</div>

<!-- Do NOT do this -->
<DIV>
  <span CLASS="foo"></SPAN>
</DIV>
```

```css
.foo {
  color: #ffffff;
}

/* Do NOT do this */
.foo {
  color: #FFFFFF;
}
```

## HTML

### General

Use double (``""``) rather than single quotation marks (``''``) around attribute values.  

```html
<a class="foo" href="#bar">Foo bar</a>
```

### Formatting rules

Put every block, list or table element on a new line (and indent appropriately if they are child elements of a block, list or table element).

```html
<ul>
  <li>...</li>
  <li>...</li>
  <li>...</li>
</ul>
```

### Document Type

Use valid HTML5 and include the doctype declaration at the top of the HTML document.

```html
<!DOCTYPE html>
<html>
  ...
</html>
```

### Validity

To check if your code is valid HTML, use the [W3C HTML validator tool](https://validator.w3.org/nu/).

### Semantics

Elements should be used for what they were created for. For example, use heading elements for headings, ``p`` elements for paragraphs, ``a`` elements for anchors, etc.

### Separation of Concerns

Do not mix HTML, CSS and Javascript (if possible).

Strictly keep structure (markup), presentation (styling), and behaviour (scripting) apart, and try to keep the interaction between the three to an absolute minimum.

Markup should be put in the HTML documents, while stylings should be put in style sheets. All Javascript/Vue code should be contained in ``.js`` files.

### ``type`` attributes

You can safely omit ``type`` attributes for style sheets and scripts, if using ``CSS`` and ``Javascript``, as HTML5 implies ``text/css`` or ``text/javascript`` as defaults.

```html
<link rel="stylesheet" href="master.css">
<script src="script.js"></script>

<!-- Not recommended -->
<link rel="stylesheet" href="master.css" type="text/css">
<script src="script.js" type="text/javascript"></script>
```

## CSS

### General

All declarations should end with a semicolon ``;``.

Use single (``''``) rather than double (``""``) quotation marks for attribute selectors and property values.

```css
.foo {
  font-family: 'Roboto', sans-serif;
}
```

### Formatting rules

Alphabetize declarations (ignore vendor-specific prefixes such as ``-moz-`` or ``-webkit-``, though these should be grouped alphabetically when grouped). This makes the code more consistent and easier to read and maintain.

All properties should be aligned, as should their values.

```css
.foo {
  background:             fuchsia;
  border:                 1px solid;
  -moz-border-radius:     4px;
  -webkit-border-radius:  4px;
  border-radius:          4px;
  color:                  black;
  text-align:             center;
  text-indent:            2em;
}
```

All block content (rules within rules) should be indented.

```css
@media screen, projection {

  html {
    background: #fff;
    color:      #444;
  }

}
```

Separate multiple selectors and declarations by new lines, and separate two rules by a blank line.

```css
h1,
h2,
h3 {
  font-weight: normal;
  line-height: 1.2;
}

a {
  color: #fff;
}
```

## Javascript

### General

Always use semicolons. Except on function declarations.

```javascript
// Function expression
var someFunction = function() {
  var foo = 42;
}; // <--- ends with semicolon

// Function declaration
function someFunction() {
  var foo = 42;
} // <--- No semicolon
```

#### Variables and Constants
Always declare variables using the ``let`` or ``const`` keyword. This prevents the variable from being placed in a global context.

```javascript
let currentAcceleration = 2.35; //reassignable
const gravity = 9.82; //not reassignable
```

Use uppercase with each word separated by an underscore when naming constants, like this: ``SOME_CONSTANT``.

#### Delete

Do not use ``delete``, instead remove an objects property with ``this.foo = null``, as ``delete`` has a larger overhead.

### Naming

Use camel case when naming functions or variables:

```javascript
function someFunction() {
  var someVariable = anotherFunction();
}
```

Use pascal case for your own types:

```javascript
class Foo {

}

var Months = { "January": 1, "February": 2, ... };
```
