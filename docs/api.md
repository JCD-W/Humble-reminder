# API documentation
Inspired by [Alexander Zagniotov's REST API docs](https://gist.github.com/azagniotov/a4b16faf0febd12efbc6c3d7370383a6)

## Internal

<details>
<summary><b>GET</b> <code>/</code> Healthcheck</summary>

### Parameters
| Name | Type   | Data type | Description |
|------|--------|-----------|-------------|
|None  |Required| N/A       | N/A         |

### Responses
| Status | Response                           | Description           |
|--------|------------------------------------|-----------------------|
| 200    | "Working."                         | The server is working |
| 500    | {message: "Internal server error"} | An error occured      |

</details>

## Authentication

<details>
<summary><b>POST</b> <code>/auth/login</code> Login (generate session token)</summary>

### Parameters
| Name | Type   | Data type | Description |
|------|--------|-----------|-------------|
| name | Required | String | The user name |
| pass | Required | String | The user password |

### Responses
| Status | Response | Description |
|--------|----------|-------------|
| 200 | {message: "Logged in successfully"} | The user logged successfuly and is provided a user token and a refreshment token|
| 400 | {message: "Name or password required"} | The name or the password are missing |
| 403 | {message: "Invalid name"} | The username provided is not a valid string |
| 403 | {message: "Wrong password"} | The password doesn't match the proper one |
| 404 | {message: "User not found"} | There are no users in the database with that name |
| 500 | {message: "Internal server error"} | An error occured |

</details>

<details>
<summary><b>PUT</b> <code>/auth/password</code> Change password</summary>

### Parameters
| Name | Type   | Data type | Description |
|------|--------|-----------|-------------|
| password | Required | String | New password |

### Responses
| Status | Response | Description |
|--------|----------|-------------|
| 200 | {message: "Password successfuly updated"} | The password was changed |
| 400 | {message: "Password required"} | The password was not provided |
| 403 | {message: "You need to login first"} | The user hasn't logged first (not the cleanest flow but verification emails was not implemented) |
| 403 | {message: "Invalid password"} | The password is invalid |
| 500 | {message: "Internal server error"} | An error occured |

</details>

<details>
<summary><b>GET</b> <code>/auth/refresh</code> Refresh session token</summary>

### Parameters
| Name | Type   | Data type | Description |
|------|--------|-----------|-------------|
| refresh-token | Required, Cookie | Token | The refreshment token |

### Responses
| Status | Response | Description |
|--------|----------|-------------|
| 200 | {message: "Token refreshed"} | The session token was refreshed |
| 403 | {message: "You need to login first"} | The user has no refresh-token |
| 500 | {message: "Internal server error"} | An error occured |

</details>

<details>
<summary><b>GET</b> <code>/auth/check</code> Check the token is valid</summary>

### Parameters
| Name | Type   | Data type | Description |
|------|--------|-----------|-------------|
| session-token | Required, Cookie | Token | The session token |

### Responses
| Status | Response | Description |
|--------|----------|-------------|
| 200 | {message: "The token is valid"} | The token is valid |
| 403 | {message: "Token invalid / Not found"} | The token is invalid or was not provided |
| 500 | {message: "Internal server error"} | An error occured |

</details>

## Archive

<details>
<summary><b>GET</b> <code>/archive/</code> Get a list of archived boards</summary>

### Parameters
| Name | Type   | Data type | Description |
|------|--------|-----------|-------------|
| Page | Optional | Int | The page, with each page containing 8 boards |

### Responses
| Status | Response | Description |
|--------|----------|-------------|
| 200 | {amount, boards: [ { id, title, description, state, creation, recent } ] } | The total amount of archived boards and a list of the archived boards in the page |
| 403 | {message: "You need to login first"} | The user session has expired or has no session token |
| 500 | {message: "Internal server error"} | An error occured |

</details>

<details>
<summary><b>GET</b> <code>/archive/column/{board}</code> Get a list of archived columns from a board</summary>

### Parameters
| Name | Type   | Data type | Description |
|------|--------|-----------|-------------|
| board | Path variable | String | The ID of the board |

### Responses
| Status | Response | Description |
|--------|----------|-------------|
| 200 | [ { id, title, state, order, tasks: [ { id, name, description, state, type, deliver_url, deadline, creation, delivery_date, position } ] } ] | A list of archived columns |
| 400 | {message: "Board not specified"} | The board's ID was not provided |
| 403 | {message: "You need to login first"} | The user session has expired or has no session token |
| 404 | {message: "Board not found"} | The specified board is not on the database |
| 500 | {message: "Internal server error"} | An error occured |

</details>

<details>
<summary><b>GET</b> <code>/archive/task/{board}</code> Get a list of archived tasks from a board</summary>

### Parameters
| Name | Type   | Data type | Description |
|------|--------|-----------|-------------|
| board | Path variable | String | The ID of the board |

### Responses
| Status | Response | Description |
|--------|----------|-------------|
| 200 | [ { id, name, description, state, type, deliver_url, deadline, creation, delivery_date, position } ] | A list of the archived tasks |
| 400 | {message: "Board not specified"} | The board's ID was not provided |
| 403 | {message: "You need to login first"} | The user session has expired or has no session token |
| 404 | {message: "Board not found"} | The specified board is not on the database |
| 500 | {message: "Internal server error"} | An error occured |

</detials>

<details>
<summary><b>POST</b> <code>/archive/board/{id}</code> Restore archived board</summary>

### Parameters
| Name | Type   | Data type | Description |
|------|--------|-----------|-------------|
| id | Path variable | String | The board ID |

### Responses
| Status | Response | Description |
|--------|----------|-------------|
| 200 | {message: "Board restored"} | The specified board was restored |
| 400 | {message: "The board is not archived"} | The board which is being restored was not archived |
| 400 | {message: "Board not specified"} | The board's ID was not provided |
| 403 | {message: "You need to login first"} | The user session has expired or has no session token |
| 404 | {message: "Board not found"} | The specified board is not on the database |
| 500 | {message: "Internal server error"} | An error occured |

</detials>

<details>
<summary><b>POST</b> <code>/archive/column/{id}</code> Restore archived column</summary>

### Parameters
| Name | Type   | Data type | Description |
|------|--------|-----------|-------------|
| id | Path variable | Int | The column ID |

### Responses
| Status | Response | Description |
|--------|----------|-------------|
| 200 | {message: "Column restored"} | The archived column was archived |
| 400 | {message: "Column not specified"} | The column ID was not provided |
| 400 | {message: "The column is not archived"} | The column being restored was not originally archived |
| 403 | {message: "You need to login first"} | The user session has expired or has no session token |
| 404 | {message: "Column not found"} | The column was not in the database |
| 500 | {message: "Internal server error"} | An error occured |

</details>

<details>
<summary><b>POST</b> <code>/archive/task/{id}</code> Restore archived task</summary>

### Parameters
| Name | Type   | Data type | Description |
|------|--------|-----------|-------------|
| id | Path variable | Int | The task ID |

### Responses
| Status | Response | Description |
|--------|----------|-------------|
| 200 | {message: "Task restored"} | The task was restored |
| 400 | {message: "Task not specified"} | The task ID was not provided |
| 400 | {message: "The task is not archived"} | The specified task was not originally archived |
| 403 | {message: "You need to login first"} | The user session has expired or has no session token |
| 404 | {message: "Task not found"} | The specified task was not found in the database |
| 500 | {message: "Internal server error"} | An error occured |
</details>

<details>
<summary><b>DELETE</b> <code>/archive/board/{id}</code> Delete archived board</summary>

### Parameters
| Name | Type   | Data type | Description |
|------|--------|-----------|-------------|
| id | Path variable | String | The board ID |

### Responses
| Status | Response | Description |
|--------|----------|-------------|
| 200 | {message: "Board deleted"} | The board was deleted |
| 400 | {message: "Board not specified"} | The board ID was not provided |
| 403 | {message: "You need to login first"} | The user session has expired or has no session token |
| 404 | {message: "Board not found"} | The specified board was not found in the database |
| 500 | {message: "Internal server error"} | An error occured |

</details>

<details>
<summary><b>DELETE</b> <code>/archive/column/{id}</code> Delete archived column</summary>

### Parameters
| Name | Type   | Data type | Description |
|------|--------|-----------|-------------|
| id | Path variable | String | The column ID |

### Responses
| Status | Response | Description |
|--------|----------|-------------|
| 200 | {message: "Column deleted"} | The column was deleted |
| 400 | {message: "Column not specified"} | The column ID was not provided |
| 403 | {message: "You need to login first"} | The user session has expired or has no session token |
| 404 | {message: "Column not found"} | The specified column was not found in the database |
| 500 | {message: "Internal server error"} | An error occured |
</details>

<details>
<summary><b>DELETE</b> <code>/archive/task/{id}</code> Delete archived task</summary>

### Parameters
| Name | Type   | Data type | Description |
|------|--------|-----------|-------------|
| id | Path variable | String | The task ID |

### Responses
| Status | Response | Description |
|--------|----------|-------------|
| 200 | {message: "Task deleted"} | The task was deleted |
| 400 | {message: "Task not specified"} | The task ID was not provided |
| 403 | {message: "You need to login first"} | The user session has expired or has no session token |
| 404 | {message: "Task not found"} | The specified task was not found in the database |
| 500 | {message: "Internal server error"} | An error occured |
</details>

## Board

<details>
<summary><b>POST</b> <code>/board/</code> Create board</summary>

### Parameters
| Name | Type   | Data type | Description |
|------|--------|-----------|-------------|
| title | Required | String | The title of the board |
| description | Optional | String | The description of the board |

### Responses
| Status | Response | Description |
|--------|----------|-------------|
| 200 | { message: "New X board created", board } | A message about the creation of the board and it's ID |
| 400 | {message: "Board title required"} | The title of the board was not provided |
| 403 | {message: "You need to login first"} | The user session has expired or has no session token |
| 500 | {message: "Internal server error"} | An error occured |
</details>

<details>
<summary><b>PUT</b> <code>/board/{id}</code> Edit board</summary>

### Parameters
| Name | Type   | Data type | Description |
|------|--------|-----------|-------------|
| id | Path variable | String | The board ID |
| title | Optional | String | The new board title |
| description | Optional | String | The new board description |

### Responses
| Status | Response | Description |
|--------|----------|-------------|
| 200 | {message: "Board updated"} | The board was updated |
| 304 | {message: "Nothing changed"} | There were no changes done to the board |
| 400 | {message: "Board not specified"} | The board ID was not provided |
| 400 | {message: "The board is deleted/archived"} | The board is either deleted or archived
| 403 | {message: "You need to login first"} | The user session has expired or has no session token |
| 404 | {message: "Board not found"} | The specified board was not found in the database |
| 500 | {message: "Internal server error"} | An error occured |

</details>

<details>
<summary><b>DELETE</b> <code>/board/{id}</code> Archive board</summary>

### Parameters
| Name | Type   | Data type | Description |
|------|--------|-----------|-------------|
| id | Path variable | String | The board ID |

### Responses
| Status | Response | Description |
|--------|----------|-------------|
| 200 | {message: "Board deleted"} | The board was archived, the reason is "deleted" is explained in [this page](explanations.md) |
| 400 | {message: "Board not specified"} | The ID of the board was not provided |
| 400 | {message: "The board is already deleted/archived"} | The specified board was already archived or it was deleted |
| 403 | {message: "You need to login first"} | The user session has expired or has no session token |
| 404 | {message: "Board not found"} | The specified board was not found in the database |
| 500 | {message: "Internal server error"} | An error occured |

</details>

<details>
<summary><b>GET</b> <code>/board/{id}</code> Get board information</summary>

### Parameters
| Name | Type   | Data type | Description |
|------|--------|-----------|-------------|
| id | Path variable | String | The board ID |

### Responses
| Status | Response | Description |
|--------|----------|-------------|
| 200 | {title, description, state, creation, recent, theme: {id, clear, primary, secondary, tertiary}} | An object with all the information of the board + theme |
| 400 | {message: "Board not specified"} | The board ID was not provided |
| 403 | {message: "You need to login first"} | The user session has expired or has no session token |
| 404 | {message: "Board not found"} | The specified board was not found in the database |
| 500 | {message: "Internal server error"} | An error occured |

</details>

<details>
<summary><b>GET</b> <code>/board/</code> Get a list of boards</summary>

### Parameters
| Name | Type   | Data type | Description |
|------|--------|-----------|-------------|
| page | Optional | Int | The page, with each page having 8 boards  |

### Responses
| Status | Response | Description |
|--------|----------|-------------|
| 200 | {amount, [{id, title, description, state, creation, recent, theme: {id, clear, primary, secondary, tertiary}}]} | An object the with the total amount of boards and a list with all the boards in the page |
| 403 | {message: "You need to login first"} | The user session has expired or has no session token |
| 500 | {message: "Internal server error"} | An error occured |

</details>

## Column
<details>
<summary><b>POST</b> <code>/column/{board}</code> Create new column</summary>

### Parameters
| Name | Type   | Data type | Description |
|------|--------|-----------|-------------|
| board | Path variable | String | The board ID |
| title | Required | String | The column title |
| position | Required | Int | The numerical order in the board |

### Responses
| Status | Response | Description |
|--------|----------|-------------|
| 200 | {message: "Column X created", column} | A message that the column was created and the ID of the new column |
| 400 | {message: "Board not specified"} | The board ID was not specified |
| 400 | {message: "Title or position required"} | One of the required parameters was not provided |
| 403 | {message: "You need to login first"} | The user session has expired or has no session token |
| 404 | {message: "Board not found"} | The specified board was not found in the database |
| 500 | {message: "Internal server error"} | An error occured |

</details>

<details>
<summary><b>PUT</b> <code>/column/{id}</code> Edit column</summary>

### Parameters
| Name | Type   | Data type | Description |
|------|--------|-----------|-------------|
| id | Path variable | String | The column ID |
| title | Required | String | The column new name |

### Responses
| Status | Response | Description |
|--------|----------|-------------|
| 200 | {message: "Column updated"} | The column was updated |
| 304 | {message: "Nothing changed"} | A new title was not provided |
| 400 | {message: "Column not specified"} | The column ID was not provided |
| 400 | {message: "The column is archived"} | The column is archived so it cannot be updated |
| 400 | {message: "The column is deleted"} | The column is deleted so it cannot be updated |
| 403 | {message: "You need to login first"} | The user session has expired or has no session token |
| 404 | {message: "Column not found"} | The specified column was not found in the database |
| 500 | {message: "Internal server error"} | An error occured |

</details>

<details>
<summary><b>PUT</b> <code>/column/move/{board}/{id}</code> Move column position</summary>

### Parameters
| Name | Type   | Data type | Description |
|------|--------|-----------|-------------|
| board | Path variable | String | The board ID |
| id | Path variable | Int | The column ID |
| position | Required | Int | The new position |

### Responses
| Status | Response | Description |
|--------|----------|-------------|
| 200 | {message: "Column moved"} | The column was moved |
| 400 | {message: "New position not specified"} | The new column position was not specified |
| 400 | {message: "Board not specified"} | The board ID was not provided |
| 400 | {message: "Column not specified"} | The column ID was not provided |
| 400 | {message: "The board is archived"} | The specified board is archived |
| 400 | {message: "The board is deleted"} | The specified board is deleted |
| 400 | {message: "The column is archived"} | The specified column is archived |
| 400 | {message: "The column is deleted"} | The specified column is deleted |
| 403 | {message: "You need to login first"} | The user session has expired or has no session token |
| 404 | {message: "Board not found"} | The board specified was not found in the database |
| 404 | {message: "Column not found"} | The column specified was not found in the database |
| 500 | {message: "Internal server error"} | An error occured |

</details>

<details>
<summary><b>DELETE</b> <code>/column/{id}</code> Archive column</summary>

### Parameters
| Name | Type   | Data type | Description |
|------|--------|-----------|-------------|
| id | Path variable | Int | The column id |

### Responses
| Status | Response | Description |
|--------|----------|-------------|
| 200 | {message: "Column deleted"} | The column was archived, the reason is "deleted" is explained in [this page](explanations.md) |
| 400 | {message: "Column not specified"} | The column ID was not provided |
| 400 | {message: "The column is archived"} | The specified column is archived |
| 400 | {message: "The column is deleted"} | The specified column is deleted |
| 403 | {message: "You need to login first"} | The user session has expired or has no session token |
| 404 | {message: "Board not found"} | The board specified was not found in the database |
| 404 | {message: "Column not found"} | The column specified was not found in the database |
| 500 | {message: "Internal server error"} | An error occured |

</details>

<details>
<summary><b>GET</b> <code>/column/{board}</code> Get the columns from a board</summary>

### Parameters
| Name | Type   | Data type | Description |
|------|--------|-----------|-------------|
| board | Path variable | String | The board ID |

### Responses
| Status | Response | Description |
|--------|----------|-------------|
| 200 | [ {id, title, state, task: [ { id, name, description, state, type, deliver_url, deadline, creation} ]} ] | A list of columns with all their tasks |
| 400 | {message: "Board not specified"} | The board ID was not provided |
| 403 | {message: "You need to login first"} | The user session has expired or has no session token |
| 404 | {message: "Board not found"} | The specified board was not found in the database |
| 500 | {message: "Internal server error"} | An error occured |

</details>

## Task

<details>
<summary><b>POST</b> <code>/task/create/{board}/{column}/</code> Create a new task</summary>

### Parameters
| Name | Type   | Data type | Description |
|------|--------|-----------|-------------|
| board | Path variable | String | The board ID |
| column | Path variable | Int | The column ID |
| name | Required | String | The task name |
| description | Required | String | The description of the task |
| type | Required | String | The type of task (normal, url, file) |

### Responses
| Status | Response | Description |
|--------|----------|-------------|
| 200 | {message: "New task created", task} | An object with a message indicating the task was created and the ID of the task |
| 400 | {message: "Board not specified"} | The board ID was not provided |
| 400 | {message: "Column not specified"} | The column ID was not provided |
| 400 | {message: "The board is archived"} | The board is archived so no new tasks can be added |
| 400 | {message: "The board is deleted"} | The board is deleted so no new tasks can be added |
| 400 | {message: "Name, description or type missing"} | One or all the required parameters were provided |
| 400 | {message: "Invalid type"} | The type provided is not valid |
| 403 | {message: "You need to login first"} | The user session has expired or has no session token |
| 404 | {message: "Board not found"} | The specified board was not found in the database |
| 404 | {message: "Column not found"} | The specified column was not found in the database |
| 500 | {message: "Internal server error"} | An error occured |

</details>

<details>
<summary><b>POST</b> <code>/task/deliver/{id}</code> Deliver task</summary>

### Parameters
| Name | Type   | Data type | Description |
|------|--------|-----------|-------------|
| id | Path variable | String | The task ID |
| file | Required (if file delivery) | Form file | The file being delivered |
| url | Required (if url delivery) | String | The url being delivered |

### Responses
| Status | Response | Description |
|--------|----------|-------------|
| 200 | {message: "Task delivered"} | The task was delivered |
| 400 | {message: "Task not specified"} | The task ID was not provided |
| 400 | {message: "The task is archived"} | The task is archived so it cannot be delivered |
| 400 | {message: "The task is deleted"} | The task is deleted so it cannot be delivered |
| 400 | {message: "This task doesn't expect a delivery"} | The task type is normal so it doesn't has anything to be delivered |
| 400 | {message: "Delivered URL not provided"} | The task type is URL but the delivered URL was not provided |
| 400 | {message: "No file provided"} | The task type is file but the delivered file was not provided |
| 403 | {message: "You need to login first"} | The user session has expired or has no session token |
| 404 | {message: "Task not found"} | The task specified was not found in the database |
| 500 | {message: "Internal server error"} | An error occured |

</details>

<details>
<summary><b>PUT</b> <code>/task/{id}</code> Edit task</summary>

### Parameters
| Name | Type   | Data type | Description |
|------|--------|-----------|-------------|
| id | Path variable | Int | The task ID |
| name | Optional | String | The new task name |
| desc | Optional | String | The new task description |
| type | Optional | String | The new task type |
| deadline | Optional | Date | The new task deadline date |

### Responses
| Status | Response | Description |
|--------|----------|-------------|
| 200 | {message: "Task updated"} | The task was edited |
| 304 | {message: "Nothing changed"} | Nothing about the task changed |
| 400 | {message: "Task not specified"} | The task ID was not specified |
| 400 | {message: "The task is archived"} | The task is archived so it cannot be edited |
| 400 | {message: "The task is deleted"} | The task is deleted so it cannot be edited |
| 403 | {message: "You need to login first"} | The user session has expired or has no session token |
| 404 | {message: "Task not found"} | The task specified was not found in the database |
| 500 | {message: "Internal server error"} | An error occured |

</details>

<details>
<summary><b>PUT</b> <code>/task/move/{id}</code> Move task inside a column</summary>

### Parameters
| Name | Type   | Data type | Description |
|------|--------|-----------|-------------|
| id | Path variable | Int | The task ID |
| position | Required | Int | The new task position |

### Responses
| Status | Response | Description |
|--------|----------|-------------|
| 200 | {message: "Task position changed"} | The task position was changed |
| 400 | {message: "No task specified"} | The task ID was not provided |
| 400 | {message: "Position not specified"} | The new position was not provided |
| 400 | {message: "The task is archived"} | The task is archived so it cannot change position |
| 400 | {message: "The task is deleted"} | The task is deleted so it cannot change position |
| 403 | {message: "You need to login first"} | The user session has expired or has no session token |
| 404 | {message: "Task not found"} | The task specified was not found in the database |
| 500 | {message: "Internal server error"} | An error occured |

</details>

<details>
<summary><b>PUT</b> <code>/task/{board}/{id}/move</code> Move task to another column</summary>

### Parameters
| Name | Type   | Data type | Description |
|------|--------|-----------|-------------|
| board | Path variable | String | The board ID |
| id | Path variable | Int | The task ID |
| columnId | Required | Int | The ID of the column is being moved to |

### Responses
| Status | Response | Description |
|--------|----------|-------------|
| 200 | {message: "Column changed"} | The task was moved to another column |
| 400 | {message: "No task specified"} | The task ID was not provided |
| 400 | {message: "Board not specified"} | The board Id was not provided |
| 400 | {message: "Column not specified"} | The column the task is moved to was not specified |
| 400 | {message: "The board is archived"} | The board is archived
| 400 | {message: "The board is deleted"} | The board is deleted
| 400 | {message: "The column is archived"} | The target column is archived
| 400 | {message: "The column is deleted"} | The target column is deleted
| 400 | {message: "The task is archived"} | The task is archived so it cannot be moved
| 400 | {message: "The task is deleted"} | The task is deleted so it cannot be moved
| 403 | {message: "You need to login first"} | The user session has expired or has no session token |
| 404 | {message: "Board not found"} | Specified board was not found in the database
| 404 | {message: "Column not found"} | Specified column was not found in the database
| 404 | {message: "Task not found"} | Specified task was not found int he database
| 500 | {message: "Internal server error"} | An error occured |

</details>

<details>
<summary><b>DELETE</b> <code>/task/{id}</code> Archive task</summary>

### Parameters
| Name | Type   | Data type | Description |
|------|--------|-----------|-------------|
| id | Path variable | Int | The task ID |

### Responses
| Status | Response | Description |
|--------|----------|-------------|
| 200 | {message: "Task deleted"} | The task was archived, the reason is "deleted" is explained in [this page](explanations.md) |
| 400 | {message: "Task not specified"} | The task ID was not provided
| 400 | {message: "The task is archived"} | The task is already archived
| 400 | {message: "The task is deleted"} | The task is deleted
| 403 | {message: "You need to login first"} | The user session has expired or has no session token |
| 404 | {message: "Task not found"} | The task specified was not found in the database |
| 500 | {message: "Internal server error"} | An error occured |

</details>

<details>
<summary><b>DELETE</b> <code>/task/deliver/{id}</code> Delete task deliver</summary>

### Parameters
| Name | Type   | Data type | Description |
|------|--------|-----------|-------------|
| id | Path variable | Int | The task ID |

### Responses
| Status | Response | Description |
|--------|----------|-------------|
| 200 | {message: "delivery deleted"} | The delivered URL or file was deleted |
| 400 | {message: "Task not specified"} | The task ID was not provided |
| 400 | {message: "The task is archived"} | The task is archived |
| 400 | {message: "The task is deleted"} | The task is deleted |
| 400 | {message: "The task doesn't have anything delivered"} | The task doesn't have any deliveries yet |
| 403 | {message: "You need to login first"} | The user session has expired or has no session token |
| 404 | {message: "Task not found"} | The task specified was not found in the database |
| 500 | {message: "Internal server error"} | An error occured |

</details>

## Theme

<details>
<summary><b>POST</b> <code>/theme/</code> Create theme</summary>

### Parameters
| Name | Type   | Data type | Description |
|------|--------|-----------|-------------|
| clear | Required | String | The clear color in the palette |
| primary | Required | String | The primary color in the palette |
| secondary | Required | String | The secondary color in the palette |
| tertiary | Required | String | The third color in the palette |
| board | Optional | String | The ID of the board the palette is for |

### Responses
| Status | Response | Description |
|--------|----------|-------------|
| 200 | {message: "Theme created", theme} | An object with a message indicating the theme was created and the ID of the new theme |
| 400 | {message: "Colors missing"} | One of the four colors is missing |
| 400 | {message: "Not a valid color"} | One of the four colors is invalid |
| 403 | {message: "You need to login first"} | The user session has expired or has no session token |
| 500 | {message: "Internal server error"} | An error occured |

</details>

<details>
<summary><b>PUT</b> <code>/theme/{board}</code> Apply color palette to the board</summary>

### Parameters
| Name | Type   | Data type | Description |
|------|--------|-----------|-------------|
| board | Path variable | String | The board ID |
| theme | Required | Int | The ID of the theme |

### Responses
| Status | Response | Description |
|--------|----------|-------------|
| 200 | {message: "Board theme changed"} | The color palette of the board was changed |
| 400 | {message: "No board provided"} | The ID of the board was not provided |
| 400 | {message: "The board is archived"} | The board is archived so it cannot be modified |
| 400 | {message: "The board is deleted"} | The board is deleted so it cannot be modified |
| 403 | {message: "You need to login first"} | The user session has expired or has no session token |
| 404 | {message: "Theme not found"} | The specified theme was not found in the database |
| 404 | {message: "Board not found"} | The specified board was not found in the database |
| 500 | {message: "Internal server error"} | An error occured |

</details>

<details>
<summary><b>GET</b> <code>/theme/{id}</code> Get the theme colors</summary>

### Parameters
| Name | Type   | Data type | Description |
|------|--------|-----------|-------------|
| id | Path variable | Int | The theme ID |

### Responses
| Status | Response | Description |
|--------|----------|-------------|
| 200 | {clear, primary, secondary, tertiary} | The colors in the theme |
| 400 | {message: "No theme provided"} | The ID of the theme was not provided |
| 403 | {message: "You need to login first"} | The user session has expired or has no session token |
| 404 | {message: "Theme not found"} | The specified theme was not found in the database
| 500 | {message: "Internal server error"} | An error occured |

</details>

<details>
<summary><b>GET</b> <code>/theme/</code> Request a list of all themes</summary>

### Parameters
| Name | Type   | Data type | Description |
|------|--------|-----------|-------------|
| page | Optional | Int | The page number, with each page containing 20 themes |

### Responses
| Status | Response | Description |
|--------|----------|-------------|
| 200 | {amount, themes: [ {id, clear, primary, secondary, tertiary} ]} | An object with the total amount of themes and a list of themes |
| 403 | {message: "You need to login first"} | The user session has expired or has no session token |
| 500 | {message: "Internal server error"} | An error occured |

</details>