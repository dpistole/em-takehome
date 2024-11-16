

- the android app navigation appears to differ from traditional "web navigation" in that clicking things opens/stacks a new page window (almost like a new tab), and then clicking "back" (the arrow icon) closes that window and places you back in the context of the previous page

if you are at the home page, and click an account, the account details open, and when you click "back" you are back at the home page.

if you instead navigate to "all accounts", and then click an account, you get the account details and from there clicking "back" takes you to the "all accounts page" (ie, it retains context)

with the web navigation normally id use a static path, perhaps we can use the location history to push the user back to "the page they last visited" (defaulting to  home page when not existent, eg deep linking)