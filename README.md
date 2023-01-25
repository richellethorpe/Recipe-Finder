# Digital Dining
#### By Richelle Thorpe, Chloe ONeil, Noah Cowan, Geoffrey Gao, Brian Yoder
#### Find recipes based upon user selections

## Technologies Used
- HTML
- CSS
- BOOTSTRAP
- JAVA SCRIPT
- MARKDOWN
- ESLINT
- BABELRC
- JSON
- WEBPACK
- NODE

## Description
This webpage is built to allow users to insert their already owned ingredients and find recipes they will be able to make with said ingredients. On the splash page there is an input form that uses session storage to hold their "inventory". Once desired ingredients are inputted, users can click on meal type (breakfast, lunch or dinner), any health preference (vegan, vegetarian or pescatarian) and cook time if desired. Once 'Find Recipe' is clicked, the API will bring up recipes that include all parameters. They will then be able to click on any recipe to see the website it is from, click the favorite button to add to Favorites or refresh the page for more options. On the Favorites page their liked recipes will be listed there, and they are able to make a shopping list for any ingredients they need. The about tab has some fun information about the developers and the contact form has input for users to send us any questions or concerns.

## Setup/Installation Requirements
- Clone this repository to your desktop.
- Install all packages with $ npm install.
- Build the project using webpack with $ npm run build.
- Start a development server with $ npm run start.
- Lint JS files in the src folder with $ npm run lint.
- Go to https://api.edamam.com/api/ to obtain API key and ID.
- Add .env file and add API key and ID.
- Commit .env to protect the privacy of your API key and ID.


## Known bugs

No known bugs.
Contact form doesn't include session storage.

## License information
Copyright 2023 Richelle Thorpe, Chloe ONeil, Noah Cowan, Geoffrey Gao, Brian Yoder;
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


