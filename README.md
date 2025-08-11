# How to Run the Project

### 1. Install the required node_modules

```bash
  npm i
```

### 2. Create Supabase account

For authentication we are using "Supabase", make sure to follow this [doc](https://breezy-homegrown-077.notion.site/Supabase-Account-Creation-and-Google-OAuth-Setup-1906736d8221808ca7abf555b44951c8) to setup Supabase properly.

- We are primarily using this to store passwords and for social-signups.

### 3. Add `.env` file at the root level with below contents

```bash
# Basic config
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Stripe keys
NEXT_PUBLIC_STRIPE_KEY=[required only if you want to use stripe service]

# Supabase keys
NEXT_PUBLIC_SUPABASE_URL=[follow the steps mentioned in supabase section to get the url]
NEXT_PUBLIC_SUPABASE_ANON_KEY=[follow the steps mentioned in supabase section to get the anon key]
```

### 4. Compile project

Start the project: Local

```bash
 npm run dev
```

Build and start the project: Production

```bash
 npm run build
 npm run start
```
