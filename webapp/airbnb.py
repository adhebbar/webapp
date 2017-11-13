# This python script performs two main functions: 
# 1) Formats data in CSV files for various functions of the webapp
# (creating graphs, optimaization), and stores them as arrays in 
# javascript files.
# 2) Computes linear regression coefficient paramters to model
#  price prediction.  

import numpy as np
import csv
import string
import json 

#TASK 1) format data in JavaScript arrays

# formats price (eg $3.00) to integer( eg 3)
def price2int(price):
	price = price.replace(',','')
	return int(price[1:-3])

# open CSV file and convert them to numpy arrays 
data = np.array(list(csv.reader(open("airbnb-sep-2017/listings.csv", "rb"), delimiter=",")))
neighbourhoods = set(np.array(list(csv.reader(open("airbnb-sep-2017/neighbourhoods.csv", "rb"), delimiter=",")))[1:,1])

# go through CSV file and accumalate parameters
for i in range(len(data[0])):
	if (data[0][i]=="host_listings_count"):
		listingsCol = i
	if (data[0][i]=="host_id"):
		host_idCol = i
	if (data[0][i]== "property_type"):
		property_typeCol = i
	if (data[0][i] == "last_review"):
		last_reviewCol = i
	if (data[0][i] == "availability_365"):
		availability_365Col = i
	if (data[0][i] == "latitude"):
		latitudeCol = i
	if (data[0][i] == "longitude"):
		longitudeCol = i
	if (data[0][i] == "weekly_price"):
		weekly_priceCol = i
	if (data[0][i] == "price"):
		priceCol = i
	if (data[0][i]== "neighbourhood_cleansed"):
		neighbourhoodCol = i


#calculating nmber of listimgs per host 

listingsPerHost = [] # tuples of format (hostId, no. of listings)
for i in range(1,len(data)):
	if data[i][listingsCol].isdigit():
		listingsPerHost.append(( data[i][host_idCol], data[i][listingsCol]))

#create buisnessesData 
#assuption: hosts with 3 or more listings are buisnesses
listingsPerHost = set(listingsPerHost)
numHosts = len(listingsPerHost)
buisnesses, regular = 0, 0
for (host, listings) in listingsPerHost:
	if int(listings)>2:
		buisnesses +=1
	else: regular+=1
buisnessesData = [numHosts, buisnesses, regular]

#create ndictdata with number of listing per neighbourhood
ndictData = dict((el,0) for el in neighbourhoods)
for i in range(1,len(data)):
	if data[i][neighbourhoodCol] in neighbourhoods:
		ndictData[data[i][neighbourhoodCol]] +=1; 

#create optimizerData with revenue and bookings:
# assumption: Only take recently reviewed listings (last review) into consideration to ensure that the
# hosts are unavailable because they are booked, not because they are unavilable 
# recently reviewed. Must be reviewed at least march 2017
# no of bookings: (365-yearly Availabilty)/52
# format for optimizer data: latitutde, longitude, price (per night), bookings (weekly), revenue
optimizerData = []
x = []
y = []
for i in range(1,len(data)):
	if data[i][last_reviewCol]!= "":
		(year,month, day) = data[i][last_reviewCol].split("-")
		if (month>='02') and (year=='2017') : #recently reviewed = active
			price = price2int(data[i][weekly_priceCol]) if data[i][weekly_priceCol] != "" else price2int(data[i][priceCol])*7 
			# ^if listing has weekly price or not
			bookings = (365-int(data[i][availability_365Col]))/52 
			optimizerData.append( (data[i][latitudeCol], data[i][longitudeCol], price/7, bookings, price*bookings) )
			x.append(( float(data[i][latitudeCol]), float(data[i][longitudeCol])))
			y.append(price*bookings)


#create mapData with longitudes and latitudes
latitudes = data[:,latitudeCol]
longitudes = data[:,longitudeCol]
mapData = np.column_stack((latitudes,longitudes)).tolist()


#create javascript  data files 
#(the javascript fucntions can access the data in the form of arrays):
with open('mapData.js', 'w') as outfile:
	json.dump(mapData, outfile)
with open('buisnessesData.js', 'w') as outfile:
	json.dump(buisnessesData, outfile)
with open('neighbourhoodsData.js', 'w') as outfile:
	json.dump(ndictData, outfile)
with open('optimizerData.js', 'w') as outfile:
	json.dump(optimizerData , outfile)


# TASK 2: ML

import matplotlib.pyplot as plt
import numpy as np
from sklearn.model_selection import cross_val_predict
from sklearn.metrics import mean_squared_error, r2_score
from sklearn import linear_model, datasets
import matplotlib.pyplot as plt

lr = linear_model.LinearRegression()
x = np.array(x)
y = np.array(y)


# fir the data and create model
lr = lr.fit(x,y)


print('Coefficients: \n', list(lr.coef_))
print(lr.intercept_)

#coefficients were found to be: 17138.89956072564, 3928.7379267511415
# intercept was found to be: -162245.345747
# formula for linear regression: 17138.89956072564* latitude + 3928.7379267511415*longitude + -162245.345747
# the above information was used in optimize.js to predict the revenue






