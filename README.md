# Mailstrom
ELEC5619 Group Project

**Always create a feature branch when you are working on the code base. Create a pull request when you are done with your task to merge with master**

## Commit Message Convention

Commit messages should follow the following template.

```
<issue-type>: title/ description of the task
[issue number]

- Changes you have made.
- Another change you have made.
```
For Example:

```
feature: Add GET Contacts endpoint
[#1]

- Added HttpGet endpoint.
```

## Branch Naming Convention

```
<issue-type/[issue-number]-issue-or-description-of-the-task
```

For example:

```
feature/#1-add-get-contacts-endpoint
```

## How to run for development

#### Backend
1. In STS, import project as a maven project.
2. Run backend on a Tomcat server. Verify on `localhost:8080`. 

Note: The server will have to be restarted after every change to the backend code.

#### Front end.
1. Open a terminal in the `angular` directory. 
2. Run `npm install` to install dependencies.
3. Run `npm start` to start the front end server. `Verify on localhost:4200`. 

Note: any changes to the `angular` directory will automatically be compiled and reflected on the browser. Useful for development!
