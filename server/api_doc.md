## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`

Routes below need authentication:

- `GET /exercise`
- `POST /exercise`
- `GET /exercise/:id`
- `DELETE /exercise/:id`
- `PUT /exercise/:id`
- `GET /muscle`
- `POST /bmi`


&nbsp;

## 1. POST /register

Request:

- body:
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_
```json
{
  "username": "string",
  "email": "string"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Email is required"
}
OR
{
  "message": "Username is required"
}
OR
{
  "message": "Not Email"
}
OR
{
  "message": "Email must unique"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 2. POST /login

Request:

- body:
```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_
```json
{
  "access_token": "<token>"
}
```

_Response (401 - Unauthorized)_
```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 3. GET /exercise

Description:
- Fetch all exercise in database.

Request:

- headers:
```json
{
  "authorization": "Bearer <token>"
}
```

_Response (200 - OK)_
```json
{
    "total": 50,
    "size": 10,
    "totalPage": 5,
    "currentPage": 1,
    "data": [
        {
            "id": 1,
            "name": "Incline Hammer Curls",
            "type": "strength",
            "MuscleId": 1,
            "equipment": "dumbbell",
            "difficulty": "beginner",
            "instructions": "string",
            "createdAt": "2024-03-15T05:24:14.388Z",
            "updatedAt": "2024-03-15T05:24:14.388Z"
        },
        {
            "id": 2,
            "name": "Wide-grip barbell curl",
            "type": "strength",
            "MuscleId": 1,
            "equipment": "barbell",
            "difficulty": "beginner",
            "instructions": "string",
            "createdAt": "2024-03-15T05:24:14.388Z",
            "updatedAt": "2024-03-15T05:24:14.388Z"
        },
  ...,
    ]
}
```

&nbsp;

## 4. POST /exercise

Description:
- Add exercise to database.

Request:

- headers:
```json
{
  "authorization": "Bearer <token>"
}
```

_Response (201 - Created)_
```json
{
    "name": "Wide-grip barbell curl",
    "type": "strength",
    "MuscleId": 1,
    "equipment": "barbell",
    "difficulty": "beginner",
    "instructions": "string",
}
```

&nbsp;

## 5. GET /exercise/:id

Description:
- Fetch exercise in database.

Request:

- headers:
```json
{
  "authorization": "Bearer <token>"
}
```
- params:
```json
{
  "id": "integer"
}
```

_Response (200 - OK)_
```json
{
    "id": 1,
    "name": "Incline Hammer Curls",
    "type": "strength",
    "MuscleId": 1,
    "equipment": "dumbbell",
    "difficulty": "beginner",
    "instructions": "string",
    "createdAt": "2024-03-15T05:24:14.388Z",
    "updatedAt": "2024-03-15T05:24:14.388Z"
}
    
```
_Response (404 - Not Found)_
```json
{
  "message": "Exercise not found"
}
```

&nbsp;

## 6. DELETE /exercise/:id

Description:
- Delete exercise by id

Request:

- headers:
```json
{
  "authorization": "Bearer <token>"
}
```

- params:
```json
{
  "id": "integer"
}
```

_Response (200 - OK)_
```json
{
  "message": "Exercise successfully deleted"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Exercise not found"
}
```

&nbsp;

## 7. PUT /exercise/:id

Description:
- Update exercise by id

Request:

- headers:
```json
{
  "authorization": "Bearer <token>"
}
```

- params:
```json
{
  "id": "integer"
}
```

- body:
```json
{
    "id": "integer",
    "name": "string",
    "type": "string",
    "MuscleId": "integer",
    "equipment": "string",
    "difficulty": "string",
    "instructions": "string"
}
```

_Response (200 - OK)_
```json
{
    "id": "integer",
    "name": "string",
    "type": "string",
    "MuscleId": "integer",
    "equipment": "string",
    "difficulty": "string",
    "instructions": "string"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Name is required"
}
OR
{
  "message": "Type is required"
}
OR
{
  "message": "MuscleId is required"
}
OR
{
  "message": "Equipment is required"
}
OR
{
  "message": "Difficulty is required"
}
OR
{
  "message": "Instructions is required"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "User coin not found"
}
```

&nbsp;

## 8. GET /muscle

Description:
- Fetch all muscle in database.

Request:

- headers:
```json
{
  "authorization": "Bearer <token>"
}
```

_Response (200 - OK)_
```json
[
   {
        "id": 1,
        "name": "biceps",
        "createdAt": "2024-03-14T14:11:37.638Z",
        "updatedAt": "2024-03-14T14:11:37.638Z"
    },
    {
        "id": 2,
        "name": "chest",
        "createdAt": "2024-03-14T14:11:37.638Z",
        "updatedAt": "2024-03-14T14:11:37.638Z"
    },
  ...,
]
```

&nbsp;

## 9. POST /bmi

- headers:
```json
{
  "authorization": "Bearer <token>"
}
```

Request:

- body:
```json
{
  "height": "integer",
  "weight": "integer"
}
```


_Response (200 - OK)_
```json
{
  "bmi": "integer",
  "status": "string"
}
```
&nbsp;

## Global Errror

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```