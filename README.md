# gitcv-api

gitcv.io api

### Requirements
- Node.js ^18


### API
 - `GET: /user` - Get current user
 - `PATCH: /user` - Update current user
 - `POST: /user/sync` - Sync current user with GitHub
---
 - `PATCH: /cv/:tag` - Update CV by Tag
 - `POST: /cv` - Create user's CV
---
 - `PUT: /tag/:tag` - Update Tag for CV
---
 - `DELETE: /edu/:id` - Delete user's education by ID
 - `GET: /edu/:id` - Get user's education by ID
 - `PATCH: /edu/:id` - Update user's education by ID
 - `POST: /edu` - Create user's education
---
 - `DELETE: /employer/:id` - Delete user's employer by ID
 - `GET: /employer/:id` - Get user's employer by ID
 - `PATCH: /employer/:id` - Update user's employer by ID
 - `POST: /employer` - Create user's employer
