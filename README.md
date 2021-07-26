# Social Media

This is a social media project where the users can share their thought in a post or a comment, and share their pleased moment through photos.

## Flow

- User will open the Home page
- On the homepage there will be popular posts and user suggestions
- User can see the detail of the post by clicking the post's card
- User can see the user's profile by clicking the "see profile" link
- There are menus on the header: Home, People, Post, Login

1. Home<br />
   This links to the Home page
2. People
   This links to the People page. All of the social media users will be showed here. If user click the "see profile" link, the web will open the Profile page. Profile page contains the detail information of the users, including their posts and albums.
   User can see the detail of the post including the comments on the post by clicking the post's card including the comments. Super Admin can add, edit, and delete the post and comments.
   On the album tab, user can see the albums and the detail of the albums by clicking its card. On Album Detail page there are all of the photos of the album; user can preview the image by clicking on it.
3. Post
   This links to Post page. It contains all of the posts of all of users. The same as the post's card on the other pages, user can see the detail of the post by clicking on it.
4. Login
   User will be logined as a Super Admin. Then some privileges such as add, edit, delete all of the posts and comments will be unlocked. User can also see his/her own profile (dummy) on "My profile" menu; and of course can logout.

## Available Scripts

To install and run the project in your local computer, you need to do:<br />

1. Open terminal<br />
2. In your terminal, run command:<br /><br />
   `git clone git@github.com:shantisetiani/social-media.git`<br />
   to clone this project.<br /><br />
   `cd social-media`<br />
   to go to the project directory. And then:<br /><br />
   `npm install`<br /><br />
3. In the project folder, copy and paste `.env.example` file and rename it into `.env`<br />

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
<br /><br />

---

## Folder Structure

    .
    ├── ...
    ├── src                         # Source Files
    │   ├── api                     # API url and configuration and all of the API call using axios
    │   ├── assets                  # All of the images used in this webApp
    │   ├── components              # Reusable components
    │   ├── config                  # Configuration of url
    │   ├── customHooks             # Custom Hooks
    │   │   └── useApiCall.js       # Custom Hooks to get data from either the redux storage or using API call
    │   ├── layout                  # Layout Components
    │   ├── pages                   # All pages of the webApp
    │   │   ├── album
    │   │   │   ├── AlbumDetail.js  # Album Detail page which contains photos
    │   │   │   └── index.js        # User's albums that showed in the user's profile
    │   │   ├── post
    │   │   │   ├── index.js        # User's posts that showed in the user's profile
    │   │   │   └── PostDetail.js   # Post Detail which contains the detail and comments of the post
    │   │   ├── AllPost.js          # All of the posts of all the users, this the one showed on the "Post" menu
    │   │   ├── Home.js             # Home page, contains the popular posts and user suggestions
    │   │   ├── NotFound.js         # Default page if the url that is entered doesn't match any page
    │   │   ├── People.js           # All of the users of this Social Media
    │   │   └── Profile.js          # The profile of the specific user, contains the detail, posts, and albums of the user
    │   ├── redux                   # Redux files, contains action and reducer
    │   ├── App.css                 # CSS styling for this webApp
    │   ├── App.js                  # Main component of this webApp, contains layout and all pages with Router
    │   ├── index.css               # General CSS styling
    │   ├── index.js                # Main component of React App, render the ReactDOM
    │   ├── reportWebVitals.js      # Function to measuring performance in the app
    │   ├── setupTests.js           # Setup for testing purpose
    │   └── store.js                # Redux store, combine all reducers
    └── ...
