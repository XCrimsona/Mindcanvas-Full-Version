# What is MindCanvas? 
<p>For non-tech users: MindCanvas helps users organize information, tasks, and ideas with a visually appealing interface, and powerful layout features.</p>
<p>For tech users: A full-stack productivity app built with the MERN stack. </p>
<p>Designed for large screens | Working on better solutions for small screens</p>

## Public Collaboration
<p>Kind note: I won't grant others permission to push new features to the original code because</p> 
<ul>
  <li>Nr1: It a trial version.</li> 
  <li>Nr2: You may modify it without breaking the trial code so on your machine go nuts, its a great app, seriously...</li>
</ul>

(Instructions in development)
## Missing config | You need to create this yourself since .env uploads are dangerous
create a .env file some keys you can set. 
STRICTLY FOLLOW THE GUIDE for stable oeprations:

Install MongoDB software to run a local database as a service.

SECURE= false 
SESSION_SECRET & JWT is a 64 character string 
Another repository will have a generator for that: 32-64-character-string-generator

DB_CONNECTION_STRING | local mongodb string recomended because its designed for localhost use| 

Cloud Based: If you want to do it via mongodb cloud then change all api routes' localhost to https endpoints.
(This isnt recommended because you may havily struggle configuring the reoutes)
If you wish to go the cloud route, In the next few months, I will have the trial built for local and cloud which will include a local and cloud separated folders. 

The default api route will be configured as local 


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
