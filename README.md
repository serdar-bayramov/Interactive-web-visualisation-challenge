# Interactive-web-visualisation-challenge

![Bacteria by filterforge.com](Images/bacteria.jpg)

In this assignment, we build an interactive dashboard to explore the [Belly Button Biodiversity dataset](http://robdunnlab.com/projects/belly-button-biodiversity/), which catalogs the microbes that colonize human navels.

The dataset "samples" is given in the json format, which is read inside js file using d3 library.



1. First off, we create a dropdown menu function where we insert all of the ID_names from 'names' array in 'samples' json file.

2. Then,we create 'init' function which contains all of the visualisation plots. The values were initially random (they were just sliced off from the initial dataset in order to build the structure of the plots). The visualisations are as follows:

1. Bar chart
2. Bubble chart
3. Demographic info table
4. Gauge chart

3. We then create a function called 'optionChanged' that takes an argument called 'input'. The function 'optionChanged' is in fact an event handling function which already exists in html tag. 

4. Inside 'optionChanged' function, there are four sub functions:

update_barchart()
update_bubblechart()
update_gaugechart()
update_demoinfo()

They all hold a variable named 'update_data'. Using filter function, 'update_data' expects that the selected id from data.samples equals input argument in parent function. Once the desired id is selected from dropdown menu, it will assign them to x and y values for each plot. Lastly, 'Plotly.restyle' function will pass x and y values into the plots and will update the plots.

Since, 'optionChanged' function is already contained in html tag, we don't need to call for it inside js file.


Submission

The final web page is deployed on GitHub page.




 