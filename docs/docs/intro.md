---
sidebar_position: 1
---

# Introduction

## Meet the team

INeedMoreTea company presents the future of movie applications.
Currently, the application allows us to expose a list of movies to our users so they can vote for their favorites.
We are convinced that we will reach a massive audience and we have a lot of ideas for new functionalities!

To make sure that we can build the best experience to our user with as little regression as possible we want to be
prepared.

First, we want o be sure that regressions in future versions of the app can be done in the easiest way as possible.
We need to know where a bug can be reproduced to have the same as experience as our production.

Second, to prevent regression in the project, we want to be sure that the code is as stable as possible.
We wrote several unit-tests and e2e-tests (see respective projects documentations), please automate their execution.
We also have linters on the projects to make sure that the code is as stable as possible.

Third, we want to make sure that we can ship things as fast as possible, we don't want to spend to much time fixing
merge conflicts.

Finally, your work should integrate our already established standards.
Everything present in the project documentation should stay true.
Remember to use the Gitmoji convention for your commits!

## How we work

We use GitHub to ma,nage our code.

We like to keep everything in the same repository to keep a trace of everything and keep a single source of truth.

Currently, the team is composed of 2 developers and 1 product owner.

The product owner likes to test things before they are shipped to production.
He doesn't have any software on his computer and can't install them, knows nothing about code and only want to review
the application in a deployed environment.

Each developer work independently and sometime need to test things in a deployed environment.
They communicate well and do not need access to an environment to often so they can share the same.
But they sometime need an environment when the product owner is reviewing something.
They both need to be able to perform their tasks independently.

## Definition of Done
### Before production, Every new code added to project
- must keep the unit tests working
- must keep the e2e tests working
- must keep the linter running
- must be formatted as per the project conventions
- must be reviewed by a developer
- must be tested manually by the product owner
