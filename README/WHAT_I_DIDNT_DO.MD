### [Back To README](../README.md)

## What I Didn't Do

Due to the time constraints I had to make some decisions about what was necessary and unnecessary for completion of the user stories. Here some some quick notes on decisions I made that might provide insight or fuel discussion during our review.

### testing

There are no tests here. I have written a lot of tests in my time, mostly in enzyme or react-testing-library on the UI side, sometimes in jest for the server side, and occasionally integration tests via Cypress.

I see value in writing tests, especially unit tests, especially for critical business logic. I also enjoy the peace of mind the high level integration tests provide.

In this specific scenario where the stakes are low from a risk perspective, and the scope is already questionably large for the time constraint, I think de-prioritizing the testing is necessary.

### accessibility

Accessibility is important, we want the product to be usable for as many users as possible, and it's probably good for SEO and User Experience.

I've worked on projects where we used tooling to audit our WCAG compliance, and generally I try to be mindful of providing image alt-tags, not hiding elements, implementing keyboard events, etc. That said it comes at a cost of extra development time and effort, and in this specific scenario it seemed unnecessary given the time constraints.

### design consistency

Generally, even when working from design mocks, I try to identify and stick to overall patterns in the construction of UI elements.

As an example we might say, "generally the page is a column, and components that are placed within the column will have _n_ padding on the left and right".

I'd normally take that information and construct my components in a similar way, say each having a container with _n_ x-axis padding, but when time is of the essence I'm generally just rapidly prototyping and the padding might end up on the container, or on the child element, or whereever is necessary to keep things aligned without spending excess time considering and implementing design patterns.

## code organization

I think having code organized in a consistent and familiar manner helps discoverability and increases developer velocity. Every team has their own methods and I believe centralizing around those methods is more important than personal preferences.

Normally during and after writing code I'll often refactor a bit (move files, rename files, make DRY) in an attempt to bring my code more towards the teams coding style standards and to make things easier to maintain.

For this exercise I was prototyping rapidly, and did not expend much energy on code organization during, and none after. Where files landed is more a result of my personal preferences and muscle memory, and more variable names are the first thing I could think of.

## polish

The UI is pretty bare bones, aside from an attempt to mimic the layout of the mobile app I did not expend a ton of effort into completing the more minute details of the UI. Icons are missing, there is very little color, the form UX could be improved, etc.

The goal was to produce an MVP capable of providing the functionality necessary to achieve the user stories, and everything else was deprioritized behind that. Normally I'd circle back and iteratively resolve issues prioritized by UX impact. For this project I'd probably start with getting some icons in where the placehold `[icon]` text exists, then update the form UX, then add some consistency in color and font weights.