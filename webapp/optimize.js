// This file contains code to dynamically predict revenue and esitimate prices

    //predicts price based on input
    function predict()
    {
        var latitude = document.getElementById('latitude').value;
        var longitude = document.getElementById('longitude').value;

        if (isNaN(latitude) ||  isNaN(longitude))
        {
            document.getElementById("prediction result").innerHTML = "";
        }
        else
        {
             document.getElementById("prediction result").innerHTML = 
             "$".concat(17138.89956072564* latitude + 3928.7379267511415*longitude -162245.345747);
             //found using sklearn linear regression in Python (check airbnb.py for details)
        }
    }
    // optimizes price for either maximum bookings, or maximum revenue 
    // method: consider all points in approx one square mile to 
    // the given longitude  and latitude. Returns the price of 
    // the listing with the highest booking/revenue.
    function optimize()
    {
        var latitude1 = document.getElementById('latitude1').value;
        var longitude1 = document.getElementById('longitude1').value;
        console.log(latitude1);
        console.log(longitude1);
        if (isNaN(latitude1) ||  isNaN(longitude1))
        {
            document.getElementById("optimization result").innerHTML = "";
        }
        else 
        {
            var e = document.getElementById("booking/revenue");
            var BorR = e.options[e.selectedIndex].value;
            var maxElem = -1; //maxBookings or maxRevenue
            var maxPrice = 0; //price associated with maxBookings or maxRevenue
            if(BorR == "bookings")
            {
                maxCol = 3; //bookings col
            }
            else
            {
                maxCol = 4; // revenue col
            }
            for(i = 0; i< optimizerData.length; i++)
            //optimizer data format: latitutde, longitude, price (per night), bookings (weekly), revenue
            {
                var dataLat = optimizerData[i][0];
                var dataLong = optimizerData[i][1];
                var mile = 0.0144927536;
                // one mile is approx 0.0144927536 latitude at equator 
                if( (Math.abs(dataLat-latitude1)< mile) && (Math.abs(dataLong-longitude1)<mile ) )
                // in proximity to given latitude and longitude
                {
                    if(optimizerData[i][maxCol]>maxElem)
                    {
                        maxElem = optimizerData[i][maxCol];
                        maxPrice = optimizerData[i][2];
                    }
                }
            }
            if(maxPrice==0)
            {
                document.getElementById("optimization result").innerHTML = "dont have enough data";
            }
            else 
            {
                document.getElementById("optimization result").innerHTML = "$".concat(maxPrice);
            }
        }
        
    }
