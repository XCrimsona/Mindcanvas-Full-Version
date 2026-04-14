# BE ADVISED THIS DOCUMENT IS BEING IMPROVED
# What is MindCanvas? 
<p>A private, offline multi purpose tool to explore, analysize, create, make sense of complex data. For example does A4 page content feel too bland for when it comes to opening 16 word documents which makes data comparison hard to read? </p>

<p>This tool is an alternative and does not replace Word, Excel but this tool offers flexiblity that may be critized as not a clean, pure software. Yes you do require training to use it correctly but its simple compared to how a person would navigate other apps out there.

<p>MindCanvas has powerful features that permit you to bring image and video content inside the same canvas, making summaries, data extraction from past recorded videos easier than traditional platforms that promise simplicity over flexibility and strong ux/user experience.</p>

<p>Designed for large screens | Working on better solution for small screens</p>

## Public Collaboration
<p>Kind note: This is a private project and when public, users will not be given permission to push new features to the original code.</p> 

## (Instructions for local use)
<p>STRICTLY FOLLOW THE GUIDE FOR STABLE OPERATIONS:</p>

<h2>Install MongoDB software to run a local database as a service.</h2>
<div>  
<p style="inline">MongoDB Community Server Download
<a target="_blank"  href="https://www.mongodb.com/try/download/community">www.mongodb.com/try/download/community</a> 
</p>
</div>

### Missing config | You need to create this yourself since .env uploads are dangerous</p>
<p>================================================================================</p>
<p>Another repository will have a generator for that: 32-64-character-string-generator. The main page will have a 64 character string generator so you may enable your backend so run properly</p>
<ol>
  <li>
    <p>Create a new .env file and put your own keys in it. DONT Share this file with anyone.</p>
  </li>
    
  <li>
    <p>SECURE = false</p>
    <p>DB_CONNECTION_STRING = "mongodb://127.0.0.1:27017/mind-canvas?appName=mind-canvas"</p>
    <p>SESSION_SECRET = 64 character string</p>
    <p>LOCAL_URL = http://localhost:5176</p>
    <p>PORT = 5000</p>
  </li>
</ol>
<p>================================================================================</p>

## Automation
<p>Currently testing how the latest automated dual server startups function on different Operating systems.</p>
<p>.ps1 files are config files to automate the start up of servers and have no malicous code. Feel free to use an AI to help you verify.</p>

## Features
<ul> 
  <li>Smooth UX: Modern, responsive UI for organizing, creating and exploring complex data coming from the creator who uses it. The data is on your device including the database and no one else manages that data but the local creator of that data.</li>
  
  <li>Personalization: Limitless Canvaspaces. (Eg. Total privacy- no trackers, algorithms). Should there be later on, it may be a survey linked to google drive where mindcanvas creators fill the survey asked about how they are using it and which other/current features they would like to have/have improved) for better UX/User Experience.</li>
  
  <li>Fragment Management: Create, edit, delete data. (I call these pieces of data fragments).</li>
  
  <li>Reliable Backend: Built with Node.js, Express, MongoDB, and strong. (This is the first release and parts may still break.)</li>
  
  <li>Responsive Design: Uses SCSS and CSS for smooth experience across devices.</li>
  
  <li>Basic Authentication: User account creation and login powered by a library making it impossible to reverse password hashing which makes it harder to brute force for credentials. Bcrypt.js will be replaced by Argon2 for stronger login protection. The password reset feature is implemented but encryption is not yet integrated, passwords are still not physically readable even when stored in the database. </li>
</ul>

## Tests / App status
<p>The app is stable and all operations are functional</p>

## Installs and Bugs
<p>Installation and error log management guides are being improved over time. I thank you for your patience on this.</p>
<p>The app's libraries will be updated when required to ensure vulnerabilities are patched before they get exploited.</p>

## Status of the following features (Scheduled for development | Not yet started):
<ul>
  <li>Data Backups: To minimize data loss</li>
</ul>

## personal notes
<ul>
  <li>MindCanvas is not some tool with AI. This doesnt have AI in it yet. </li>
  <li>At first, April 2025, the app was designed to showcase my <i>Software Development/(Full stack) Engineer (SDE) skills which made me feel utterly useless</i>. After October 2025, I gained foresight to take it much further.</li>
  <li>I've never had got the opportunity to actively showcase my potential anywhere, thus i decided to build software that levels me up and provides flexiblity to content that other may want.</li>7 apps... failed, the 8th one... is this app. I've had many tears... but this surely is an app that will bring ease to minds and hearts. I hope this brings changes to your life, whether for work, research, or others, it's your data, be responsible for it even when i don't know what the heck you store in it. Be ethical with it... I do understand that this may also be abused in ways i dont fully see but i designed it to do good.
</ul>

## Version
**Current local version:** 2.1.1  

## Tech Stack / Languages
<p>MERN | TypeScript | Bcryptjs | Mongoose - ODM | SCSS | Tailwind | Material UI | Framer Motion | CSS</p>  


---
