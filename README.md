# UDACITY WEATHER APP

## WEATHER APP PROJECT
**Online Project web site:** <a href="https://udacity-weather-app.onrender.com/" target="_blank">https://udacity-weather-app.onrender.com/</a>

A project of a Node.js website that consumes the external Open Weather Map API, responsible for fetching weather information from various countries. I organized this information in the website's UI to display on the screen the data obtained from the query of the US states' zip codes.

TABLE OF CONTENTS
=================
<!-- Start Document Outline -->
   * [DESCRIPTION](#description)
   * [TECHNOLOGIES USED](#technologies-used)
   * [HOW TO USE THIS PROJECT](#how-to-use-this-project)
   * [FEATURES](#features)
<!-- End Document Outline -->

## DESCRIPTION
The project requirements involve real-time updating of the website's UI by inserting the data received from the API onto the screen using an HTML form. I enhanced the basic requirements and added another element, where the background image changes according to the weather condition. Upon reviewing the API documentation, I found that there are parameters I could use to change the background images. Additionally, on the initial homepage of the website, the image varies depending on the time of day the user accesses the site, with three variants: morning, afternoon, and evening.

I aimed to create a creative project with beautiful illustrations and used vector images in .svg format created in Adobe Illustrator. You can find the Illustrator file (.ai) containing all the illustrations in the folder: website/assets/illustrations/Project Vectorial Art Images.ai. These illustrations are very lightweight, totaling 21 SVG illustrations weighing 2.51 MB. They would be much heavier if they were in PNG or JPG format. An advantage of SVG is that it doesn't lose graphic quality even at high resolutions, regardless of the canvas size. SVG images are highly versatile and visually appealing when crafted well. Illustrator provides many export tools for SVG with various quality settings.

## TECHNOLOGIES USED
* <a href="https://nodejs.org/en" target="_blank">Node.js</a>
* <a href="https://expressjs.com/" target="_blank">Express</a>
* <a href="https://www.npmjs.com/package/cors" target="_blank">Cors</a>
* <a href="https://www.npmjs.com/package/body-parser" target="_blank">Body-Parser</a>
* <a href="https://www.npmjs.com/package/custom-env" target="_blank">Custom-Env</a>

## HOW TO USE THIS PROJECT
To use this project on your machine, clone or download it to your system, and in the project directory, use the following command:

```bash
npm install
```
With this command, Node.js will install all the project's dependencies. After installing all the dependencies, you will need an API Key from Open Weather Map. To obtain one, create an account on their website: <a href="https://openweathermap.org/ " target="_blank">https://openweathermap.org/ </a>

Once you have obtained your free API Key, you need to edit the <mark>**.env**</mark> file. In the project, there is a file named as <mark>**.env.example**</mark> with two entries:

```json
WEATHER_API_KEY=YOUR_API_KEY_HERE
PORT=YOUR_PORT_NUMBER_HERE
```
Rename this file to <mark>**.env**</mark> only, remove the <mark>**.example**</mark> extension, and edit the information for the two entries in the file, with your API Key and the port number you want the server to run on. After editing this information, you will be ready to run the <mark>**server.js**</mark> file. To start the server, execute the command:

```bash
npm run start
```
The server will be running on the specified port and can be accessed in the browser. Simply enter a US ZIP code and how you feel in the input fields to retrieve data from the API.

## FEATURES
#### Different images for each time of the day: 
The first time you open the project, there will be a different image depending on the time of day. There are three images: one for morning, one for afternoon, and one for night.

#### Different images based on the temperature returned by the API: 
Depending on the weather condition returned from the API, there will be an image dedicated to that temperature.


