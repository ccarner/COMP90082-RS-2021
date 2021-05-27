# Software Training Repository

## Project Overview

The Software Training Repository was built to address the issue of the rapid evolution and ever-changing landscape of software technologies, frameworks, and tools used in the software development process. With the consistent introduction of new updates to existing tools on a daily basis, it is often difficult for a software engineer to keep up to date with the latest emerging technologies or changes in existing solutions. Whilst there are sources of information available on the web, as a student without the necessary experiences, it can often be difficult to determine the legitimacy and appropriateness of the claims of such sources.

The Software Training Repository seeks to provide students and individuals with access to a centralized, reliable, and up to date source of information. The core of the system aims to be a community-driven hub, with students and staff being able to contribute their understanding and knowledge of various frameworks, technologies, and tools through articles and discussion forums. New articles are able to be published by students with students also being able to modify existing articles by adding new or editing outdated information.

- Working demo: [https://api.cervidae.com.au/](https://api.cervidae.com.au/)
- Documentations: [Confluence](https://confluence.cis.unimelb.edu.au:8443/display/COMP900822021SM1RR)

## Installation Guide

https://confluence.cis.unimelb.edu.au:8443/display/COMP900822021SM1RR/Deployment+Guides



## Features

**1. User**

The student and moderators should be able to register account and login. The administrator should be able to manage users’ accounts.

- Note that due to the limitation of unimelb database access, from sprint 3, we gave up developing the **user story 1.0** (Login via unimelb account) and replaced it with **user story 1.1** (Register account)

**2. Subject**

Subject is a major component of the website. The subject page should contain a subject description and the related articles and tools recommand by the website moderators. All users should be able to view the subject pages that they subscribe to. And the moderators should be able to create, delete, edit subjects, add sections to subjects and review all pending articles under each subject.


**3. Article**

Articles is a criticle function for the website to thrive. All users can create new articles and edit exsiting articles to share their ideas. However, any edictions made by students need to be reviewed by website moderators, and the moderators may approve or reject those editions. Besides users can attach tags to an article, in that case, other users will be able to search those articles based on their tags. Meanwhile, users will also be able to seach articles base on the keywords in their title.

**4. Comment**

Comment is a function for users to provide feedbacks to contents in the website. Users should be able to leave comments to articles and reply to other comments.

**5. Homepage**

After login to the website, users will be directed to their homepage. From their homepage, users should be able to see all subjects enrolled by the user. And for moderators, they should also be able to see the subjects moderated by them.

**6. Profile**

Users should have their own profile pages where they can check all the articles (and pending articles for students) they have created.



## Key Classes

### Front-end

**Server** _(Front_end/Front_end/src/)_

- [app.js](Front_end/src/app.js): The front end of the application, handles routing to different pages.

**Utils** _(Front_end/Front_end/src/utils/)_: Contains Utility classes for use by other classes.

- [utils/AuthService.js](Front_end/Front_end/src/utils/AuthService.js): Performs the authentication to the backend and stores role and authorization details.
- [utils/request.js](Front_end/Front_end/src/utils/request.js): Formatted http request for use by other classes.
- [utils/tools.js](Front_end/Front_end/src/utils/tools.js): Tools for adding and getting parameters to and from urls.

**components** _(Front_end/Front_end/src/components/)_: Contains components used on all pages.

- [components/Footer.js](Front_end/Front_end/src/components/Footer.js): The footer used on every page.
- [components/NavBar.js](Front_end/Front_end/src/components/NavBar.js): The implementation for the Navbar used on every page.

**container** _(Front_end/Front_end/src/container/)_: Contains details for every page functionality.

#### The following sections list these pages inside container folder, presenting in the folder order:

**addSection** _(Front_end/Front_end/src/container/addSection/)_: Contains class with logic for adding sections.

- [addSection/AddSection.jsx](Front_end/Front_end/src/container/addSection/AddSection.jsx): Contains logic for adding sections.

**addUserPage** _(Front_end/Front_end/src/container/addSection/)_: Contains class with logic for adding users.

- [addUserPage/AddUser.jsx](Front_end/Front_end/src/container/addUserPage/AddUser.jsx): Handles logic for adding sections.

**ArticlePage** _(Front_end/Front_end/src/container/ArticlePage/)_: Contains the classes for the page for viewing articles.

- [ArticlePage/Article.jsx](Front_end/Front_end/src/container/ArticlePage/Article.jsx): Handles the container for the viewer and associated buttons.
- [ArticlePage/EditorComponent.jsx](Front_end/Front_end/src/container/ArticlePage/EditorComponent.jsx): Actual reader component, set up for read only access.
- [ArticlePage/LikeButton.jsx](Front_end/Front_end/src/container/ArticlePage/LikeButton.jsx): users can click the button to like or unlike the article.
- [ArticlePage/Bookmark.jsx](Front_end/Front_end/src/container/ArticlePage/Bookmark.jsx): users can click the bookmark button to bookmark or unbookmark the article.

**Comment** _(Front_end/Front_end/src/container/Comment/)_: Contains the comment components on pages.

- [Comment/Comment.jsx](Front_end/Front_end/src/container/ArticlePage/Comment.jsx): Handles the container for comment system and post function of users.
- [Comment/SubComment.jsx](Front_end/Front_end/src/container/ArticlePage/SubComment.jsx):Represents individual comment item .
- [Comment/SubCommentItem.jsx](Front_end/Front_end/src/container/ArticlePage/SubCommentItem.jsx):Replys the comments of other users.

**CreateArticlePage** _(Front_end/Front_end/src/container/CreateArticlePage/)_: Handles the page for creating articles, set up differently from editing existing articles.

- [CreateArticlePage/CreateArticlePage.jsx](Front_end/Front_end/src/container/CreateArticlePage/CreateArticlePage.jsx): Handles the container for the viewer and associated buttons.
- [CreateArticlePage/EditorComponent.jsx](Front_end/Front_end/src/container/CreateArticlePage/EditorComponent.jsx): Actual reader component, set up for editing.
- [CreateArticlePage/tagComponent.jsx](Front_end/Front_end/src/container/CreateArticlePage/tagComponent.jsx): Handles adding and removing tags from articles.

**EditArticlePage** _(Front_end/Front_end/src/container/EditArticlePage/)_: Contains classes for editing articles.

- [EditArticlePage/EditorPage.jsx](Front_end/Front_end/src/container/EditArticlePage/EditorPage.jsx): Handles the container for the viewer and associated buttons.
- [EditArticlePage/EditorComponent.jsx](Front_end/Front_end/src/container/EditArticlePage/EditorComponent.jsx): Actual reader component, set up for editing.
- [EditArticlePage/tagComponent.jsx](Front_end/Front_end/src/container/EditArticlePage/tagComponent.jsx): Handles adding and removing tags from articles.

**EditingSectionPage** _(Front_end/Front_end/src/container/addSection/)_: Contains class for editing sections.

- [EditingSectionPage/EditingSection.jsx](Front_end/Front_end/src/container/EditingSectionPage/EditingSection.jsx): Contains logic for editing sections within subjects.

**FAQPage** _(Front_end/Front_end/src/container/FAQPage/)_: Contains the page for frequently asked questions (FAQ) to help use get familiar with the system.

- [FAQPage/FAQ.jsx](Front_end/Front_end/src/container/FAQPage/FAQ.jsx): FAQ page contains content to help users get familiar with the system.

**HomePage** _(Front_end/Front_end/src/container/addSection/)_: Contains the homepage.

- [HomePage/Home.jsx](Front_end/Front_end/src/container/HomePage/Home.jsx): Contains logic for the homepage, displaying subjects for each user.

**LoginPage** _(Front_end/Front_end/src/container/LoginPage/)_: Contains class that displays the login page.

- [LoginPage/Login.jsx](Front_end/Front_end/src/container/LoginPage/Login.jsx): Contains logic for logging in.

**PendingPage** _(Front_end/Front_end/src/container/PendingPage/)_: Contains classes related to pending articles for moderators.

- [PendingPage/detailedPendingPage.jsx](Front_end/Front_end/src/container/PendingPage/detailedPendingPage.jsx): Handles the container for the viewer and associated buttons for a pending article.
- [PendingPage/EditorComponent.jsx](Front_end/Front_end/src/container/PendingPage/EditorComponent.jsx): Actual reader component, set up for read only.
- [PendingPage/pendingArticleComponent.jsx](Front_end/Front_end/src/container/PendingPage/pendingArticleComponent.jsx): Component representing a pending article in the list.
- [PendingPage/PendingPage.jsx](Front_end/Front_end/src/container/PendingPage/PendingPage.jsx): Displays list of pending articles for a subject, for moderator to approve.

**ProfilePage** _(Front_end/Front_end/src/container/ProfilePage/)_: Contains classes relating to the profile page, which displays all articles published by the user.

- [ProfilePage/EditorComponent.jsx](Front_end/Front_end/src/container/ProfilePage/EditorComponent.jsx): Actual reader component, set up for editing.
- [ProfilePage/ModeratorProfilePage.jsx](Front_end/Front_end/src/container/ProfilePage/ProfilePage.jsx): Profile page for moderator, Displays list of pending articles with options to approve.
- [ProfilePage/ProfilePendingArticleComponent.jsx](Front_end/Front_end/src/container/PendingPage/ProfilePendingArticleComponent.jsx): Component representing a pending article in the list.
- [ProfilePage/StudentProfilePage.jsx](Front_end/Front_end/src/container/ProfilePage/ProfilePage.jsx): Profile page for students, like moderator page but displaying unapproved articles with option to edit.

**RegisterPage** _(Front_end/Front_end/src/container/RegisterPage/)_: Contains class for registring a new user.

- [RegisterPage/Register.jsx](Front_end/Front_end/src/container/RegisterPage/Register.jsx): Displays registration page.

**SearchPage** _(Front_end/Front_end/src/container/SearchPage/)_: Contains page for searching all articles.

- [SearchPage/search.jsx](Front_end/Front_end/src/container/SearchPage/search.jsx): Displays search options and field.

**SubjectPage** _(Front_end/Front_end/src/container/SubjectPage/)_: Contains class for displaying details for a subject.

- [SubjectPage/Subject.jsx](Front_end/Front_end/src/container/SubjectPage/Subject.jsx): Displays the articles and details related to a subject.

**WelcomePage** _(Front_end/Front_end/src/container/WelcomePage/)_: Contains the landing splash page.

- [WelcomePage/WelcomePage.jsx](Front_end/Front_end/src/container/WelcomePage/WelcomePage.jsx): Landing page.

### **User Experience Testing**
User experince testing has been performed
The exported version of our user experience testing can be found in this [folder](docs).


### Back-end

**Server** _(backend/Back_end/)_

- [app.js](backend/app.js): Working as a web server, it listens to the request sent by each connected client and be ready to respond to it. It also builds a connection with database to allow data CRUD.

**Routers** _(backend/Back_end/routers/)_: Defines a series of routers that redirect HTTP requests from the front-end to the corresponding back-end controllers based on the suffix of the request.

- [routers/article.js](backend/Back_end/routers/article.js): Redirects the incoming HTTP requests with suffix of “/article” to their corresponding functions in the article controller.
- [routers/auth.js](backend/Back_end/routers/auth.js): Redirects the incoming HTTP requests with suffix of “/article” to their corresponding functions in the article controller.
- [routers/comment.js](backend/Back_end/routers/comment.js): Redirects the incoming HTTP requests with suffix of “/article” to their corresponding functions in the article controller.
- [routers/search.js](backend/Back_end/routers/search.js): Redirects the incoming HTTP requests with suffix of “/article” to their corresponding functions in the article controller.
- [routers/section.js](backend/Back_end/routers/section.js): Redirects the incoming HTTP requests with suffix of “/article” to their corresponding functions in the article controller.
- [routers/subject.js](backend/Back_end/routers/subject.js): Redirects the incoming HTTP requests with suffix of “/article” to their corresponding functions in the article controller.
- [routers/tool.js](backend/Back_end/routers/tool.js): Redirects the incoming HTTP requests with suffix of “/article” to their corresponding functions in the article controller.
- [routers/user.js](backend/Back_end/routers/user.js): Redirects the incoming HTTP requests with suffix of “/article” to their corresponding functions in the article controller.

**Middlewares** _(backend/Back_end/middlewares/)_: Contains classes that use to verify the identity of request owners and gurantee the security of the website.

- [middlewares/auth.js](backend/Back_end/middlewares/auth.js): Contains a function to allow users to login safely, and generate an authentication token that can verity the users’ identity for their following operations.
- [middlewares/verifyToken.js](backend/Back_end/middlewares/verifyToken.js):

**Controllers** _(backend/Back_end/controllers/)_: Defines a series of functions that take the HTTP requests redirected by routers, process the requests, and generate HTTP responds to send back to the front-end.

- [controllers/article.js](backend/Back_end/controllers/article.js): Contains functions that handles the incoming HTTP requests related to articles. (e.g. publish new articles, approve pending articles, etc.)
- [controllers/comment.js](backend/Back_end/controllers/comment.js): Contains functions that handles the incoming HTTP requests related to comments. (e.g. post new comments of an article, delete or update an existing comment, etc.)
- [controllers/search.js](backend/Back_end/controllers/search.js): Contains functions that handles the incoming HTTP requests related to search. (e.g. search an article by keywords, etc.)
- [controllers/section.js](backend/Back_end/controllers/section.js): Contains functions that handles the incoming HTTP requests related to section. (e.g. add an section of article to a subject, add a comment section to an article, etc.)
- [controllers/subject.js](backend/Back_end/controllers/subject.js):Contains functions that handles the incoming HTTP requests related to subjects. (e.g. create or update a subject, etc.)
- [controllers/tool.js](backend/Back_end/controllers/tool.js): Contains functions that handles the incoming HTTP requests related to tools. (e.g. add a new tool, etc.)
- [controllers/user.js](backend/Back_end/controllers/user.js): Contains functions that handles the incoming HTTP requests related to users. (e.g. user subscribe a subject, etc.)

**Proxies** _(backend/Back_end/proxies/)_: Each class corresponds to a database document and works as an intermediate layer to provide the necessary functions for the system to communicate with that database.

- [proxies/article.js](backend/Back_end/proxies/article.js): Provides necessary CRUD function for article documents in mongoDB.
- [proxies/comment.js](backend/Back_end/proxies/comment.js): Provides necessary CRUD function for comment documents in mongoDB.
- [proxies/section.js](backend/Back_end/proxies/section.js): Provides necessary CRUD function for section documents in mongoDB.
- [proxies/subject.js](backend/Back_end/proxies/subject.js): Provides necessary CRUD function for subject documents in mongoDB.
- [proxies/tool.js](backend/Back_end/proxies/tool.js): Provides necessary CRUD function for tool documents in mongoDB.
- [proxies/user.js](backend/Back_end/proxies/user.js): Provides necessary CRUD function for user documents in mongoDB.

### Database

The database model are defined in the [backend/Back_end/models/](backend/Back_end/models) folder using Mongoose framework.

- [models/article.js](backend/Back_end/models/article.js): Defines the Article and the PendingArticle mongoose model.
- [models/comment.js](backend/Back_end/models/comment.js): Defines the Comment mongoose model and some functions auto-triggered functions related to the model.
- [models/section.js](backend/Back_end/models/section.js): Defines the Section mongoose model.
- [models/subject.js](backend/Back_end/models/subject.js): Defines the Subject mongoose model and some functions auto-triggered functions related to the model.
- [models/tool.js](backend/Back_end/models/tool.js): Defines the Tool model and some functions auto-triggered functions related to the model.
- [models/user.js](backend/Back_end/models/user.js): Defines the User mongoose model.

The document details of previous project are shown in the diagram below:

![RS-SystemDiagrams-DatabaseDiagram.png](Database%20Diagram.png)

The updated and new documents from semester 1 of COMP90082 are described below:

- The updated database schema can be found at [database_schema.pdf](docs/database_schema.pdf)

- The information about CI/CD overview, Deployment Instructions and Deployment instances can be found at [deployment_instructions.pdf](docs/deployment_instructions.pdf)

- The database unit test, integration test, and acceptance test documents can be found at [database_testing.pdf](tests/database_testing.pdf)


### API Testing

Api testing has been performed using post man collections
The exported version of our api testing can be found in this [folder](api_testing).

## Traceability matrix

<table>
  <tr>
   <td>Test Id
   </td>
   <td>Test Case
   </td>
   <td>Status
   </td>
   <td>Result
   </td>
  </tr>
  <tr>
   <td>1.1.1
   </td>
   <td>When the student fill in the userid (899909) ,username(john doe) and password (password), a new student account should be created and the account should be able to use for login
   </td>
   <td>pass
   </td>
   <td>A new account has been created and was able to login successfully
   </td>
  </tr>
  <tr>
   <td>1.1.2
   </td>
   <td>When the student fill in the userid(899909) or username which already existed in the system,
<p>
the system should display an error.
   </td>
   <td>fail
   </td>
   <td>The system was stuck in the register page and does not respond with error.
   </td>
  </tr>
  <tr>
   <td>1.2.1
   </td>
   <td>When the student/moderator fill in the correct account(student) and password(123) on the Login page, 
<p>
the student/moderator's homepage will be shown on the website. 
   </td>
   <td>pass
   </td>
   <td>Successfully login to the system
   </td>
  </tr>
  <tr>
   <td>1.2.2
   </td>
   <td>When the student/moderator fill in the wrong account(student) and password(899) on the Login page, 
<p>
the student/moderator will get an error message telling him/her the provided account information is wrong.
   </td>
   <td>pass
   </td>
   <td>Responded with error message
   </td>
  </tr>
  <tr>
   <td>1.3.1
   </td>
   <td>(admin login info(username admin2 password admin2))
<p>
When the administrator clicks the "User Management" button on the home page, the administrator should be able to add a new user into the system.
   </td>
   <td>fail
   </td>
   <td>Admin login was successful but when adding a student type into the system the system responded with error.
   </td>
  </tr>
  <tr>
   <td>2.1.1
   </td>
   <td>When the moderator clicks "Add Subject" on his/her Homepage and provides a unique subject code and other relevant information, the subject will be successfully created.
   </td>
   <td>pass
   </td>
   <td>Moderator was able to successfully add subject.
   </td>
  </tr>
  <tr>
   <td>2.1.2
   </td>
   <td>When the moderator clicks "Add Subject" on his/her Homepage and provides a duplicate subject code and other relevant information, the subject will not be successfully created.
   </td>
   <td>fail
   </td>
   <td>Adding subject has been re directed to the subject page and it does not respond error.
   </td>
  </tr>
  <tr>
   <td>2.2.1
   </td>
   <td>When the moderator clicks edit page layout in the subject page and continues by clicking "Add new section" moderator add a new section detail and publish , a  new section should be created for the subject.
   </td>
   <td>pass
   </td>
   <td>A new section was added to the subject
   </td>
  </tr>
  <tr>
   <td>2.2.2
   </td>
   <td>When the moderator click edit page layout in the subject page and continue by clicking "Add new section" moderator add a new section detail and cancelA new section should be created for the subject
   </td>
   <td>pass
   </td>
   <td>Nothing happen the operation has been cancel
   </td>
  </tr>
  <tr>
   <td>2.3.1
   </td>
   <td>When the moderator clicks "Delete" in the Edit Subject Page Layout page, and confirms the confirmation message in the pop-up window, the section will be successfully deleted.
   </td>
   <td>pass
   </td>
   <td>The section has been deleted
   </td>
  </tr>
  <tr>
   <td>2.3.2
   </td>
   <td>When the moderator clicks "Delete" in the Edit Subject Page Layout page, and cancels the confirmation message in the pop-up window, the section will not be successfully deleted.
   </td>
   <td>pass
   </td>
   <td>The operation has been cancel
   </td>
  </tr>
  <tr>
   <td>2.4.1
   </td>
   <td>When the moderator clicks "Pending Submissions" in the subject page, the moderator should be able to view pending submissions submitted by student in the page
   </td>
   <td>pass
   </td>
   <td>Moderator was able to view pending submission
   </td>
  </tr>
  <tr>
   <td>2.4.2
   </td>
   <td>When the moderator clicks approve for one of the pending submission, the moderator should be able to see the approve article in the subject page
   </td>
   <td>pass
   </td>
   <td>Moderator was able to approve th article and the article is now in the subject list
   </td>
  </tr>
  <tr>
   <td>2.4.3
   </td>
   <td>When the moderator clicks delete for one of the pending submission, the pending article should be deleted from the page
   </td>
   <td>pass
   </td>
   <td>Moderator deleted the article and the article is gone
   </td>
  </tr>
  <tr>
   <td>2.5.1
   </td>
   <td>When the student clicks the subject on his/her Homepage, the student will be directed to the subject page and see all the related materials on the Subject page.
   </td>
   <td>pass
   </td>
   <td>The page was redirected to subject page
   </td>
  </tr>
  <tr>
   <td>2.5.2
   </td>
   <td>When the moderator clicks the subject on his/her Homepage, the moderator will be directed to the subject page and see all the related materials on the Subject page as well as other moderator-exclusive options.
   </td>
   <td>pass
   </td>
   <td>The page was redirected to subject page for moderator with new options
   </td>
  </tr>
  <tr>
   <td>3.1.1
   </td>
   <td>When the moderator/student clicks "Add new article"  and click "Publish", the article should be created on the subject page.
   </td>
   <td>pass
   </td>
   <td>The article has been created
   </td>
  </tr>
  <tr>
   <td>3.1.2
   </td>
   <td>When the student clicks "Add new article"  and clicks "Publish", the pending article should be created and the moderator should be ready to review.
   </td>
   <td>pass
   </td>
   <td>The article was added to pending article list
   </td>
  </tr>
  <tr>
   <td>3.2.1
   </td>
   <td>When the student clicks the "Edit Article" button on that article's page, makes a modification, and click Save, the article will be created as a pending article. 
   </td>
   <td>fail
   </td>
   <td>The edited article was created as pending article(note but the created pending article cannot be approve)
   </td>
  </tr>
  <tr>
   <td>3.2.2
   </td>
   <td>When the moderator clicks the "Edit Article" button on that article's page, makes a modification, and clicks Save, the article will be created and published directly.
   </td>
   <td>pass
   </td>
   <td>The article was edited
   </td>
  </tr>
  <tr>
   <td>3.2.3
   </td>
   <td>When the moderator clicks the "Edit Article" button on that article's page, makes a modification, but clicks Cancel, the article will not be created.
   </td>
   <td>pass
   </td>
   <td>The operation has been cancel
   </td>
  </tr>
  <tr>
   <td>3.3.1
   </td>
   <td>When the moderator clicks the "Edit Article" button on that article's page, add or delete a new tag, the tag should be added to the article.
   </td>
   <td>pass
   </td>
   <td>A new tag was added to the article
   </td>
  </tr>
  <tr>
   <td>3.3.2
   </td>
   <td>When the student clicks the "Edit Article" button on that article's page, add or delete a new tag, the article should be added as a pending article for the moderator to review.
   </td>
   <td>fail
   </td>
   <td>The article was created as pending article(note but the created pending article cannot be approve)
   </td>
  </tr>
  <tr>
   <td>3.4.1
   </td>
   <td>When the moderator clicks the "Pending Article Submission" button on the Subject page, the moderator will see a list of all the current pending articles on that subject.
   </td>
   <td>pass
   </td>
   <td>Moderator can see list of pending article
   </td>
  </tr>
  <tr>
   <td>3.5.1
   </td>
   <td>When the moderator clicks approve for one of the pending submission, the moderator should be able to see the approve article in the subject page
   </td>
   <td>pass
   </td>
   <td>Moderator was able to approve the article and the article was added to the list
   </td>
  </tr>
  <tr>
   <td>3.5.2
   </td>
   <td>When the moderator clicks delete for one of the pending submissions, the pending article should be deleted from the page.
   </td>
   <td>pass
   </td>
   <td>Moderator was able to delete the article
   </td>
  </tr>
  <tr>
   <td>3.6.1
   </td>
   <td>When the moderator clicks the "Reject" button of a pending article on the Pending Articles Submission page, the pending article will be rejected and will not be published.
   </td>
   <td>pass
   </td>
   <td>Moderator has rejected an article and is not being added
   </td>
  </tr>
  <tr>
   <td>3.7.1
   </td>
   <td>When the moderator clicks search(SWEN90014) and types some content in the search bar, the related articles should be shown in the search list.
   </td>
   <td>fail
   </td>
   <td>The article list appear.(note the search can only able to find articles based on the tag)
   </td>
  </tr>
  <tr>
   <td>3.7.2
   </td>
   <td>When the moderator clicks search and types some content in the search bar and chooses the type of the content, the related articles should be shown in the search list.
   </td>
   <td>fail
   </td>
   <td>The article list appear ((note the search can only able to find articles based on the tag)
   </td>
  </tr>
  <tr>
   <td>3.8.1
   </td>
   <td>When the student/moderator searches the tags in the search bar, the student/moderator can find all articles tagged with the target tag.
   </td>
   <td>pass
   </td>
   <td>The article list appear if it is search with the tag
   </td>
  </tr>
  <tr>
   <td>4.1.1
   </td>
   <td>When the student/moderator type comment and post, the comment should be shown on the article page
   </td>
   <td>fail
   </td>
   <td>The comment can be added in recently created article but was not able to added in other type of article
   </td>
  </tr>
  <tr>
   <td>4.2.1
   </td>
   <td>When the student/moderator clicks the "Delete" button on his/her own comment, the comment will be successfully deleted.
   </td>
   <td>fail
   </td>
   <td>Created comment cannot be deleted
   </td>
  </tr>
  <tr>
   <td>4.3.1
   </td>
   <td>When the student/moderator click "reply" and type content and click "Post", the comment should be shown on the article page
   </td>
   <td>fail
   </td>
   <td>Comment can be reply if there is the comment that is created but due to some comment function not working fully hard to test the full scope
   </td>
  </tr>
  <tr>
   <td>5.1.1
   </td>
   <td>When the student/moderator goes to his/her Homepage, all the subjects enrolled/moderated by the student/moderator will be listed there.
   </td>
   <td>pass
   </td>
   <td>All the subject that is enrolled in or moderate by can be found
   </td>
  </tr>
  <tr>
   <td>8.1.1
   </td>
   <td>When the student/moderator clicks profile on the right side of the navigation bar, the student/moderator should be able to view the published and pending articles that they did.
   </td>
   <td>pass
   </td>
   <td>Moderator and student can see the publish and pending list
   </td>
  </tr>
</table>
