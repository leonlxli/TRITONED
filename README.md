**TriTONED**
An application for people working out/seeking to work out to share workout tips, socialize, and most importantly, be aware of current gym conditions.

**Work Distribution:**

Joel:
- Paper prototype
- Preliminary application design and ideas
- Nielsen Heuristics finalization
- App critiquing to tailor to heuristics

Crystal:
- Neilsen’s Heuristics draft
- Digital prototype
- Design throughout each iteration
- Frontend: styling all around, gym buttons, logo, colorization, adding constraints 
- Backend: confirmation messages, responsive loading for gym buttons

John:
- Frontend: preliminary application of Materialize CSS, design fixes throughout
- Backend: delete/redirect, messageTemplates, mongoDB with dates

Leon:
- App skeleton (backend); main app functions (delete, comments, etc.)
- Frontend: preliminary login page, highlights
- Socket.io

**Neilsen’s Heuristics:**

Visibility of system status
- Users know where they are at all time and what they will be able to click since all buttons are responsive to hovering and popups/pages react accordingly.
 
Match between system and the real world
- We implemented natural languages and concepts that people are already familiar with (like “Post”, “Comments”, “Delete”). Nothing is new or hard to understand. Posts are also organized by chronological order (newest at the top), which is what people want to see and what is useful for them (making info appear in a natural and logical order).

User control and freedom
- Users can easily navigate and take back their actions if they want. We have a cancel and delete function so that users can get rid of their posts or comments if they do not wish to have them shown anymore. Navigating between pages is also easy with “Back” buttons and a navigational bar that scrolls with the user.
 
Consistency and standards
- We use commonly used words and icons to allow the user to navigate the app. Everything is straightforward and there are no surprises for the user, especially when we use a familiar, minimalistic type of interface most users have seen before.

Error prevention
- We prevent more errors from happening by clearly presenting the users with the choices they can make and making them be sure they choose one. Our cancel and delete/ok buttons are distinct from each other and also spaced adequately so that users don’t accidentally make the wrong choice. We also restrained choosing a gym from three buttons. Users cannot submit empty posts and get confirmation messages to make sure they are posting what they want before it is posted.

Recognition rather than recall
- The similarity between the pages of our app reduces the user’s memory load. There are no hidden options; every  option available to the user is clearly shown and labeled with clear directions so the user is not lost at any time.

Flexibility and efficiency of use
- Novices to expert users can utilize our app with ease. We implemented a following navigational bar so that users can move around the app quicker without having to scroll to the top.
 
Aesthetic and minimalist design
- We kept our design straight to the point, only adding instructions when necessary. There are also no hidden choices for the users to make, everything is presented to the user clearly.

Help users recognize, diagnose, and recover from errors
- In places where errors can happen, we inserted error messages that specified the error and allowed the user to go fix their mistake or cancel the operation overall. When making a new post, if the user tries to submit the post without any text or without selecting a gym, an error popup will appear telling the user what piece of information is missing.

Help and documentation
- The user is giving short, straight-forward information in places where they have choices to make or actions to take.  This is the help they need if they are lost.
