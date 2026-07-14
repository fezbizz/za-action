# Tomorrow's Workflow — Adding March Events & Going Viral

## Step 1: Find Events (Morning)
- Check Facebook: March and March, LACO, SACR, Vezi Production, Jacinta Zinhle Mangobese Zuma
- Check YouTube, TikTok for march announcements
- Check WhatsApp groups

## Step 2: Add Events to the Site
Run these commands:
```bash
cd /data/data/com.hermesagent.android/files/home/za-action
# Edit script.js to add events to the array
git add script.js
git commit -m "add: upcoming marches [DATE]"
# Set remote with token (get current token from Hermes env):
# git remote set-url origin https://fezbizz:TOKEN@github.com/fezbizz/za-action.git
git push origin main
git checkout gh-pages
git merge main
git push origin gh-pages
git checkout main
git remote set-url origin https://github.com/fezbizz/za-action.git
```

## Step 3: Amplify
- Share `https://fezbizz.github.io/za-action/` in:
  - Movement Facebook pages (comments)
  - WhatsApp groups
  - TikTok bio links
- Tell people: "Check SA Action for march schedules and live updates"

## Step 4: Repeat
- Check for new events throughout the day
- Update the events array as new marches are announced
