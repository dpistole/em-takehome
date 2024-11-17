## Don Pistole - Empower Design Challenge

Hello Reviewer, thanks for taking the time. I've put together some notes that I'm hoping might provide some context and aide in code review and subsequent interview.

I've created a quick markdown doc with gif recordings of the user story flows here to demonstrate the basic requirements have been met: [User Story Recordings](./README/USER_STORY_RECORDINGS.MD)

## Preparation

Next things next, let's talk a little about the pregame planning. After receiving a high level overview of the task, I prepared by familiarizing myself with your mobile application UI.

I looked at the different screens in the `Analysis` section of the mobile app, and chopped them up in Figma to familiarize myself with the layout and component variety. Then with the user stories as a guide, I determined which pages/components would be required for the critical paths, and which could be eliminated from scope (as there are time constraints).

The figma file can be viewed here: [Figma Planning](https://www.figma.com/design/DUjDFdhrA7MNhKFuVDofaQ/empower-takehome?node-id=0-1&t=tf6kUQzHRYjeBQsn-1) (I believe you have to `request access` which I can grant, else we can review in interview, else we can disregard)

## Execution

Once I sat down to execute, I started a google timer and timestamped all of my commits with the elapsed times to document the progression and order of tasks. My overall strategy, having previously identified the critical paths, and having some idea which API endpoints would be involved was as follows:

- quick review of project and existing dependencies
- implement routing and add empty placeholder pages for critical paths
- implement basic API functionality (fetching for required entities)
- follow the critical path in each user story, fleshing out the minimal UI components required to accomplish the task

## Reflection

Ultimately I was able to accomplish the functionality required for all of the user stories, but not within the time period recommended. As the commit timestamps tell, after ~5 hours I had the routing and page scaffolding in place, written the logic for the API entities, and completed the first user story re: viewing Accounts and balances.

It took about the same amount of time again to build the remaining functionality, with the Spend Trackers probably being the most time consuming from a thinking/coding perspective. In hindsight there were a few decisions I could have made differently to save _some_ time, but overall I feel like I was "in the zone" and not hung up on anything particular so I'd consider it an accurate representation of my coding pacing and ability.

## Additional Thoughts

- there were some dependencies I added to the project, I've made some notes on them here: [Additional Dependencies](./README/ADDITIONAL_DEPENDENCIES.MD)

- there were lots of things I chose to sacrifice due to time constraints, I've documented some of them here: [What I Didn't Do](./README/WHAT_I_DIDNT_DO.MD)

- there were a few decisions I might have made different in hindsight to reduce the time to completion, I've documented them here: [What Took So Long](./README/WHAT_TOOK_SO_LONG.MD)
