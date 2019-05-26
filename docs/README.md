This is a reference for what we agreed on
We should use it to make a detailed issues for each task
## Front-End
list of the components with just the important details that we should consider, ___always consider taking a look at the figma prototype when you're making the issues___.
### Components:
- **UnderConstruction:**
  this is just a component to show while we are developing pages :smile:
- **Header:**
  if the member is logged in we should show the NavBar.
  it contains:
  - Notifications
    - the notifications will appears on these actions:
      - when someone hire the member
      - when someone apply for offer that the member created
      - when someone add a review on the member
      - If new offers created that related to the member skills
  - NavBar
- **Footer:**
- **Login:**
- **Signup:**
- **LandingPage:** contains:
  - SuccessStories: slider component which contains a StoryCard component
- **Home:** will show offers or members with search/filter functionality, contains:
  - OfferCard: _from the common components_
  - MemberCard
  - FilterCard
- **OfferDetails:**
  - show the details for the offer
  - if the member is the offer owner then it'll also show the applicants who applied for it
  - if the member already applied for it then it'll also show his proposal
  - it contains:
   - ApplicantCard: (proposal) 
      - expands when clicking on it (show more text)
      - show Hire me button and show profile if the member is the offer owner
- **CreateOffer:**
  - use AutoCompleteTags _from common components_ for skills and offer_type
- **MyApplications:** show the offers that the member applied for
  - use OfferCard _from common components_
- **SavedOffers:** show the offers that the member saved
  - use OfferCard _from common components_
- **MyOffers:** show the offers that the member created, contains:
  - MyOfferCard
- **Profile:**
  - each Section should be in a component, on hover will show the edit icon
  - clicking the edit icon will open edit session for this compoenent(section)
- **PageNotFound:**
### common components:
- **AutoCompleteTags:** It'll be used for skills and offer types so I imagine we would need to pass function to modify the state of the parent of this component!!?, used in:
  - Home (filter) - CreateOffer - Profile (editing)
- **OfferCard:** used in:
  - Home - MyApplications - SavedOffers

### over all notes:
- We should add a good examples as placeholders so the user know exactly what we meant.
## Back-End
we'll be discussed on Sunday May 26th
- offer status:
  - inactive: if the offer has been for some time with no applicants or no hire (maybe two months?) so it shouldn't be showed in the home search!!
  - active:
  - completed: someone been hired
  - Finished: contraced finished or the worker no longer work (this should be modified manually by the offer owner)!!
### database schema
![](https://cdn.discordapp.com/attachments/491491266090106884/581599237993791558/HvQwuHASYAESIAESIAESIAEfEqAEsunuNkYCZCAUwm4RlsZf2ckllNnjf3yBQFjlJVrxBUjsHwxA2yDBEiABEiABEiABEhAJ0CJx.png)
