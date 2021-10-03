# Interactive-web-visualisation-challenge

![Bacteria by filterforge.com](Images/bacteria.jpg)

In this assignment, I build an interactive dashboard to explore the [Belly Button Biodiversity dataset](http://robdunnlab.com/projects/belly-button-biodiversity/), which catalogs the microbes that colonize human navels.

The dataset "samples" is given in json format, which is read inside js file using d3 library.

Step #1

First off, I created a dropdown menu function where I insert all of the ID_names from names array in samples json file.

Step #2

Then, I created init function which contains all of the visualisation plots. The values were initially random (they were just sliced off from the initial dataset in order to build the structure of the plots). The visualisations are as follows:

1. Bar chart
2. Bubble chart
3. Demographic info table
4. Gauge chart


Step #3

I created a function optionChanged that has an argument called input. optionChanged is in fact an event handling function already existing in html tag. 
Inside this function, there are four sub functions, which hold a variable named "update_data". Using filter function, update_data it will expect that the selected id from data.samples equals input argument in parent function. Once the desired id is selected from dropdown menu, it will assign them to x, y values. Lastly, Plotly.restyle function will pass x and y values into the plots and will update the plots.

Since, optionChanged function is already contained in html tag, we don't need to call for it inside js file.


Submission

The final web page is deployed on GitHub pape.

(https://github.com/serdar-bayramov/Interactive-web-visualisation-challenge/)



 