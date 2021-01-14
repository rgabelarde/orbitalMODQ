# NUS Module Review Website (MODQ)

## Motivation 

Imagine this: it is the period for Module Registration, and you are interested in taking a specific module. You are seeking advice from people who have taken the module, and your current alternatives are your current university friends, seniors and perhaps the forums like reddit or NUSWhispers.
These days, many students are still hesitant to turn to such forums as they are unable to be anonymous or are afraid that people will judge them. We hope to be able to reduce this fear and have students be able to interact cross-faculty with this platform, to help garner module reviews. Picture a one-stop site for collated module reviews, with information about people’s experiences taking it, requirements and feedback on the teaching team.


## Aim 
 
We hope to make it easier and more convenient for NUS students to interact and communicate with students from other faculties in terms of understanding their experience and perspective doing the module as well as assignment and workload reviews.
The module review website allows students to post module reviews (possibly anonymously) and search for reviews easily. It will be a web-based forum where students can interact with students from other faculties via comments. Students can also vote for reviews that they find useful, allowing them to find helpful information more easily.


## How are we different from similar platforms? 

### [NUSMods](https://nusmods.com/)
Our platform will be more specific to module reviews (i.e. more on personal experiences), rather than information about the module itself from the NUS database. 

### [Quora](https://www.quora.com)
Questions asked here can be too broad, not specific to NUS students, others will not understand what module codes you may be referring to. Curriculum of modules varies across universities.

### [LumiNUS](https://luminus.nus.edu.sg)
Students can only use the forum for a specific module once they are enrolled in the module. They are not able to ask questions prior to being enrolled, hence the forum on LumiNUS is more homework/syllabus based, rather than the experience of taking the module.


## Scope of Project

A Module Review Website where students can post their reviews of various modules and search for a list of reviews for a specific module easily. They can also vote for reviews they find useful.
 
### Core features developed: 
 
Module review website
Login/Logout function
Display all reviews
Submit, edit and delete reviews as a logged in user
Allow anonymous guest users to post review
Search for reviews (by module code, name, keyword)
Sort reviews by date, or number of votes
 
Expansion of features for module review website where students can interact with students from other faculties in a chat-like interface about their experiences.
 
### Edge features developed:
 
Module review website
Upvote and downvote reviews
Comment on posted reviews 
Login/Logout with Google 

## Documentation

### Login/Logout function
The login/logout function is based on sessions, and is made with express-session and Passport.js. When a user logs in, the user is authenticated using Passport.js’s local strategy. If both the username and password are correct, the user is saved in the backend while a cookie is sent to the frontend and saved to the user's browser. This cookie is then sent back to the backend on further HTTP requests.

### Display all reviews
When a user visits the homepage of our website, the frontend sends a HTTP get request to the backend, and the backend will get all module reviews from the database and send it back to the frontend, allowing reviews to be displayed.

### Submit, edit and delete reviews as a logged in user
When a logged in user submits, edits or deletes a post, a HTTP post, patch or delete request is sent to the backend respectively, together with a cookie. The cookie identifies the user, and is used to attach a user id to the post, or to allow users to only edit and delete their own posts. The post will then be added, updated, or deleted from the database.

### Allow anonymous guest users to post review
Users have the option to post their review anonymously, whether they are logged in or not. This allows the author of the post to not be displayed. If the user is not logged in, a HTTP post request will still be sent to the backend, and a new post will still be created, but without an author. Hence, the user will not be able to edit or delete his review afterwards.

### Search for reviews (by module code, name, keyword)
For module code, the list of posts is simply filtered by module code on the frontend and displayed on the page. A user can also search for reviews using keywords. This sends a HTTP get request to the backend, which will then use Mongoose's find() function to find the appropriate reviews and send them back to the frontend.

### Sort reviews by date, or number of votes
Reviews are sorted on the frontend using JavaScript's sort() function and displayed on the page.

### Upvote and downvote reviews
The ID of the users who upvoted or downvoted a post are stored in an array, and the total number of votes is calculated using (length of upvote array - length of downvote array). Each user is allowed to upvote or downvote a post at most once.

### Comment on posted reviews 
Users who are logged in can post comments. This will send a HTTP post request to the backend, together with the ID of the post commented on. The comment will be stored in the database and retrieved when the post is viewed.

### Login/Logout with Google 
This feature is implemented using passport-google-oauth20. A new user is created from the information obtained from Google such as name and email address, and stored in the users database together with the rest of the users. Users can fill in the remaining information (year of study, etc.) afterwards.


## Problems/Bugs Fixed

When a session expires, the frontend will still display the logged-in version of the page.
Solution: Send a HTTP get request to the backend every time a link is clicked to check if the user is logged in.
Cannot style module reviews (with bold, italics, underline, links, etc.)
Solution: Use an autocomplete search box instead.
It takes a long time to find a module with a normal drop-down list.
Solution: Use a What You See Is What You Get editor instead of a normal textarea element.
User email is not verified when registering.
Solution: Change type of input from "text" to "email", and check if email is valid in the backend.
Search bar does not work for partial words.
Solution: Modify search route to do a partial search on the first word entered.


## Testing

Snapshot testing was done using Jest so that changes in the rendered output can be spotted easily and fixed if necessary.
Unit testing was done using mocha on a few of the backend routes to make sure they work as expected.


## Built With

* [Nodejs](https://nodejs.org/en/) - back-end JavaScript runtime environment
* [Express](https://expressjs.com) - Web application framework
* [React.js](https://reactjs.org) - Frontend framework used


## Authors

* **Yong Shan Rong** - [ysr25](https://github.com/ysr25)
* **Rachel Gina Abelarde** - [rgabelarde](https://github.com/rgabelarde)

Deployment: https://orbitalmodq.herokuapp.com/
