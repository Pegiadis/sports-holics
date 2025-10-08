# Reset Strapi Admin Password

## If You Forgot Your Password

### Method 1: Using Strapi CLI (Recommended)

1. **Stop Strapi server** (Ctrl+C in terminal)

2. **Run reset command**:
```bash
cd sportsholics-website/sportsholics-backend
npm run strapi admin:reset-user-password
```

3. **Follow prompts**:
   - Enter your admin email
   - Enter new password (min 8 characters)
   - Confirm password

4. **Restart Strapi**:
```bash
npm run develop
```

5. **Login** at `http://localhost:1337/admin` with new password

---

### Method 2: Start Fresh (Nuclear Option)

If Method 1 doesn't work or you want to start over:

1. **Stop Strapi** (Ctrl+C)

2. **Delete database** (Windows PowerShell):
```powershell
cd sportsholics-website/sportsholics-backend
Remove-Item -Recurse -Force .tmp
```

Or manually delete the `.tmp` folder in `sportsholics-backend/`

3. **Restart Strapi**:
```bash
npm run develop
```

4. **Browser will open** to registration page
5. **Create new admin account**

⚠️ **Warning**: This will delete ALL your content (articles, images, etc.)

---

### Method 3: Find Your Email (Not Password)

If you just forgot which email you used:

1. **Install DB Browser for SQLite**: https://sqlitebrowser.org/
2. **Open**: `sportsholics-backend/.tmp/data.db`
3. **Browse Data** → `admin_users` table
4. You'll see your email (but password is encrypted)

---

## 📝 Create Strong Admin Credentials

When resetting or creating new admin:

**Email**: Use a real email you have access to
**Password**: 
- Minimum 8 characters
- Mix of upper/lowercase
- Include numbers
- Example: `SportsAdmin2025!`

---

## 💡 Prevent This in Future

1. **Write down credentials** immediately after creating
2. Use a **password manager** (1Password, LastPass, Bitwarden)
3. Use an email you regularly check
4. Keep a backup of your `.tmp` folder if you have important data

---

## 🔒 Security Note

Your password is:
- ✅ **Encrypted** with bcrypt in database
- ✅ **Not** stored in code files
- ✅ **Not** visible anywhere in plain text
- ✅ **Safe** even if someone accesses your files

This is good security practice! It just means you need to remember it. 😊

---

## Need Help?

If reset command fails:
1. Make sure Strapi is **stopped** (no server running)
2. Make sure you're in correct directory
3. Try Method 2 (fresh start)
4. Check Strapi is properly installed: `npm list @strapi/strapi`

