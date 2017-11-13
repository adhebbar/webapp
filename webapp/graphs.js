// This fle creates scripts to make three visulzations: 
// 1) Map of all points (Maps API used)
// 2) makes pie chart with buisnesses and listings (md boostrap API used)
// 3) makes bar graph with number of listings per neighbourHood (md boostrap API used)
// NOTE: graphs are animated while loading. Does that count for bonus?

    //Google maps Api to make Map
    function myMap() 
        {
            var mapProp= {
                center:new google.maps.LatLng(37.773972, -122.431297),
                // latitude/longitude of San Francisco 
                zoom:12,
        };
    //create map
    var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
        var image = 
        {
            url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
            // This marker is 10 pixels wide by 10 pixels high.
            size: new google.maps.Size(10, 10),
            // The origin for this image is (0, 0).
            origin: new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at (0, 32).
            anchor: new google.maps.Point(0, 32)
        };
    // create markers (all listings in data)
    for(i = 0;i<mapData.length; i++ )
        {       
        var myCenter = new google.maps.LatLng(parseFloat(mapData[i][0]),parseFloat(mapData[i][1]));
        var marker = new google.maps.Marker({
              position: myCenter,
              map: map,
              icon: image,
            });
        }

    //PIECHART,code adapted from https://mdbootstrap.com/javascript/charts/
    var ctxP = document.getElementById("pieChart").getContext('2d');
    var myPieChart = new Chart(ctxP, {
        type: 'pie',
        data: {
            labels: ["Buisnesses (more than 2 listings)", "independant"],
            datasets: [
                {
                    data: [parseInt(buisnessData[1]), parseInt(buisnessData[2])],
                    backgroundColor: ["#F7464A", "#46BFBD"],
                    hoverBackgroundColor: ["#FF5A5E", "#5AD3D1"]
                }
            ]
        },
        options: {
            responsive: true
        }    
    });

    //BARCHART, code adapted from https://mdbootstrap.com/javascript/charts/
    var backgroudColourArray = new Array(33);
    var borderColorArray = new Array(33);
    var labelArray = ["hi."];
    var dataArray = [neighbourhoodsData.length];
    for (i = 0; i<33; i++)
    {
        backgroudColourArray[i] = 'rgba(255, 99, 132, 0.2)';
        borderColorArray[i]= 'rgba(255,99,132,1)';
    }
    var i = 0;
    for (var name in neighbourhoodsData)
    {
        labelArray[i] = name;
        dataArray[i] = parseInt(neighbourhoodsData[name]);
        i++;
    }

    var ctxB = document.getElementById("barChart").getContext('2d');
    var myBarChart = new Chart(ctxB, {
    type: 'bar',
    data: {
        labels: labelArray,
        datasets: [{
            label: 'number of listings',
            data: dataArray,
            backgroundColor: backgroudColourArray,
            borderColor: borderColorArray,
            borderWidth: 1
        }]
    },
    optionss: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});

}