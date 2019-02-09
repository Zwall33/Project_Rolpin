//Tableau de 10 valeurs (Nb de pli à l'heure et nb de stack par quart)
//import {get} from './db.js';
var Nb_plis_heure = new Array(10);
var Nb_stack_quart = new Array(10);
var query_err = 0;

var inter = 5000
var y_Humi=0;
var z_Temp=0;

function ShiftTab(t){
    for (i = 0; i < 9; i++) {
        t[i]=t[i+1];  
    }
}

function GetTime(){
    
    var d = new Date();
    var t = d.getTime()/inter;
    var tamp = parseInt(t);
    tamp = t - tamp;
    tamp = tamp.toPrecision(3);
    t = t -tamp;
    t = t * inter;

    return t;
}

function dataserie(car){
    var data = [],
    time = GetTime(),
    i;

    if(car == 'T') {
        ShiftTab(Nb_plis_heure);
        for (i = -9; i <= 0; i += 1) {
            data.push([time + i * inter,Nb_plis_heure[i+9]]);
        }
        document.getElementById("temp").innerHTML = Nb_plis_heure[9] + '°C ';
    }
    if(car == 'H') {
        ShiftTab(Nb_stack_quart);
        for (i = -9; i <= 0; i += 1) {
            data.push([time + i * inter,Nb_stack_quart[i+9]]);
        }
        document.getElementById("humi").innerHTML = Nb_stack_quart[9] + '%';
    return data;
    }
}


    /*$.get(releves.js, {},function(result){// init tab
        var j = 0;
        for (i=9; i>=0 ;i--){
            Nb_plis_heure[i] = result[i].Nb_plis_heure;
            Nb_stack_quart[i] = result[i].Nb_stack_quart;
            j++;
        }

        $(function () {/////////////////////////////////// graphique Temperature et Humidite
            /////////// graph 1 /////////////////////
            var myChart = Highcharts.chart('container', {
                chart: {
                    backgroundColor: '#313031',
                    type: 'spline',
                    marginRight: 85,
                    events: {
                    load: function () {
                        
                        var series = this.series[0];
                        var series1 = this.series[1];
                        setInterval(function () {
                                        ShiftTab(Temperature);
                                        ShiftTab(Humidite);
                                        $(function(){ //attention blocage CORS donc ajout d'extention "Allow-Control-Allow-Origin: *" à chrome
                                            $.get('http://127.0.0.1:3000/data_capteur', {},function(data_capteur){
                                                z_Temp = data_capteur[0].Temperature;
                                                y_Humi = data_capteur[0].Humidite;
                                                var x =GetTime(); // current time
                                                Temperature[9] = z_Temp;
                                                Humidite[9] = y_Humi;
                                                series.addPoint([x, z_Temp], false, true);
                                                series1.addPoint([x, y_Humi], true, true);
                                                document.getElementById("temp").innerHTML = z_Temp + '°C';
                                                document.getElementById("humi").innerHTML = y_Humi + '%';
                                            });
                                        });
                                    }, inter);
                        }
                    }
                    
                },

                time: {
                    useUTC: false
                },

        /////////----Legend----////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                legend: {
                    itemStyle: {                // couleur et format du texte des legendes //
                        color: '#e0e0e3',
                        fontWeight: 'bold'
                    },
                    itemHoverStyle: {
                        color: '#b8b8b8'
                    }
                },
                
        /////////----Titre Graphique----////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                title: {
                    text: 'Stat Info Jardin Connecté',
                    align: 'center',
                    style: {
                        color: '#e0e0e3',
                        fontWeight: 'bold'
                    }
                },

        /////////----Exporter Graphique----////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                exporting: {
                    enabled: false  //enlève l'option pour exporter le graphique en format pdf, png ...
                },

        /////////----Axe des abscisse----//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                xAxis: {
                    type: 'datetime',
                    tickPixelInterval: 10,
                    labels: {
                        format: '{value:%H:%M:%S}',
                    }
                },

                tooltip: {
                    xDateFormat: '%d/%m/%Y <br> %H:%M:%S',
                    style: {
                        color: '#e0e0e3',  
                    },
                    borderColor: '#b8b8b8',
                    backgroundColor: '#313031',
                    shared : true
                },

        /////////----Axe des ordonné----///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                
                yAxis: [
                //----Axe des ordonné N°1----//
                            {
                                lineColor: '#ff0000',
                                lineWidth: 3,
                                labels: {
                                    style: {
                                        color: '#ff0000',
                                    },
                                    format : '{value} °C'
                                },
                            title: {
                                text: 'Température',
                    
                                style: {
                                    color: '#ff0000',
                                    fontWeight : 'bold'
                                }
                            }
                            },
                
                //----Axe des ordonné N°2  03b9ff----//
                            {
                                opposite: true,
                                lineColor: '#038197',
                                lineWidth: 3,
                                labels: {
                                    style: {
                                        color: '#038197',    
                                    },
                                    format : '{value} %'
                                },
                                title: {
                                    text: 'Humidité',
                    
                                style: {
                                    color: '#038197',
                                    fontWeight : 'bold'
                                }
                                }
                            }
                ],

        /////////----Séies----/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                series: [

                //----Séies N°1----//
                {
                    name: 'Température',
                    yAxis: 0,
                    data: dataserie('T'),
                    shadow: {
                        width: 5,
                        opacity: 0.2,
                        color: '#ff0000'
                    },
                    color: '#ff0000',
                    tooltip:{
                        valueSuffix : '°C'
                    }
                },

                //----Séies N°2----//        
                {
                    name: 'Humidité',
                    yAxis: 1,
                    data: dataserie('H'),
                    shadow: {
                        width: 5,
                        opacity: 0.2,
                        color: '#038197'
                    },
                    color: '#038197',            
                    tooltip:{
                        valueSuffix : '%'
                    }
                }]
            });
        });
    });
})};*/