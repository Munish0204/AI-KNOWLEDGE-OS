# AI Knowledge OS - MongoDB Schema

## Collections

### users

```json
{
  "_id": ObjectId,
  "name": String,
  "email": String,
  "password": String,
  "avatar": String,
  "role": "user | admin",
  "createdAt": Date,
  "updatedAt": Date
}
```

---

### chats

```json
{
  "_id": ObjectId,
  "user": ObjectId,
  "title": String,
  "messages": [
    {
      "role": "user | assistant",
      "content": String,
      "timestamp": Date
    }
  ],
  "createdAt": Date,
  "updatedAt": Date
}
```

---

### notes

```json
{
  "_id": ObjectId,
  "user": ObjectId,
  "title": String,
  "content": String,
  "tags": [String],
  "createdAt": Date,
  "updatedAt": Date
}
```

---

### documents

```json
{
  "_id": ObjectId,
  "user": ObjectId,
  "title": String,
  "filename": String,
  "fileUrl": String,
  "fileType": String,
  "size": Number,
  "createdAt": Date
}
```

---

### tasks

```json
{
  "_id": ObjectId,
  "user": ObjectId,
  "title": String,
  "description": String,
  "priority": "Low | Medium | High",
  "completed": Boolean,
  "dueDate": Date
}
```

---

### reminders

```json
{
  "_id": ObjectId,
  "user": ObjectId,
  "title": String,
  "message": String,
  "reminderDate": Date
}
```

---

### voices

```json
{
  "_id": ObjectId,
  "user": ObjectId,
  "audioFile": String,
  "transcript": String,
  "duration": Number
}
```

---

### notifications

```json
{
  "_id": ObjectId,
  "user": ObjectId,
  "title": String,
  "message": String,
  "read": Boolean
}
```