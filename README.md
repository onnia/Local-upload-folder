[![Build Status](https://travis-ci.org/onnia/Local-upload-folder.svg?branch=master)](https://travis-ci.org/onnia/Local-upload-folder)
[![Coverage Status](https://coveralls.io/repos/onnia/Local-upload-folder/badge.png)](https://coveralls.io/r/onnia/Local-upload-folder)

Local upload folder
===================

This is application that creates a folder that you can copy your images and its generates picture feed to your browser. 
The image gallery is using express framework to generate the web gallery to your localhost.
The images are handled with grunt task runner.

The application need to get up and running with terminal command of 

To install the dependencies use
```
npm install
```


after that hit
```
npm start
```

After that you can copy images to upload directory

Other tasks to run right now are: 


To sync files between the public folder and upload folder
```
grunt files
```

To run express server without syncing the photos 
```
grunt server

```

To delete images from public folder
```
grunt remove
```

To check code cover status

```
grunt cover
```

To check the code for typos
```
grunt test
```

The default task for grunt is to fireup the express server and start generating image to the gallery
```
grunt
```

There is one test file the easiest method to test out the app is to run "grunt" and duplicate the test file at upload folder
The the image gallery is running at localhost:1050
Port can be configured from package.json file 

The most comman error is  "EADDRINUSE" that can be handled by changing the default port from package.json file


### Original release schedule

* v0.0.9 14th of October: The  gallery is done 
 
* v0.1.0 21st of October: The gallery is being updated with the images that are copied to the img folder

* v0.4.0 28th of October: The theme for the gallery is done

* v0.8.0 4th of November: The images that are copied to the upload folder are being optimized for web use with resizing and compressing then moved to img folder. 

* v0.9.0 11th of November: Create documentation for the application

* v0.9.4 18th of November: Testing

* V1.0.0 25th of November: Application is done! :D


More documentation will be added later as soon there is some thing to documents.