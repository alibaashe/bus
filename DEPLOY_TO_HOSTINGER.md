# How to Deploy This App to Hostinger

This guide will walk you through the process of building your application for the web and deploying it to your Hostinger account.

## Step 1: Build the Web Application

First, you need to create a "build" of your application. This process compiles all your code into static files (HTML, CSS, JavaScript) that can be hosted on any web server.

Run the following command in your project's terminal:

```bash
bunx expo export -p web
```

This command will create a new directory named `dist` in your project folder. This directory contains your entire website.

## Step 2: Prepare for Upload

1.  Find the `dist` folder in your project directory.
2.  You will need to upload the **contents** of this folder to Hostinger.

## Step 3: Upload to Hostinger

1.  **Log in to your Hostinger account.**
2.  Navigate to your **hPanel** and find the **File Manager** for the domain you want to use.
3.  Inside the File Manager, navigate to the `public_html` directory. This is the root directory for your website.
4.  **Delete any default files** that Hostinger might have placed in `public_html` (like `default.php` or `index.html`).
5.  Click the **Upload** button in the Hostinger File Manager.
6.  Select all the files and folders from **inside** your local `dist` folder and upload them.

Once the upload is complete, your application will be live on your domain.

If you have any questions about using the Hostinger File Manager, you can refer to their official documentation.