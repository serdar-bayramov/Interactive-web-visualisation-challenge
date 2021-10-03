//create url to read local json file
var url = "samples.json"

d3.json(url).then(function(data) 
    {console.log(data)}
);

//this function created the dropdown menu and store all of the IDs
function dropDownMenu() {
    d3.json(url).then(function(data) {
        var idNo = data.names;
        idNo.forEach(name => {
        d3.select("#selDataset")
        .append("option")
        .attr("value", name)
        .text(name);
        })
    });
}

dropDownMenu()

//this function initialises the entire body of the structure, it contains all of the plots with values temporarily extracted from the dataset
function init() {
    d3.json(url).then(function(data) {
        var samples = Object.values(data.samples);
        
        // create bar chart
        var bar_trace = {
           
            x: samples[0].sample_values.slice(0, 10),
            y: samples[0].otu_ids.map(x => `OTU ${x}`),
            text: samples[0].otu_labels.slice(0, 10),
            type: "bar",
            orientation: "h"
        };
              
        var bar_data = [bar_trace];
        var bar_layout = {
            xaxis: {},
            yaxis: {categoryorder: "total ascending"}
        };
    
        Plotly.newPlot("bar", bar_data, bar_layout)

        // create bubble chart
        var bubble_trace = {
            x: samples[0].otu_ids.slice(0,40),
            y: samples[0].sample_values.slice(0,40),
            mode: "markers",
            marker: {
                size: samples[0].sample_values.slice(0,40),
                color: samples[0].otu_ids
            },
            text: samples[0].otu_labels.slice(0,40)
        };

        var bubble_data = [bubble_trace];

        var bubble_layout = {
            xaxis: {title: "OTU ID"}
        };
        Plotly.newPlot("bubble", bubble_data, bubble_layout);

        // create demographic info
        var demo_info = d3.select(".panel-body")
        Object.entries(data.metadata[0]).forEach(([key, value]) => 
            demo_info.append("p").text(`${key} : ${value}`)
        );
        
        // create gauge chart
        var gauge_data = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: data.metadata[0].wfreq,
              title: {text: "Belly button washing frequency"},
              type: "indicator",
              mode: "gauge+number",
              gauge: {
                axis: { range: [null, 9] },
                steps: [
                  { range: [0, 3], color: "lightgray" },
                  { range: [3, 6], color: "gray" },
                  { range: [6, 9], color: "brown" }
                ],
                threshold: {
                  line: { color: "red", width: 4 },
                  thickness: 0.75,
                  value: 9
                }
              }
            }
          ];
          
          var gauge_layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
          Plotly.newPlot('gauge', gauge_data, gauge_layout);

           
    })
}

init()

//this function contains fours sub functions to update the plots with real data points and restyle the plotly 
function optionChanged(input) {
    d3.json(url).then(function(data) {

        function update_barchart() {
            var update_data = data.samples.filter(x => x.id == input);
            var x = update_data[0].sample_values.slice(0, 10);
            var y = update_data[0].otu_ids.map(x => `OTU ${x}`);
            var text = update_data[0].otu_labels.slice(0, 10);
           
            Plotly.restyle("bar", 'x', [x]);
            Plotly.restyle("bar", 'y', [y]);
            Plotly.restyle("bar", 'text', [text])
        }

        function update_bubblechart() {
            var update_data = data.samples.filter(x => x.id == input);
            var x = update_data[0].otu_ids.slice(0, 30);
            var y = update_data[0].sample_values.slice(0, 30);
            var text = update_data[0].otu_labels.slice(0, 30);

            Plotly.restyle("bubble", 'x', [x]);
            Plotly.restyle("bubble", 'y', [y]);
            Plotly.restyle("bubble", 'text', [text])
        };

        function update_gaugechart() {
            var update_data = data.metadata.filter(x => x.id == input);
            var value = update_data[0].wfreq;
            Plotly.restyle("gauge", "value", [value])
        }

        function update_demoinfo() {
            var update_data = data.metadata.filter(x => x.id == input);
            var card = d3.select(".panel-body").html("");
            Object.entries(update_data[0]).forEach(([key, value]) => 
            card.append("p").text(`${key} : ${value}`)
            )
        }

        update_barchart(input);
        update_bubblechart(input);
        update_demoinfo(input);
        update_gaugechart(input);
    });
};
   