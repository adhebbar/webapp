# webapp
Website that analyzes airbnb data, made for capital one coding challenge (https://www.mindsumo.com/contests/airbnb-sf)

I split this problem into three main parts:

1) Processing the data, and storing it in formats that could most easily be used by the browser. 

I created a script in Python (airbnb.py) to do this for me. It processed the CSV files, extracted useful data for each graph and prediction, and stored them in json format in the javascript files buisnessesData.js (for buisnesses vs independant pie chart), neighbourhoodsData.js (for listings per neighbourhood bar chart), map.js ( for google maps api) and optimizerData.js (to store data for price optimization). The script also performed some basic linear regression machine learning, to build up a model for revenue estimation.

2) Creating the graphs, as well as  revenue prediction/ price optimization.

I generated the graphs and map in the javascript file graphs.js, and I did the revenue prediction/ price optimization in optimize.js. I made use of the google api to generate the map, as well as mdbootstrap to generate graphs easily.

Bonus: The graphs are animated when they first load.

3) Making the UI 

I used a bootstrap template from w3 schools. Unfortunately, I was not very careful, and the website can only be viewed from medium sized laptop for best results. 



Assumptions while analyzing the data:

- hosts with 3 or more listings are businesses

 - While computing the booking, I only took  recently reviewed listings (last review) into consideration to ensure that the

hosts considered were unavailable because they are booked, not because they had blacked out their property.  (Must be reviewed at least march 2017)

- no of bookings: (365-yearly Availabilty)/52

- I used the weekly price when it was available, otherwise nightly price*7.

Conclusion: I barely knew any web development before attempting this challenge. I am glad to have had the opportunity to learn.

libraries used/ acknwledgements:

- md bootstrap (https://mdbootstrap.com/)
- sklearn (http://scikit-learn.org/stable/)
- google maps api (https://developers.google.com/maps/documentation/javascript/)
- site template adapted from (https://www.w3schools.com/bootstrap/bootstrap_theme_me.asp)

hosted with CMU web service at http://www.andrew.cmu.edu/user/ahebbar/webapp/
