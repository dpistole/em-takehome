### [Back To README](../README.md)

## Additional Dependencies

Adding project dependencies is not a decision to be taken lightly, every new package increases bundle size, complexity, and risk. For this task there were a number of packages I added to achieve the functionality I felt was required.

### tailwind

The first package I pulled in was tailwind to get up and running with a style system. Over the years I've gone from CSS, to SASS, to CSS-in-JS, to tailwind and been proficient with all of them. I've been using tailwind for about a year and enjoy it.

An additional consideration here was whether or not I was going to use a component library. I considered something like Material UI for the style and accessibility, but I was hesitant due to potential conflicts with tailwind. I looked at tailwind compatible UI libraries like shadcn, but my unfamiliarity led me to believe the learning curve would be too costly from a time perspective. Ultimately I decided tailwind and no component library would be the best balance between speed and quality.

### classnames

Classnames is a library that can be used to merge and apply business logic to a component's classnames. I feel like it increases the readability of tailwind (which is efficient but messy), and provides an easy interface for applying conditional classes (eg, success vs danger color conditions)

### @tanstack/react-router

Traditionally I've been a `react-router` user, but since I was running with `@tanstack/react-query`, and since routing is fairly straightforward, I felt like that `@tanstack/react-router` would meet my needs without having a learning curve that would slow progress. I think the homogenous nature of the `tanstack` packages is a benefit as well, as the coding style and documentation are consistent between them.

### @tanstack/react-query

For the past year or so I've been using the `redux query tooklit` alongside redux. In the past I've used `urql` for GQL, or home rolled `axios` + react state solutions. In this scenario redux seemed overkill, and I felt like raw fetch wasn't quite enough, so I picked `react-query` as I've heard a lot of good things about it and the API seemed straightforward (and similar to `rtk-query`) enough not to significantly slow my progress.

### react-hook-form

I decided to leverage a form library as I felt like it would be the quickest solution and provide the best UX compared to trying to self roll something based on react state. I picked react-hook-form because I have been using it for the past year or three and am familiar enough with it to be quick-ish.

I looked at the tanstack form library, but the API and examples looked complex enough that I figured it could ultimately cost more in time than sticking with `react-hook-form`.

### zod

Zod is a schema validation library that integrated with `react-hook-form` and can be useful for form validation. The zod library also has some nice builtin ability to infer types from schemas, and integrates with with typescript to assign the schemas type to the parsed data (when the parsing is successful).

### currency.js

I picked currency.js to give me a quick way to format and add currency. I've heard a lot about the sub-optimal handling of currency math by javascript so I felt like picking a library was the right move.

I considered self rolling something based on the Intl.NumberFormat API, but not having direct experience with it `currency.js` seemed the safer choice from a time management perspective. I was however disappointed by the way `currency.js` handles locale, and would probably evaluate a different solution moving forward.

### date-fns

There is some date math involved with filtering transactions so I decided I'd need a date library. I've used a bunch (moment, dayjs, date-fns, etc) and `date-fns` is currently my go to for DX and familiarity reasons.
