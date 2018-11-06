# SharePoint React Boilerplate
This application is written using ReactJS and compiled using WebpackJS

- [Getting Started](#getting-started)
	- [Prerequisites](#prerequisites)
	- [Installing Node Modules](#installing-node-modules)
- [WebPack configuration](#webpack-configuration)
	- [sp-deploy.js](#sp-deployjs)
	- [sp-config.dev.js / sp-config.prod.js](#sp-configdevjs-sp-configprodjs)
	- [webpack.config.js](#webpackconfigjs)
	- [index.html](#indexhtml)
- [Compiling Your Code](#compiling-your-code)
	- [Development](#development)
	- [Build](#build)
	- [Deployment](#deployment)
- [NPM Commands](#npm-commands)
- [Useful Resources](#useful-resources)
- [Functional Components](#functional-components)
	- [People Picker](#people-picker)
	- [Image Upload](#image-upload)
	- [Iframe](#iframe)
    - [Modal](#modal)
    - [Comments](#comments)
- [Styled Components](#styled-components)
	- [Styled Container](#styled-container)
	- [Styled Row](#styled-row)
- [Themes](#themes)
    - [Assimilate](#assimilate-theme)

## Getting Started

#### Prerequisites
You will be required to install the latest version of [NodeJS](https://nodejs.org/en/) as the project will rely heavily on NPM (Node Package Manager). Once installed check to see if NPM installed correctly by opening up a terminal or command prompt and trying `> npm --version`

If you already have nodejs on your machine but are unsure if you have the latest version of npm then run the command `> npm install -g npm@latest`


#### Installing Node Modules
In order to compile and deploy your React project you will need to download some node modules. Open a terminal, navigate to you project directory and run `> npm install`. This will download files like react, webpack, babel compilers, etc. 

## WebPack configuration
There are some files that you will need to update before so start compiling your code with webpack.

#### sp-deploy.js  
- *spFolder*
  - This is the path where you would like to upload files on SharePoint. (Ex. SiteAssets/Scripts/Test)

- *username/password*
  - These are you SharePoint sign on credentials. (Ex. my_name@mycompany.com, SuperSecretPassword123)

#### sp-config.dev.js / sp-config.prod.js
- *siteUrl*
  - This is the site SharePoint site url. (Ex. https://tenant.sharepoint.com/sites/Test)

- *projectFiles*
  - These are the files that will be uploaded to your SharePoint site.

#### webpack.config.js
- *publicPath*
  - Update this variable with the relative path to your project file located on SharePoint. This should be the same folder destination as `spFolder` located in sp-deploy.js (Ex. ../SiteAssets/Scripts/Test/)

#### index.html
- *script links*
  - Both script links will need to link to your project files. Only bundle.js and config.js are required to get your application to load.


## Compiling Your Code
#### Development
During development you will need to run the command `> npm run dev`. This command will start Webpack, which will watch and compile your code into bundle files. As you write code if the file watcher notices that a file has changed it will kick off the compiler keeping you bundle files up to date.

Keep this terminal/command prompt open while developing your code or the compiler will stop running.

Do not be alarmed by the file sizes. This file is for development only and will be a lot smaller when you do a production build.

#### Build
It is a good idea to test the production build before deploying your application. Run the command `> npm run build` to build your application with production settings and deploy to your dev environment before deploying to production.

#### Deployment
Running the command `> npm run deploy` will build your application with production settings and deploy it to the environment specified in sp-config.prod.js. 

## NPM Commands

```
If you have unit tests you may run them with this command manually

> npm run test
```

```
Used while developing your application

> npm run dev
```

```
Used to test the production build of your application

> npm run build
```

```
Used when you are ready to go into production

> npm run deploy
```

## Useful Resources
 - [ReactJS](https://facebook.github.io/react/)
 - [NodeJS](https://nodejs.org/en/)
 - [webpack](https://webpack.github.io/)
 - [SCSS](https://sass-lang.com/)














## Functional Components
Listed below are all the functional components available in this boilerplate. Each component should have a short description of what it does, all the props available for this component, and an example of how to use it.

### People Picker
The people picker component is an text input field that sends a REST call to SharePoint querying people in the company. The people picker can be either a single user input or multiple user input. You can also allow for the creation or a user if none are found.

##### Props
| Prop Name     | Type     | Default                | Description                                                                             |
|---------------|----------|------------------------|-----------------------------------------------------------------------------------------|
| onChange      | Function | -                      | When there is a new user selected the on change event will return all users in an array |
| multi         | Boolean  | false                  | Allows for multiple users to be selected                                                |
| value         | Array    | []                     | An array of user objects                                                                |
| placeholder   | String   | 'Please select a user' | Placeholder value when no users have been selected                                      |
| disabled      | Boolean  | false                  | Locks the input from any further interaction                                            |
| creatable     | Boolean  | false                  | Allows you to create people that are not found                                          |
| excludedUsers | Array    | []                     | Array of emails you would like to exclude from search                                   |

##### Usage
[//]: # (When writing code examples, please use spaces and not tabs when indenting code.)
```jsx
import PeoplePicker from '../common/people-picker';

export default class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            people: []
        }
    }

    handleOnChange(value) {
        this.setState({
            people: value
        });
    }

    render() {
        return (
            <div>
                <PeoplePicker
                    onChange={this.handleOnChange.bind(this)}
                    disabled={false}
                    placeholder="Please select multiple users"
                    multi={true}
                    value={this.state.people}
                />
            </div>
        )
    }
}

```



### Image Upload
This ImageUpload component is a simple drop target that allows for images under 800kb in size. When an image is dropped or selected from the drop target then the component will return the whole image blob to the parent. Supplying an image property will allow the user to see a preview of the image that they have selected.

##### Props
| Prop Name      | Type     | Default     | Description                                                                                           |
|----------------|----------|-------------|-------------------------------------------------------------------------------------------------------|
| onImageChange  | Function | -           | When an image under 800kb is drop/selected the event with the new image will be returned              |
| image          | URL      | -           | This is the url/data uri of an image. Usually its the image being uploaded but you can send anything. |

##### Usage
[//]: # (When writing code examples, please use spaces and not tabs when indenting code.)
```jsx
import ImageUpload from '../common/image-upload';

export default class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null
        }
    }

    /**
     * Store the image data when a new file is drop or selected
     * @param event
     */
    onImageChange(event) {
        let self = this;
        let eventTarget = event.target;
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
                reader.onloadend = function(e) {
                    self.setState({
                        image: e.target.result
                    });
                };
                reader.readAsDataURL(eventTarget.files[0]);
        }
    }

    render() {
        return (
            <div>
                <ImageUpload
                    onImageChange={this.onImageChange.bind(this)}
                    image={this.state.image}
                />
            </div>
        )
    }
}
```


### Iframe
Generates an iframe with a specific url.

##### Props
| Prop Name      | Type     | Default     								   | Description                     |
|----------------|----------|----------------------------------------------|---------------------------------|
| url            | Url      | '../Shared Documents/Forms/AllItems.aspx'    | The iframe location             |

##### Usage
[//]: # (When writing code examples, please use spaces and not tabs when indenting code.)
```jsx
import Iframe from '../common/iframe';

export default class MyComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Iframe
                    url="https://tenant.sharepoint.com/sites/SomeSite"
                />
            </div>
        )
    }
}
```

### Modal
Creates a modal that sits on top of your page. 'ModalContainer' must be mounted before calling 'modal.show' otherwise nothing will happen. 

##### Props

*ModalContainer*

| Prop Name      | Type     | Default                                      | Description                                       |
|----------------|----------|----------------------------------------------|---------------------------------------------------|
| closeLabel     | String   | '×'                                          | Close button label                                |

*modal*

| Method         | Params           | Example                                                  |
|----------------|------------------|----------------------------------------------------------|
| show           | content, options | modal.show( <p>My Modal</p>, { closeLable: 'close' } )   |
| close          | -                | modal.close()                                            |

##### Usage
[//]: # (When writing code examples, please use spaces and not tabs when indenting code.)
```jsx
import React from 'react';
import { ModalContainer, modal } from '../../common/modal';

export default class ModalView extends React.Component {
    constructor(props) {
        super(props);
    }

    showModal() {
        modal.show(
            <div>
                <h1>This is a modal</h1>
                <p>This is the content of the modal</p>
                <button type="button" onClick={() => {modal.close()} }> // Custom close action
            </div>
        )
    }

    render() {
        return (
            <div>
                <button type="button" onClick={this.showModal.bind(this)}>Show Modal</button>

                <ModalContainer/> // Must be mounted before using modal.show
            </div>
        )
    }
}
```

### Comments
Creates a textarea where comments can be added and a section where previous comments are displayed.

##### Props
| Prop Name          | Type     | Default                                      | Description                                       |
|--------------------|----------|----------------------------------------------|---------------------------------------------------|
| comments           | String   | ''                                           | String of comments                                |
| commentLabel       | String   | 'Comments'                                   | Comment section label                             |
| onAddComment       | Function | -                                            | Returns the markup for a new comment              |
| disabled           | Boolean  | false                                        | Is the add comment button disabled                |
| newCommentsVisible | Function | true                                         | Should the new comments section be visible        |

##### Usage
[//]: # (When writing code examples, please use spaces and not tabs when indenting code.)
```jsx
import Comments from '../common/comments';

export default class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: ""
        }
    }

    onCommentAdd(markup) {
        let comments = this.state.comments;
        this.setState({
            comments: comment + markup
        });
    }

    render() {
        return (
            <div>
                <Comments
                    comments={this.state.comments}
                    onCommentAdd={this.onCommentAdd.bind(this)}
                />
            </div>
        )
    }
}
```





## Styled Components
Listed below are all the styled components available in this boilerplate. Each component should have a short description of what it does, all the props available for this component, and an example of how to use it.

### Styled Container
Styled Container gives you a HTML section element with some styles to make it look nice. Styled Container is often used in conjunction with Styled Row, however this is not necessary.

##### Props
| Prop Name   | Type     | Default                     | Description                                                                             |
|-------------|----------|-----------------------------|-----------------------------------------------------------------------------------------|
| title       | String   | -                           | A title that will show at the top of your container                                     |
| description | String   | -                           | A description that will show just under your title                                      |
| className   | String   | -                           | A custom classname so that you can attach your own styles                               |

##### Usage
[//]: # (When writing code examples, please use spaces and not tabs when indenting code.)
```jsx
import StyledContainer from '../common/styled-container';

export default class MyComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <StyledContainer>
                    <p>This is a child of StyledContainer</p>
                </StyledContainer>
            </div>
        )
    }
}

```


### Styled Row
Styled row uses flex to align all element inside along a horizontal row. A more detailed explanation of how to use the grid system can be found at [FlexboxGrid](https://github.com/kristoferjoseph/flexboxgrid). (Note: This is not a responsive grid system so all columns remove screen size. col-xs-2 now becomes col-2)

##### Props
| Prop Name   | Type     | Default | Description                                                                                                   |
|-------------|----------|---------|---------------------------------------------------------------------------------------------------------------|
| rowType     | String   | -       | The type of row you want. 'reverse', 'start', 'center', 'end', 'top', 'middle', 'bottom', 'around', 'between' |

##### Usage
[//]: # (When writing code examples, please use spaces and not tabs when indenting code.)
```jsx
import StyledContainer from '../common/styled-container';
import StyledRow from '../common/styled-row';

export default class MyComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <StyledContainer>
                    {/* Even spaced columns */}
                    <StyledRow>
                        <div className="col">
                             <span>Column 1</span>
                        </div>

                        <div className="col">
                             <span>Column 2</span>
                        </div>
                    </StyledRow>

                    {/* Reverse columns */}
                    <StyledRow rowType="reverse">
                        <div className="col">
                             <input type="text"/>
                        </div>

                        <div className="col-2">
                             <button>Save</button>
                        </div>
                    </StyledRow>
                </StyledContainer>
            </div>
        )
    }
}

```






## Themes
Listed below are all the themes available in this boilerplate. Each theme should have a short description of what it does and an example of how to use it.

### Assimilate Theme
Assimilate is a basic theme to style form elements and alter the background color of your SharePoint page to be a soft gray color.

##### Usage
[//]: # (When writing code examples, please use spaces and not tabs when indenting code.)
```jsx
import '../common/styles/assimilate-theme.scss';

export default class MyComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="application assimilate-theme">
                This is my application
            </div>
        )
    }
}

```