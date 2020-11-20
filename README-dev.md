# For developers and those who wish to host their own game of Fancy Snake!

**For developers:**

`npm install`
Run this once at the beginning to install required dependancies

`npm start`
Run this to spin up the server

`npm run dev`
Run this to spin up the server with nodemon watching your changes

---

**If you wish to host your own game:**

1. Set up a MySQL instance and start serving it on your machine or another host
2. Change the credentials in `DB/credentials.js` to your own:

```
module.exports = {
	host: "<YOUR HOST URL>",
	user: "<YOUR MYSQL USERNAME>",
	password: "<YOUR MYSQL PASSWORD>",
}
```

3. Run `npm start`
