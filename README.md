# SharePoint React Boilerplate


## Getting Started
This application is written using ReactJS and compiled using WebpackJS


#### Prerequisites
You will be required to install the latest version of [NodeJS](https://nodejs.org/en/) as the project will rely heavily on NPM (Node Package Manager). Once installed check to see if NPM installed correctly by opening up a terminal or command prompt and trying `> npm --version`

If you already have nodejs on your machine but are unsure if you have the latest version of npm then run the command `> npm install -g npm@latest`


#### Installing Node Modules
In order to compile and deploy your React project you will need to download some node modules. Open a terminal, navigate to you project directory and run `> npm install`. This will download files like react, webpack, babel compilers, etc. 

## WebPack configuration
There are some files that you will need to update before so start compiling your code with webpack.

#### sp-deploy.js
- spFolder
  - This is the path where you would like to upload files on SharePoint. (Ex. SiteAssets/Scripts/Test)

- siteUrl
  - This is the site SharePoint site url. (Ex. https://tenant.sharepoint.com/sites/Test)
  
- username/password
  - These are you SharePoint sign on credentials. (Ex. my_name@mycompany.com, SuperSecretPassword123)

#### webpack.config.js
- publicPath
  - Update this variable with the relative path to your project file located on SharePoint. This should match `spFolder` located in sp-deploy.js (Ex. ../SiteAssets/Scripts/Test/)

#### index.html
- script links
  - Both script links will need to link to your project files. Only bundle.js and config.js are required to get your application to load.


## Compiling Your Code
#### Development
During development you will need to run the command `> npm run dev`. This command will start Webpack, which will watch and compile your code into bundle files. As you write code if the file watcher notices that a file has changed it will kick off the compiler keeping you bundle files up to date.

Keep this terminal/command prompt open while developing your code or the compiler will stop running.

Do not be alarmed by the file sizes. This file is for development only and will be a lot smaller when you do a production build.

#### Production
Once the file is ready to go to production run the command `> npm run build`.


## Useful Resources
 - [ReactJS](https://facebook.github.io/react/)
 - [NodeJS](https://nodejs.org/en/)
 - [webpack](https://webpack.github.io/)
 - [SCSS](https://sass-lang.com/)