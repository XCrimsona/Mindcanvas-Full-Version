# What is MindCanvas? 
<p>For non-tech users: MindCanvas helps users organize information, tasks, and ideas with a visually appealing interface, and powerful layout features.</p>
<p>For tech users: A full-stack productivity app built with the MERN stack. </p>
<p>Designed for large screens | Working on better solutions for small screens</p>

## Public Collaboration
<p>I will not permit others to push new features to the original code BUT,</p> 
<ul>
  <li>nr1: it a trial version of this new app, its not perfect, I dont expect it to be</li> 
  <li>Nr2: you may modify it locally and go nuts, its a great app, seriously...</p></li>
</ul>


## Missing config | You need to create this yourself since .env uploads are dangerous
create a .env file some keys you can set. 
STRICTLY FOLLOW THE GUIDE for stable oeprations:

SECURE= false 
SESSION_SECRET and JWT is a 64 number string | my other repos will have a generator for that just download it

DB_CONNECTION_STRING | you can make it local. 
Its made for local | If you want to do it via mongodb cloud then change all api routes' locahost to https endpoints.

JWT server token security is set to 1 hour expiry
PORT 5000 | backend

Check cors in server.js file for the frontend port details

## Automation
<p>Currently working creating an automated startup using .bat files (CMD-Executable scripts) 
<p>The .bat files don't touch OS files so don't worry</p>


## personal note
<p>NOTE: MindCanvas is </p>
<ul>
  <li>One of many, but a powerful side project designed to demonstrate my <i>Software Development Engineer (SDE) skills</i> and <i>full-stack best practices</i></li>
</ul>

## Purpose
<p>This is the trial version, however, MindCanvas enables users to:</p>
<ul>
  <li>
  capture (Select), 
  </li>
  <li>structure (Move),</li>
  <li>
   and 
    visualize (See) their:
    <ul>
      <li>
       Thoughts
      </li>
      <li>
       Tasks
      </li>
      <li>
       And private project data efficiently.
      </li>
    </ul>
  </li>
</ul>

## Features
<ul> 
  <li>Visual Dashboard: Modern, responsive UI for organizing and exploring complex information.</li>
  <li>Personalization: User-specific boards and customizable workspace. (EgTotal privacy- no trackers, algorithms)</li>
  <li>Task / Idea Management: Create, edit, delete tasks, notes. (I call these notes data fragments).</li>
  <li>Project and Category organization: Group related notes, tasks, or ideas (if implemented).</li>
  <li>Reliable Backend: Built with Node.js, Express, MongoDB, and strong TypeScript typing.</li>
  <li>Responsive Design: Uses SCSS and CSS for smooth experience across devices.</li>
  <li>Basic Authentication: User account creation and login powered by Bcrypt.js (MERN stack).</li>
</ul>

## Tests
<p>The app is stable and all operation will work</p>

## Bugs
<p>Final version will be on another repository, but this will will have its vulnerabilities patched when I discover them.</p>

<ul>
  <li>I'm aware password reset isnt not avail yet, I have many other features im working on over time. I will have it done soon.</li>
  <li>Status of the following features (Scheduled for development | Not yet started):</li>
  <li>Level 2 Authentication</li>
  <li>Data Backups: To prevent data loss</li>
</ul>

<p>Installation and error log management guides coming soon</p>

## Version
**Current local version:** 2.1.1  

## Tech Stack / Languages
<p>MERN | TypeScript | Bcryptjs | Mongoose - ODM | SCSS | Tailwind | Material UI | Framer Motion | CSS</p>  


---
