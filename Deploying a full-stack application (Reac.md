Deploying a full-stack application (React.js for frontend, Node.js with Express.js for backend, and MySQL as the database) on a VPS running OpenLiteSpeed involves several steps. Here’s a complete step-by-step guide to deploying your project.

### 1. **Set Up Your VPS**

Ensure your VPS is ready with the necessary OS and web server setup:

- **Login to your VPS** using SSH:

  ```bash
  ssh root@your-server-ip
  ```

- **Update packages**:
  ```bash
  sudo apt update
  sudo apt upgrade
  ```

### 2. **Install Required Software**

You’ll need to install Node.js, MySQL, and OpenLiteSpeed on your server.

#### 2.1. **Install Node.js**

OpenLiteSpeed comes with a package manager, so you can install Node.js like this:

```bash
sudo apt install nodejs
sudo apt install npm
```

To verify the installation:

```bash
node -v
npm -v
```

#### 2.2. **Install MySQL**

MySQL is the database used for your project. Install it on your VPS:

```bash
sudo apt install mysql-server
```

Once installed, run the MySQL secure installation to set up the root password:

```bash
sudo mysql_secure_installation
```

Login to MySQL to create your database and user for the project:

```bash
sudo mysql -u root -p
```

Create a database:

```sql
CREATE DATABASE your_database;
```

Create a user and grant permissions:

```sql
CREATE USER 'your_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON your_database.* TO 'your_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

#### 2.3. **Install OpenLiteSpeed**

OpenLiteSpeed is a fast web server that is suitable for hosting Node.js apps.

Install OpenLiteSpeed:

```bash
wget https://openlitespeed.org/packages/openlitespeed-1.7.14.tgz
tar -zxvf openlitespeed-1.7.14.tgz
cd openlitespeed
sudo bash install.sh
```

Start OpenLiteSpeed:

```bash
sudo /usr/local/lsws/bin/lswsctrl start
```

Access OpenLiteSpeed's admin panel through the browser by navigating to `http://your-server-ip:7080`. The default credentials are `admin` and `123456`, but change them immediately after logging in for security.

### 3. **Deploy the Backend (Node.js + Express.js)**

#### 3.1. **Upload Your Backend Code**

You can upload your backend files to your VPS using **FileZilla** or via **SCP**.

Place your backend files (including `server.js`, `package.json`, and `node_modules`) in a directory like `/var/www/backend`.

#### 3.2. **Install Node.js Modules**

Go to the folder where your backend is uploaded:

```bash
cd /var/www/backend
npm install
```

#### 3.3. **Test the Backend**

Run your Node.js app to make sure it works:

```bash
node server.js
```

Your backend should now be running. You can configure it to run in the background using **PM2**:

```bash
sudo npm install pm2 -g
pm2 start server.js
pm2 save
pm2 startup
```

### 4. **Deploy the Frontend (React.js)**

#### 4.1. **Build the React App**

Before uploading, build your React app locally:

```bash
npm run build
```

This will generate a `build` folder in your React project.

#### 4.2. **Upload the Build Files**

Upload the contents of the `build` folder to a directory on the VPS, such as `/var/www/frontend`.

#### 4.3. **Serve the Frontend with OpenLiteSpeed**

To serve your React app with OpenLiteSpeed:

1. Go to the **OpenLiteSpeed WebAdmin** by visiting `http://your-server-ip:7080`.
2. Under **Virtual Hosts**, create a new virtual host for your React app.
3. Set the **Document Root** to `/var/www/frontend` where you uploaded your React build.

### 5. **Connect Frontend and Backend**

Modify your React app's environment variables to point to your VPS backend. For example, in your React app's `.env` file:

```bash
REACT_APP_API_URL=http://your-server-ip:4000
```

Ensure the backend's CORS policy allows requests from the frontend domain:

```js
const cors = require("cors");
app.use(
  cors({
    origin: "http://your-server-ip", // or domain if using one
    credentials: true,
  })
);
```

### 6. **Set Up MySQL on Backend**

In your backend’s `server.js` (or equivalent), set up the connection to your MySQL database:

```js
const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "your_user",
  password: "your_password",
  database: "your_database",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err.stack);
    return;
  }
  console.log("Connected to MySQL database");
});
```

### 7. **Handle HTTPS and Domain Setup**

#### 7.1. **Set Up a Domain**

If you have a domain, point its DNS to your VPS's IP address.

#### 7.2. **Set Up SSL Certificates**

You can use **Certbot** to set up an SSL certificate:

```bash
sudo apt install certbot
sudo certbot --openlitespeed
```

This will automatically generate an SSL certificate and configure OpenLiteSpeed to use HTTPS.

### 8. **Monitor and Maintain the App**

To ensure your app is always running, monitor it using PM2:

```bash
pm2 list  # Check running processes
pm2 logs  # View logs
```

### 9. **Final Testing**

Visit your domain or server IP in the browser and test both the frontend and backend.

- The React frontend should be served by OpenLiteSpeed.
- The backend should be running on a port (e.g., `http://your-server-ip:4000`).

### Conclusion

You've now deployed your full-stack React.js, Node.js, Express.js, and MySQL app on a VPS with OpenLiteSpeed. Your backend is running using PM2, and your frontend is served via OpenLiteSpeed.
