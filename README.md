TriTONED
An application for people working out/seeking to work out to share workout tips, socialize, and most importantly, be aware of current gym conditions.


Work Distribution:

Joel - Paper prototype/application design, Neilsen Heuristics, styling
Crystal - Digital Prototype, details of application design, addressing and applying Neilsen Heurisitics, styling
Leon - implementation of app + skeleton (back-end)
John - further implementation of backend, styling


Neilsen’s Heuristics

Visibility of system status - The system should always keep users informed about what is going on, through appropriate feedback within reasonable time.
-Popup or something that let’s the user know when
-They have signed in
-Their message has been posted
-They click on something (filter a new gym)
 
Match between system and the real world - The system should speak the users' language, with words, phrases and concepts familiar to the user, rather than system-oriented terms. Follow real-world conventions, making information appear in a natural and logical order.
-“Post” this message 
-Posts will be organized by chronological order (newest at the top) - that’s what people want to see and what is useful for them (making info appear in a natural and logical order)

User control and freedom - Users often choose system functions by mistake and will need a clearly marked "emergency exit" to leave the unwanted state without having to go through an extended dialogue. Support undo and redo.
-Delete post
-Cancel (making a new post)
-Back (from one page to another)
-Home option
 
Consistency and standards - Users should not have to wonder whether different words, situations, or actions mean the same thing. Follow platform conventions.
-We use commonly used words and icons to allow the user to navigate the app. Everything is straightforward and there are no surprises for the user.

Error prevention - Even better than good error messages is a careful design which prevents a problem from occurring in the first place. Either eliminate error-prone conditions or check for them and present users with a confirmation option before they commit to the action.
-Making new post:
-“Are you sure you want to post _____” when they click post, then “Edit” or “Post” - confirmation messages
-Choosing a gym is restrained to what is on the drop-down menu
-Users cannot post without choosing a gym
-Buttons far apart to prevent users from clicking the wrong choice accidentally

Recognition rather than recall - Minimize the user's memory load by making objects, actions, and options visible. The user should not have to remember information from one part of the dialogue to another. Instructions for use of the system should be visible or easily retrievable whenever appropriate.
-Clear directions when making a new post
-“Type your message in this box:”
-“Select a gym with this menu:”
-No hidden options, every option available to the user is clearly shown.

Flexibility and efficiency of use - Accelerators -- unseen by the novice user -- may often speed up the interaction for the expert user such that the system can cater to both inexperienced and experienced users. Allow users to tailor frequent actions.
-Login remembering? Saved passwords?
 
Aesthetic and minimalist design - Dialogues should not contain information which is irrelevant or rarely needed. Every extra unit of information in a dialogue competes with the relevant units of information and diminishes their relative visibility.
-We kept our design straight to the point, only adding instructions when necessary
-There are no hidden choices for the users to make, everything is presented to the user clearly

Help users recognize, diagnose, and recover from errors - Error messages should be expressed in plain language (no codes), precisely indicate the problem, and constructively suggest a solution.
-Look at error prevention above???
-Making a new post:
-“You cannot create an empty post” - Then “Fix” or “Cancel”
-“You cannot post without selecting a gym location, please select a gym”

Help and documentation - Even though it is better if the system can be used without documentation, it may be necessary to provide help and documentation. Any such information should be easy to search, focused on the user's task, list concrete steps to be carried out, and not be too large.
-Simple one-time instructions when logging in? “Click on new post to create a post and share you experience at a specific gym there!” Something like that
