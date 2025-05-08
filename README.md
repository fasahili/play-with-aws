# Task Manager App (Serverless)

This is a simple **Task Manager** web application built using **React**, **AWS Lambda**, **API Gateway**, **DynamoDB**, and **AWS Amplify**. It demonstrates a complete serverless application architecture.

---

## Live Demo

- 🔗 **Frontend (React + Amplify):** [View App](https://dev.d14lqh6xu30ss9.amplifyapp.com/)
- 🔗 **API Endpoint (AWS API Gateway):** [Endpoint/dev/tasks/](https://c41e8ggp76.execute-api.us-east-1.amazonaws.com/dev/tasks/)


## Backend Functions
##### All Lambda functions are connected via API Gateway:
| Function    | Endpoint      | Method |
| ----------- | ------------- | ------ |
| List Tasks  | `/tasks`      | GET    |
| Create Task | `/tasks`      | POST   |
| Delete Task | `/tasks/{id}` | DELETE |


## AWS Lambda Functions

This project includes three AWS Lambda functions created directly through the AWS Console:

1. **listTasks**
   - Fetches all tasks from the DynamoDB table.
   - Triggered by a `GET` request to `/tasks`.

2. **createTask**
   - Creates a new task using a UUID, title, and optional description.
   - Triggered by a `POST` request to `/tasks`.

3. **deleteTask**
   - Deletes a task based on its ID.
   - Triggered by a `DELETE` request to `/tasks/{id}`.

### Created via AWS Console:

- Each function was built using the "Author from scratch" option.
- Runtime: **Node.js 18.x**
- Permissions: Attached an IAM role (`TasksLambdaRole`) with access to DynamoDB.
- CORS headers were manually added to support frontend integration.
- Functions were deployed and connected to API Gateway for HTTP access.

---

## Features

- Add new tasks with title and optional description
- View a list of all tasks
- Delete tasks
- Fully responsive and styled with basic CSS
- Built with a modern serverless stack

---

## Architecture Overview

- **Frontend:** React.js (created with `create-react-app`), hosted on AWS Amplify
- **Backend:**
  - AWS Lambda for business logic (list, create, delete tasks)
  - API Gateway for HTTP API exposure
  - DynamoDB to store tasks
- **Integration:** AWS Amplify to connect React frontend with backend services

---

##  Available Scripts

In the project directory, you can run:

```bash
npm install       # install dependencies
npm start         # run the app locally on http://localhost:3000
```



