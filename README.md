# gitcv-api

gitcv.io api

### Requirements
- Node.js ^18


### API
 - `DELETE: /edu/:id` - Delete user's education by ID
 - `DELETE: /employer/:id` - Delete user's employer by ID
 - `GET: /edu/:id` - Get user's education by ID
 - `GET: /employer/:id` - Get user's employer by ID
 - `GET: /user` - Get current user
 - `PATCH: /cv/:tag` - Update CV by Tag
 - `PATCH: /edu/:id` - Update user's education by ID
 - `PATCH: /employer/:id` - Update user's employer by ID
 - `PATCH: /user` - Update current user
 - `POST: /cv` - Create user's CV
 - `POST: /edu` - Create user's education
 - `POST: /employer` - Create user's employer
 - `POST: /user/sync` - Sync current user with GitHub
 - `PUT: /tag/:tag` - Update Tag for CV
