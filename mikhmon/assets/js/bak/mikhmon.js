$('.main').fadeIn(400);
$('.main-mobile').fadeIn(400);


var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = Number(today.getMonth()); //January is 0!
var yyyy = today.getFullYear();
var mmm = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]
var hh = today.getHours();

var thisMonth = (mm + 1) + "/" + yyyy

function cancelPage() {

    window.stop();

}

function openPage(uri) {
    closePage = setInterval(function() {
        window.stop();
    }, 100)
    setTimeout(function() {
        clearInterval(closePage);
        window.location.href = uri;
    }, 500)


}

var url = window.location.href;
if (url.indexOf(`?`) > 0) {
    var session = "?" + url.split('?')[1].split('/')[0];
    var path = url.split('?')[1].split('/')[1];
    
    
}



localStorage.setItem(session + "_profn", 0);

// var session = localStorage.getItem('session'); 
var currency = localStorage.getItem(session + '_curr');


var theme = localStorage.getItem(session + "_theme");

localStorage.setItem(session + 'AutoReload', 0)

localStorage.setItem(session + "_force", "false");


if(!localStorage.getItem(session+"_iface")){
    localStorage.setItem(session+"_iface","Select Interface")
    $("#iface-name").append("<option>Select Interface</option>")
}else if(localStorage.getItem(session+"_iface") == "Select Interface"){
    $("#iface-name").append("<option>Select Interface</option>")
}
localStorage.setItem(session+"_profn",0);    
txrx = '[{"name":"Tx","data":["0"]},{"name":"Rx","data":["0"]}]'
localStorage.setItem(session+"_traffic_data",txrx)  

// var ax = $(".sidenav div:first-child");
// var bx = $("title");
// if(ax.html() != "MIKHMON" || bx.html() != "MIKHMON"){
//     ax.html("MIKHMON");
//     bx.html("MIKHMON " + session);
// }

function validate(inputText){
    var valh = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if(inputText.match(valh)){
        
        return true;
    }else{
        $("body").html("<div style='position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);text-align:center;'><h3 class='login-title'>Sorry, Mikhmon only for localhost.</h3></div>")
    }
}




// validate(location.hostname);

var ax = $(".sidenav div:first-child");
var bx = $("title");
if (ax.html() != "MIKHMON ONLINE" || bx.html() != "MIKHMON Online") {
    ax.html("MIKHMON ONLINE");
    bx.html("MIKHMON Online " + session.replace("?","").toUpperCase());
}
if($("#load-session")){
    $("#load-session").html((session.split("?")[1]).toUpperCase() + "&nbsp;");
}
// dashboard 
function dashboard() {


    var iface = localStorage.getItem(session + '_iface');
    localStorage.setItem(session + '_NetInfo', 0);

            // $("#load-json").html("Loading System Resource...");
            $("#applog").append('<tr><td>' + timeStamp() + '</td><td>Loading System Resource</td></tr>');
            scrollD()
            $.get(session + "/get_sys_resource", function(result) {
                    var x = jesD.dec(result);
                    if (x.substring(0, 1) == "[") {
                        var result = JSON.parse(x);

                    } else {
                        var result = JSON.parse(x.substring(1, x.length));
                    }

                    try {
                        $("#time").html(result['systime']['time']);
                        $("#date").html(ucFirst(result['systime']['date']));
                        $("#time-zone").html(result['systime']['time-zone-name']);
                        $("#identity").html(result['identity']);
                        $("#uptime").html(timeNice(result['resource']['uptime']));
                        $("#board-name").html(result['resource']['board-name']);
                        $("#model").html(result['model']);
                        $("#version").html(result['resource']['version']);
                        $("#cpu-load").html(result['resource']['cpu-load'] + "% " + result['resource']['cpu-count'] + "x " + result['resource']['cpu-frequency'] + " MHz");
                        $("#memory").html(formatBytes(result['resource']['free-memory']) + " / " + formatBytes(result['resource']['total-memory']));
                        $("#hdd").html(formatBytes(result['resource']['free-hdd-space']) + " / " + formatBytes(result['resource']['total-hdd-space']));
                        $("#prog-cpu").css("width", result['resource']['cpu-load'] + "%");
                        $("#prog-memory").css("width", 100 - (Number(result['resource']['free-memory']) / Number(result['resource']['total-memory'])) * 100 + "%");
                        $("#prog-hdd").css("width", 100 - (Number(result['resource']['free-hdd-space']) / Number(result['resource']['total-hdd-space'])) * 100 + "%");

                        if (result['syshealth']['voltage']) {
                            voltage = result['syshealth']['voltage'] + "V"
                            temperature = result['syshealth']['temperature'] + "&#8451;"
                        } else {
                            voltage = "-"
                            temperature = "-"
                        }
                        $("#voltage").html(voltage);
                        $("#temperature").html(temperature);

                    } catch (err) {
                        location.href ="./?admin/settings/&r="+session.split("?")[1];
                        // console.log("get_resource");
                        // $("#applog").append('<tr><td>' + timeStamp() + '</td><td style="color:#f86c6b;">get_resource : timeout</td></tr>');
                        scrollD();
                    }

                })
                .fail(function() {
                    console.log("get_resource");
                    $("#applog").append('<tr><td>' + timeStamp() + '</td><td style="color:#f86c6b;">get_resource : timeout</td></tr>');
                    scrollD();

                })
                .always(function() {
                    // $("#load-json").html("Loading Hotspot Info...");
                $("#applog").append('<tr><td>' + timeStamp() + '</td><td>Loading Hotspot Info</td></tr>');
                scrollD()
                $.get(session + "/get_hotspotinfo", function(result) {
                        var x = jesD.dec(result)
                        if (x.substring(0, 1) == "[") {
                            var result = JSON.parse(x);

                        } else {
                            var result = JSON.parse(x.substring(1, x.length));
                        }
                        try {
                            if (isMobile()) {
                                $("#hotspot-active").html(nFormatMobile(result['hotspot_active']));
                                $("#hotspot-users").html(nFormatMobile(result['hotspot_users']));
                            } else {
                                $("#hotspot-active").html(nFormat(result['hotspot_active']));
                                $("#hotspot-users").html(nFormat(result['hotspot_users']));
                            }

                        } catch (err) {
                            console.log("get_hotspotinfo");
                            $("#applog").append('<tr><td>' + timeStamp() + '</td><td style="color:#f86c6b;">get_hotspotinfo : timeout</td></tr>');
                            scrollD();
                        }

                    })
                    .fail(function() {
                        console.log("get_hotspotinfo");
                        $("#applog").append('<tr><td>' + timeStamp() + '</td><td style="color:#f86c6b;">get_hotspotinfo : timeout</td></tr>');
                        scrollD();
                    })
                    
                    .always(function() {
                    
                        // $("#load-json").html("Loading Interface Traffic...");
                        $("#applog").append('<tr><td>' + timeStamp() + '</td><td>Loading Traffic '+iface+'</td></tr>');
                        scrollD();
                        $.getJSON(session + "/get_traffic/&iface=" + iface, function(result) {
                                try {
                                    txrx = '[{"name":"Tx","data":["' + result['tx'] + '"]},{"name":"Rx","data":["' + result['rx'] + '"]}]';

                                    localStorage.setItem(session + "_traffic_data", txrx);


                                } catch (err) {
                                    console.log("get_traffic");
                                    $("#applog").append('<tr><td>' + timeStamp() + '</td><td style="color:#f86c6b;">get_traffic : timeout</td></tr>');
                                    scrollD();
                                }

                            })
                            .fail(function() {
                                console.log("get_traffic");
                                $("#applog").append('<tr><td>' + timeStamp() + '</td><td style="color:#f86c6b;">get_traffic : timeout</td></tr>');
                                scrollD();
                            })
                            .always(function() {
                            // $("#load-json").html("Loading Live Report...");
                            
                            
                            var force = localStorage.getItem(session + "_force")
                            var newDate = new Date();
                            var dd = String(newDate.getDate()).padStart(2, '0');
                            var mm = Number(newDate.getMonth());
                            var yyyy = newDate.getFullYear();
                            var mmm = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]
                            var today = mmm[mm] + '/' + dd + '/' + yyyy;

                            $("#applog").append('<tr><td>' + timeStamp() + '</td><td>Loading Report '+today.capitalize()+'</td></tr>');
                            scrollD();
                            $.get(session + "/get_livereport/&day=" + today + "&f=" + force, function(result) {
                                    var x = jesD.dec(result)
                                    var result = JSON.parse("[" + x.substring(x.lastIndexOf("[") + 1, x.lastIndexOf("]")) + "]")
                                    var totalDay = 0;
                                    try {
                                        $.each(result, function(i, field) {

                                            totalDay += parseInt(field['name'].split("-|-")[3]);

                                        });
                                        if(isMobile()){
                                            $("#live-report").html(currencyFormatSF(totalDay, currency));
                                        }else{
                                            $("#live-report").html(currencyFormatSF(totalDay, currency));
                                        }


                                    } catch (err) {
                                        console.log("get_livereport");
                                        $("#applog").append('<tr><td>' + timeStamp() + '</td><td style="color:#f86c6b;">get_livereport : timeout</td></tr>');
                                        scrollD();
                                    }

                                })
                                .fail(function() {
                                    console.log("get_livereport");
                                    $("#applog").append('<tr><td>' + timeStamp() + '</td><td style="color:#f86c6b;">get_livereport : timeout</td></tr>');
                                    scrollD();
                                })
                                    .always(function() {
                                        var force = localStorage.getItem(session + "_force")
                                            // $("#load-json").html("Loading System Log...");
                                        $("#applog").append('<tr><td>' + timeStamp() + '</td><td>Loading System Log</td></tr>');
                                        scrollD();
                                        $.get(session + "/get_log&f=" + force, function(result) {

                                                var x = jesD.dec(result)
                                                var result = JSON.parse("[" + x.substring(x.lastIndexOf("[") + 1, x.lastIndexOf("]")) + "]")

                                                try {
                                                    $("#log").html("");

                                                    for (i = 0; i < 30; i++) {
                                                        if (result[i]['message'].substring(0, 2) == "->") {
                                                            var user = (result[i]['message'].substring(3, result[i]['message'].length)).split("):")[0] + ")";
                                                            var mess = (result[i]['message'].substring(3, result[i]['message'].length)).split("):")[1].replace("trying to", "");
                                                            $("#log").append(`
                                                                <tr>
                                                                    <td>` + result[i]['time'] + `</td>
                                                                    <td>` + user + `</td>
                                                                    <td>` + mess + `</td>
                                                                </tr>`);

                                                        }
                                                    }

                                                } catch (err) {
                                                    console.log("get_log");
                                                    $("#applog").append('<tr><td>' + timeStamp() + '</td><td style="color:#f86c6b;">get_log : timeout</td></tr>');
                                                    scrollD();
                                                }

                                            })
                                            .fail(function() {
                                                console.log("get_log");
                                                $("#applog").append('<tr><td>' + timeStamp() + '</td><td style="color:#f86c6b;">get_log : timeout</td></tr>');
                                                scrollD();
                                            })
                                            .always(function() {

                                                localStorage.setItem(session + "_force", "true");
                                                $.getJSON(session + "/get_traffic/&iface=" + iface, function(result) {
                                                        try {
                                                            txrx = '[{"name":"Tx","data":["' + result['tx'] + '"]},{"name":"Rx","data":["' + result['rx'] + '"]}]'

                                                            localStorage.setItem(session + "_traffic_data", txrx);


                                                        } catch (err) {
                                                            console.log("get_traffic");
                                                            $("#applog").append('<tr><td>' + timeStamp() + '</td><td style="color:#f86c6b;">get_traffic : timeout</td></tr>');
                                                            scrollD();

                                                        }

                                                    })
                                                    .fail(function() {
                                                        console.log("get_traffic");
                                                        $("#applog").append('<tr><td>' + timeStamp() + '</td><td style="color:#f86c6b;">get_traffic : timeout</td></tr>');
                                                        scrollD();
                                                        localStorage.setItem(session + '_NetInfo', '504');
                                                    })
                                                    .always(function() {
                                                        if (localStorage.getItem(session + '_NetInfo') != '504') {
                                                            // $("#load-json").html("Loading Complete...");
                                                            
                                                            setTimeout(function() {
                                                                dashboard();
                                                            }, 10000);
                                                        }
                                                        // setTimeout(function() {
                                                        //     $("#load-json").html((session.split("?")[1]).toUpperCase() + "&nbsp;");
                                                        // }, 1000)

                                                        if (!localStorage.getItem(session + "_cache_user_profiles") || localStorage.getItem(session + "_cache_user_profiles") == "") {
                                                            localStorage.setItem(session + "_cache_user_profiles", timeStamp());
                                                            cachingUProfile();
                                                            // totUsers()

                                                        } else {
                                                            forceCaching();
                                                            
                                                        }
                                                    })

                                            })
                                    })

                            })

                    })
            })
  
}


// traffic monitor 
function trafficMonitor(theme) {
    $(document).ready(function() {
        
        
        // $("#iface-name").html(iface)
        var chart;
        if (theme == "light") {
            Highcharts.setOptions(light);
        } else if (theme == "dark") {
            Highcharts.setOptions(dark);
        } else if (theme == "blue") {
            Highcharts.setOptions(blue);
        } else if (theme == "green") {
            Highcharts.setOptions(green);
        } else if (theme == "pink") {
            Highcharts.setOptions(pink);
        }
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });



        Highcharts.addEvent(Highcharts.Series, 'afterInit', function() {
            this.symbolUnicode = {
                circle: '●',
                diamond: '♦',
                square: '■',
                triangle: '▲',
                'triangle-down': '▼'
            }[this.symbol] || '●';
        });

        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'trafficMonitor',
                animation: Highcharts.svg,
                type: 'areaspline',
                events: {

                    load: function() {

                        window.ifaceI = setInterval(function() {

                            var txrx = localStorage.getItem(session + "_traffic_data")
                            var midata = JSON.parse(txrx);

                            if (midata.length > 0) {
                                var TX = parseInt(midata[0].data);
                                var RX = parseInt(midata[1].data);
                                var x = (new Date()).getTime();
                                try {
                                    shift = chart.series[0].data.length > 25;
                                    chart.series[0].addPoint([x, TX], true, shift);
                                    chart.series[1].addPoint([x, RX], true, shift);
                                    clearInterval(window.ifaceI)
                                } catch (err) {}
                            }

                        
                        
                        window.ifaceII = setInterval(function() {

                            var txrx = localStorage.getItem(session + "_traffic_data")
                            var midata = JSON.parse(txrx);

                            if (midata.length > 0) {
                                var TX = parseInt(midata[0].data);
                                var RX = parseInt(midata[1].data);
                                var x = (new Date()).getTime();
                                try {
                                    shift = chart.series[0].data.length > 25;
                                    chart.series[0].addPoint([x, TX], true, shift);
                                    chart.series[1].addPoint([x, RX], true, shift);
                                } catch (err) {}
                            }

                        },5000) }

                        , 1500);

                    }
                }
            },
            title: {
                text: ""
            },

            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150,
                maxZoom: 20 * 1000,
            },
            yAxis: {
                minPadding: 0.2,
                maxPadding: 0.2,
                title: {
                    text: null
                },
                labels: {
                    formatter: function() {
                        var bytes = this.value;
                        var sizes = ['<br>bps', '<br>kbps', '<br>Mbps', '<br>Gbps', '<br>Tbps'];
                        if (bytes == 0) return '0 bps';
                        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
                        return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
                    },
                },
            },

            series: [{
                name: 'Tx',
                data: [],
                marker: {
                    symbol: 'circle'
                }
            }, {
                name: 'Rx',
                data: [],
                marker: {
                    symbol: 'circle'
                }
            }],

            tooltip: {
                formatter: function() {
                    var s = [];
                      $.each(this.points, function(i, point) {
                        var bytes = point.y;                          
                        var sizes = ['bps', 'kbps', 'Mbps', 'Gbps', 'Tbps'];
                        if (bytes == 0) s.push( '<span style="color:' + this.series.color + '; font-size: 1.5em;">' + this.series.symbolUnicode + '</span><b>' + this.series.name + ':</b> 0 bps');
                        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
                        s.push('<span style="color:' + this.series.color + '; font-size: 1.5em;">' + this.series.symbolUnicode + '</span><b>' + this.series.name + ':</b> ' + parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i]);  
                        });
                      return '<b>Mikhmon Traffic Monitor</b><br /><b>Time: </b>' + Highcharts.dateFormat('%H:%M:%S', new Date(this.x)) + '<br />'  + s.join(' <br/> ');
                },
                shared: true
            },
        });
    });
}
$("#btn-user-profiles").attr('onclick', 'loadUserProfiles()');
$("#btn-hotspot-users").attr('onclick', 'loadUsersPP()')
$("#btn-hotspot-active").attr('onclick', 'loadHotspotActive()');
$("#btn-hotspot-hosts").attr('onclick', 'loadHotspotHosts()');

function getExpMode(x) {
    var keyExpMode = ["rem", "remc", "ntf", "ntfc", "noexp", ""];
    var NameExpMode = ["Remove", "Remove & Record", "Notice", "Notice & Record", "", ""];
    a = keyExpMode.indexOf(x);

    return NameExpMode[a];


}


function loadInterface() {
    
    $.get(session + "/get_interface", function(result) {
        var x = jesD.dec(result);
        if (x.substring(0, 1) == "[") {
            var result = JSON.parse(x);

        } else {
            var result = JSON.parse(x.substring(1, x.length));
        }
        $.each(result, function(i, field) {
            var siface = localStorage.getItem(session+"_iface");

            if(field['name'][0] !== "<"){
                if(field['name'] == siface){
                    var selected = "selected";
                }
                // ifaceName = field['name']
                $("#iface-name").append("<option "+selected+">"+field['name']+"</option>");
            }
            
                       
        })

    })


}

// user profile temp
function loadUProfiles(force = "false") {
    localStorage.setItem(session + "_force", force);

    $("#loading").html("Loading user profiles...");
    
    $("#select-profile").html("").append('<option value="" >Profile</option>')
    $.get(session + "/profiles&f=" + force, function(result) {
        // localStorage.setItem(session+"_user_profiles",JSON.stringify(result));
        var x = jesD.dec(result)
        if (x.substring(0, 1) == "[") {
            var result = JSON.parse(x);

        } else {
            var result = JSON.parse(x.substring(1, x.length));
        }

        var a = [];
        $.each(result, function(i, field) {
            a.push('"'+field['name']+'"');
            $("#select-profile").append('<option value="' + field['name'] + '" >' + field['name'] + '</option>')


            if (field['comment']) {

                comment = field['comment'];

            } else {
                comment = "";
            }
            if (field['rate-limit']) {
                rateLimit = field['rate-limit']
            } else {
                rateLimit = "";
            }
            if (field['on-login'] && field['on-login'].substring(0, 4) == ":put") {

                onlogin = (field['on-login']).split('("')[1].split('")')[0].split(",");
                expireMode = getExpMode(onlogin[1]);
                validity = onlogin[3];
                if (onlogin[2] == '0' || onlogin[2] == '') {
                    price = "";
                } else if (Number(onlogin[2]) > 0) {
                    price = priceFormat(Number(onlogin[2]), currency);
                }
                if (onlogin[4] == '0' || onlogin[4] == '') {
                    sellingPrice = "";
                } else if (Number(onlogin[4]) > 0) {
                    sellingPrice = priceFormat(Number(onlogin[4]), currency);
                }

                userLock = onlogin[6];


            } else {
                expireMode = "";
                validity = "";
                price = "";
                sellingPrice = "";
                userLock = "";
            }
            
            if (isMobile()) {
                $("#profiles").append(`
          <tr class='yes'><td>
          Name: <span id="` + i + `"><i class='fa fa-ci fa-circle text-orange'></i></span> <b>` + field['name'] + `</b><br>
          Shared Users: ` + field['shared-users'] + `<br>
          Rate Limit: ` + rateLimit + `<br>
          Expire Mode: ` + expireMode + `<br>
          Validity: ` + validity + `<br>
          Price | Selling Price: ` + price + ` | 
          ` + sellingPrice + `<br>
          Lock User: ` + userLock + `<br></td>
          </tr>
          
          `);
            } else {
                $("#profiles").append(`
          <tr class='yes'>
          <td class='text-center'><span class='pointer' onclick="removeProfile('`+field['.id']+`','`+field['name']+`')"><i class='fa fa-minus-square text-danger'></i></span></td>
          <td>` + field['name'] + `</td>
          <td>` + field['shared-users'] + `</td>
          <td>` + rateLimit + `</td>
          <td>` + expireMode + `</td>
          <td class="text-right">` + validity + `</td>
          <td class="text-right">` + price + `</td>
          <td class="text-right">` + sellingPrice + `</td>
          <td>` + userLock + `</td>
          </tr>
          
          `);

            }

        });
        uprofx = "["+a.join(",")+"]";
        localStorage.setItem(session + "_temp_user_profiles", uprofx);
        localStorage.setItem(session + "_tot_user_profiles", (JSON.parse(uprofx)).length);

        
    })

    .always(function() {

        countTableRow("profiles");
        updateTable('searchProfiles');
       $("#profiles").fadeIn(200);
        $("#loading").html("");
        



    })
}




// user profiles
function loadUserProfiles(force = "false") {
    // $("#profiles").fadeOut(200);
    $("#profiles").html("");
    $("#total-profiles").html("0");
    menuNonActive("hotspot-active");
    menuNonActive("hotspot-users");
    menuActive("user-profiles");
    menuNonActive("hotspot-hosts");

    loadUProfiles(force);
    clearInterval(window.auto_hotspot_active);
    clearInterval(window.auto_hotspot_hosts);
    

    $.getJSON(session + "/get_expire_mon", function(result) {

        var exp_mon = result['expire_monitor'];
        if(exp_mon == "ok"){
            $("#exp_mon").html('<i class="fa fa-ci fa-circle text-green" title="Expire users monitor is activated."></i>');
        }else{
            $("#exp_mon").html('<i class="fa fa-ci fa-circle text-orange" title="Expire users monitor is not activated."></i>');
            $("#menuUserProfile").append('<div id="btn-exp-mon" class="btn-group btn-container" ><button class="bg-btn-group" onclick="setExpMon()"><i class="fa fa-gear" ></i> Set Expire Monitor</button></div>');
        }

               
        
    })
}


function cachingUProfile() {
    

    $("#applog").append('<tr><td>' + timeStamp() + '</td><td>Caching User Profiles</td></tr>');
    $.get(session + "/profiles&f=true", function(result) {
        localStorage.setItem(session + "_cache_user_profiles", timeStamp());
        var x = jesD.dec(result);
        if (x.substring(0, 1) == "[") {
            var result = JSON.parse(x);

        } else {
            var result = JSON.parse(x.substring(1, x.length));
        }

        var a = [];
        $.each(result, function(i, field) {
            a.push('"'+field['name']+'"');

        });

        uprofx = "["+a.join(",")+"]";
        localStorage.setItem(session + "_temp_user_profiles", uprofx);
        localStorage.setItem(session + "_tot_user_profiles", (JSON.parse(uprofx)).length);
        scrollD();

    })

    .always(function() {

        var uprof = localStorage.getItem(session + "_temp_user_profiles");
        var profx = JSON.parse(uprof);
        localStorage.setItem(session + "_profn", 0);
        $("#applog").append('<tr><td>' + timeStamp() + '</td><td>1/' + profx.length + ' Caching Users in profile ' + profx[0] + '</td></tr>');
        cachingUsers(profx[0]);
        scrollD();
        
        $.getJSON(session + "/get_tot_users", function(result) {
            localStorage.setItem(session + "_tot_users",result['users']);
                   
            
        })

    })
}


// load total users

function forceCaching(){
    
    $.getJSON(session + "/get_tot_users", function(result) {

        localStorage.setItem(session + "_c_tot_users",result['users']);
               
        
    })
    .always(function(){
        
        if (diffct(localStorage.getItem(session + "_cache_user_profiles")) > 4 && Number(localStorage.getItem(session + "_tot_users")) != Number(localStorage.getItem(session + "_c_tot_users"))) {
            cachingUProfile();
        }
    })
    
}



// load users by profile

function loadUsersPPF(force = "false") {

    localStorage.setItem(session + "_profn", 0);
    localStorage.setItem(session + "_force", force);
    $("#users").fadeOut(200);
    $("#users").html("");
    $("#total-users").html("0");
    $("#select-comment").html("");
    $("#select-comment").append('<option value="">Comment</option>');
    menuNonActive("hotspot-active");
    menuActive("hotspot-users");
    menuNonActive("user-profiles");
    menuNonActive("hotspot-hosts");
    var uprof = localStorage.getItem(session + "_temp_user_profiles");
    var force = localStorage.getItem(session + "_force");
    var profx = JSON.parse(uprof);

    getUsers(profx[0], force);

}


function loadUsersPP(force = "false") {
    localStorage.setItem(session + "_force", force);

    menuNonActive("hotspot-active");
    menuActive("hotspot-users")
    menuNonActive("user-profiles");
    menuNonActive("hotspot-hosts");

    $("#select-comment").append('<option value="">Comment</option>');
    clearInterval(window.auto_hotspot_active);
    clearInterval(window.auto_hotspot_hosts);

    if (Number(localStorage.getItem(session + "_profn")) < 1) {
        loadUProfiles(force);
        $("#users").fadeOut(200);
        $("#users").html("");

        var uprof = localStorage.getItem(session + "_temp_user_profiles");
        var profx = JSON.parse(uprof);

        getUsers(profx[0], force);



    } else if (Number(localStorage.getItem(session + "_profn")) > 0 &&
        $("#users").html().trim() == `<tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td></tr>`) {
        loadUsersPPF();
    }
}


function removeDuplicate(arr) {
    return arr.filter(function(v, idx) {
        return arr.indexOf(v) == idx;
    });
}
// get users
function getUsers(prof) {
    var force = localStorage.getItem(session + "_force");
    $("#loading").html("Loading  " + (Number(localStorage.getItem(session + "_profn")) + 1) + " / " + localStorage.getItem(session + "_tot_user_profiles") + " : user with profile " + prof + "...");
    
    $.get(session + "/users/&prof=" + prof + "&f=" + force, function(result) {

        var x = jesD.dec(result);
        var result = JSON.parse("[" + x.substring(x.lastIndexOf("[") + 1, x.lastIndexOf("]")) + "]");

        var a = [];
        $.each(result, function(i, field) {

            if (field['comment']) {
                comment = field['comment'];
                a.push('"' + field['comment'] + '"');
            } else {
                comment = "";
            }

            if (field['limit-uptime'] == "1s") {
                exp = "expired";

            } else {
                exp = "";
            }
            if (field['server']) {
                server = field['server'];

            } else {
                server = "all";
            }

            if (field['disabled'] == "true") {
                x = "<span title='X - disabled'>X</span>";

            } else {
                x = "";
            }

            if (field['limit-uptime']) {
                timeLimit = field['limit-uptime'];

            } else {
                timeLimit = "";
            }

            if (field['limit-bytes-total']) {
                dataLimit = formatBytes(field['limit-bytes-total']);

            } else {
                dataLimit = "";
            }
            if (isMobile()) {
                $("#users").append(`
            <tr class='yes'><td>
            Server: ` + server + `<br>
            User: <b>` + field['name'] + `</b><br>
            Profile: ` + field['profile'] + `<br>
            Uptime: ` + timeNice(field['uptime']) + `<br>
            Bytes In: ` + formatBytes(field['bytes-in']) + `<br>
            Bytes Out: ` + formatBytes(field['bytes-out']) + `<br>
            Comment: <span class='pointer' title='Filter by ` + comment + `' onclick='setC("` + comment + `")'>` + comment + `</span> ` + dataLimit + ` ` + timeLimit + ` ` + exp + `<br>
            </td>
            </tr>
            
            `);
            } else {
                $("#users").append(`
            <tr class='yes'>
            <td class='text-center'><span class='pointer' onclick="removeUser('`+field['.id']+`','`+field['name']+`','`+field['profile']+`')"><i class='fa fa-minus-square text-danger'></i></span></td>
            <td class='text-center'>` + x + `</td>
            <td>` + server + `</td>
            <td>` + field['name'] + `</td>
            <td>` + field['profile'] + `</td>
            <td class='text-right' >` + timeNice(field['uptime']) + `</td>
            <td class='text-right'>` + formatBytes(field['bytes-in']) + `</td>
            <td class='text-right'>` + formatBytes(field['bytes-out']) + `</td>
            <td><span class='pointer' title='Filter by ` + comment + `' onclick='setC("` + comment + `")'>` + comment + `</span> ` + dataLimit + ` ` + timeLimit + ` ` + exp + `</td>
            </tr>
            
            `);
            }

            // $("#select-comment").append('<option value="'+comment+'" >'+comment+'</option>')
        });

        b = a.join(",");
        x = removeDuplicate(b.split(','));

        $.each(x, function(i, y) {
            y = y.replace(/"/g, '').replace(/''/g, '');
            if (y.substring(4, 3) !== "/" && y.substring(7, 6) !== "/") {
                if (y != "") {

                    $("#select-comment").append('<option value="' + y.split(" *")[0] + '" >' + y + '</option>');
                }
            }
        })

        countTableRow("users")
        $("#users").fadeIn(200);

    })

    .fail(function() {
        console.log("get_users profile" + prof);

    })

    .always(function() {



        var uproftot = Number(localStorage.getItem(session + "_tot_user_profiles"));
        var uprof = localStorage.getItem(session + "_temp_user_profiles");
        var profx = JSON.parse(uprof);
        profn = Number(localStorage.getItem(session + "_profn")) + 1;
        localStorage.setItem(session + "_profn", profn);
        if (profn < uproftot) {

            getUsers(profx[profn]);
            updateTable('searchUsers');

        } else {
            $("#loading").html("&nbsp;");
            
            countTableRow("users");
            updateTable('searchUsers');


        }



    })
}


function cachingUsers(prof) {
    $.get(session + "/users/&prof=" + prof + "&f=true", function(result) {


    })



    .always(function() {

        var uproftot = Number(localStorage.getItem(session + "_tot_user_profiles"));
        var uprof = localStorage.getItem(session + "_temp_user_profiles");
        var profx = JSON.parse(uprof);
        profn = Number(localStorage.getItem(session + "_profn")) + 1;
        localStorage.setItem(session + "_profn", profn);
        if (profn < uproftot) {
            $("#applog").append('<tr><td>' + timeStamp() + '</td><td>' + (profn + 1) + '/' + profx.length + ' Caching Users in profile ' + profx[profn] + '</td></tr>');

            cachingUsers(profx[profn]);


        }

        scrollD();

    })
}



function clearAuto(a) {
    clearInterval(a);

}



// hotspot active

function loadHotspotActive() {


    menuActive("hotspot-active");
    menuNonActive("hotspot-users");
    menuNonActive("user-profiles");
    menuNonActive("hotspot-hosts");

    window.auto_hotspot_active = setInterval(getHospotActive, 15000);
    getHospotActive();
    clearInterval(window.auto_hotspot_hosts);


}




function getHospotActive() {
    $("#active").fadeOut(200);
    $("#active").html("");
    $("#loading").html("Loading hotspot active...");
    
    $.get(session + "/get_hotspot_active", function(result) {

            var x = jesD.dec(result);
            var result = JSON.parse("[" + x.substring(x.lastIndexOf("[") + 1, x.lastIndexOf("]")) + "]");

            var a = [];
            $.each(result, function(i, field) {

                if (field['comment']) {
                    comment = field['comment'];

                } else {
                    comment = "";
                }

                if (field['time-left']) {
                    timeleft = field['time-left'];
                } else {
                    timeleft = "";
                }

                a.push('"' + field['server'] + '"');

                if (isMobile()) {
                    $("#active").append(`
         <tr class='yes' id="` + field['user'] + `"><td>
         <div>
         Server: ` + field['server'] + `<br>
         User: <b>` + field['user'] + `</b><br>
         Address: ` + field['address'] + `<br>
         MAC Address: ` + field['mac-address'] + `<br>
         Uptime: ` + timeNice(field['uptime']) + `<span style="float:right"  onclick="detHA('d` + i + `')">&nbsp <span id="td` + i + `"><i  class="fa fa-caret-down"></i> details</span></span><br>
         </div>
         <div style="display:none" id="d` + i + `">
         Bytes In: ` + formatBytes(field['bytes-in']) + `<br>
         Bytes Out: ` + formatBytes(field['bytes-out']) + `<br>
         Time Left: ` + timeleft + `<br>
         Login By: ` + field['login-by'] + `<br>
         Comment: ` + comment + `<br>
         </div>
         </td>
         </tr>
         
         `);

                } else {
                    $("#active").append(`
         <tr class='yes' id="` + field['user'] + `">
         <td class='text-center'><span class='pointer' onclick="removeActive('`+field['.id']+`','`+field['user']+`')"><i class='fa fa-minus-square text-danger'></i></span></td>
         <td>` + field['server'] + `</td>
         <td>` + field['user'] + `</td>
         <td>` + field['address'] + `</td>
         <td>` + field['mac-address'] + `</td>
         <td class='text-right' >` + timeNice(field['uptime']) + `</td>
         <td class='text-right'>` + formatBytes(field['bytes-in']) + `</td>
         <td class='text-right'>` + formatBytes(field['bytes-out']) + `</td>
         <td>` + timeleft + `</td>
         <td>` + field['login-by'] + `</td>
         <td>` + comment + `</td>
         </tr>
         
         `);

                }


            });


            $("#select-server").html('<option value="" >Server</option>')
            b = a.join(",");
            x = removeDuplicate(b.split(','));
            $.each(x, function(i, y) {
                y = y.replace(/"/g, '').replace(/''/g, '');

                $("#select-server").append('<option value="' + y + '" >' + y + '</option>');

            })

            countTableRow("active");
            $("#active").fadeIn(200);

        })
        .always(function() {
            $("#loading").html("");
            
            updateTable('searchActive');


        })




}

function loadHotspotHosts() {

    menuActive("hotspot-hosts");
    menuNonActive("hotspot-active");
    menuNonActive("hotspot-users");
    menuNonActive("user-profiles");
    window.auto_hotspot_hosts = setInterval(getHospotHosts, 15000);

    getHospotHosts();
    clearInterval(window.auto_hotspot_active);
}




function getHospotHosts() {
    $("#hosts").fadeOut(200);
    $("#hosts").html("");
    $("#loading").html("Loading hotspot hosts...");
    

    $.get(session + "/get_hosts", function(result) {
            var x = jesD.dec(result);
            var result = JSON.parse("[" + x.substring(x.lastIndexOf("[") + 1, x.lastIndexOf("]")) + "]");

            //  var a = [];
            $.each(result, function(i, field) {

                if (field['comment']) {
                    comment = field['comment'];
                } else {
                    comment = "";
                }

                if (field['DHCP'] == "true") {
                    h = " H";
                    ht = ", H - DHCP";
                } else {
                    h = "";
                    ht = "";
                }

                if (field['authorized'] == "true") {
                    a = " A";
                    at = " A - authorized";
                } else {
                    a = "";
                    at = "";
                }

                if (field['bypassed'] == "true") {
                    p = " P";
                    pt = ", P - bypassed";
                } else {
                    p = "";
                    pt = "";
                }
                if (field['dynamic'] == "true") {
                    d = " D";
                    dt = ", D - dynamic";
                } else {
                    d = "";
                    dt = "";
                }
                // if(h == " H"||a == " A"||p == " P"||d == " D"){
                s = `<span title="` + at + ht + pt + dt + `">` + a + h + p + d + `</span><span style="display:none;">` + at + ht + pt + dt + `</span>`;
                // }else{
                //   s = `<span title="D - dynamic"> D</span><span style="display:none;">D - dynamic</span>`;
                // }

                if (isMobile()) {
                    $("#hosts").append(`
         <tr class='yes'><td>
         Status: ` + s + `<br>
         MAC Address: ` + field['mac-address'] + `<br>
         Address: ` + field['address'] + `<br>
         To Address: ` + field['to-address'] + `<br>
         Server: ` + field['server'] + `<br>
         Comment: ` + comment + `<br>
         </td>
         </tr>
         
         `);



                } else {
                    $("#hosts").append(`
         <tr class='yes'>
         <td class='text-center'><span class='pointer' onclick="removeHost('`+field['.id']+`','`+field['mac-address']+`')"><i class='fa fa-minus-square text-danger'></i></span></td>
         <td class="text-center">` + s + `</td>
         <td>` + field['mac-address'] + `</td>
         <td>` + field['address'] + `</td>
         <td>` + field['to-address'] + `</td>
         <td>` + field['server'] + `</td>
         <td>` + comment + `</td>
         </tr>
         
         `);


                }
            });

            countTableRow("hosts");
            $("#hosts").fadeIn(200);

        })
        .always(function() {
            $("#loading").html("");
            
            updateTable('searchHosts');


        })
}

// log
function loadLog() {
    $("#loading").html("Loading Logs...");
    $.get(session + "/get_log&f=true", function(result) {

        var x = jesD.dec(result);
        var result = JSON.parse("[" + x.substring(x.lastIndexOf("[") + 1, x.lastIndexOf("]")) + "]");

        try {
            $("#log").fadeOut(200);
            $("#log").html("");

            for (i = 0; i < 200; i++) {
                if (result[i]['message'].substring(0, 2) == "->") {
                    if (isMobile()) {
                        $("#log").append("<tr class='yes'><td>" + result[i]['time'] + " <b>" + (result[i]['message'].substring(3, 200)).split("):")[0] + ")</b> <br>" + (result[i]['message'].substring(3, 200)).split("):")[1].replace("trying to", "") + "</td></tr>");
                    } else {
                        $("#log").append("<tr class='yes'><td>" + result[i]['time'] + "</td><td>" + (result[i]['message'].substring(3, 200)).split("):")[0] + ")</td><td>" + (result[i]['message'].substring(3, 200)).split("):")[1].replace("trying to", "") + "</td></tr>");
                    }

                }
            }

        } catch (err) {
            console.log("connection timeout");
        }

        countTableRow("log")
        $("#log").fadeIn(200);
    })

    .always(function() {
        $("#loading").html("");
        
        updateTable('searchLog');




    })
}



// report





localStorage.setItem(session + '_day_report', 0);

function loadSReport(date, force = "false") {



    menuActive("selling-report");
    menuNonActive("report-resume");

    localStorage.setItem(session + "_force", force);
    localStorage.setItem(session + '_day_report', 0);
    // $("#report").fadeOut(200);
    $("#report").html("");


    if (force == "true") {
        localStorage.setItem(session + "_resume_report", "");
        filterTableReport('report','searchReport','','count-report');
        document.getElementById('year').selectedIndex = "0";
        document.getElementById('month').selectedIndex = mm;
        document.getElementById('day').selectedIndex = "0";
        setDay('day');
        $("#report").fadeOut(200);
        $("#report").html("");
    } else {

    }
    getReport(date, force);
}

function getReport(date, force = "false") {

    var M = date.split("/")[0];
    var Y = date.split("/")[1];


    if (date == thisMonth) {
        // if (force == "true") {
            var t = new Date();
            dd = String(t.getDate()).padStart(2, '0');
        // } else {
        //     dd = dd
        // }


    } else if (date != thisMonth) {

        dd = daysInMonth((M), Y);
    }

    var d = localStorage.getItem(session + '_day_report');

    if (d.length == 1 && d < 9) {
        dn = "0" + (Number(d) + 1);

        localStorage.setItem(session + '_day_report', (Number(d) + 1));

    } else {
        dn = (Number(d) + 1);

        localStorage.setItem(session + '_day_report', dn);
    }
    today = mmm[M - 1] + '/' + dn + '/' + Y;




    if (Number(d) < Number(dd)) {

        $("#loading").html("Loding report " + today + "...");
        // $("#loadingHeader").html("Loding report "+today+"..."); 
        loadReport(date, session + "/get_report/&day=" + today + "&f=" + force, today);


    } else {
        $("#loading").html("");
        
    }


}

function loadReport(date, url, ndate) {


    var d = localStorage.getItem(session + '_day_report');
    totalMonth = localStorage.getItem('totalMonth');


    $.get(url, function(result) {

        var x = jesD.dec(result);
        var result = JSON.parse("[" + x.substring(x.lastIndexOf("[") + 1, x.lastIndexOf("]")) + "]");

        $.each(result, function(i, field) {
            var r = field['name'].split('-|-');

            if (isMobile()) {

                $("#report").append(
                    `<tr class='yes ` + r[0].replace(/\//g, '') + ` '>
              <td>
              Date: ` + r[0] + `
              Time: ` + r[1] + `<br>
              Username: <b>` + r[2] + `</b><br>
              IP Address: ` + r[4] + `<br>
              MAC Address: ` + r[5] + `<br>
              Profile: ` + r[7] + `<br>
              Comment: ` + r[8] + `</td>
              <td class='text-right'><span>` + r[3] + `</span></td>
              
              
              </tr>`


                );

            } else {


                $("#report").append(
                    `<tr class='yes  ` + r[0].replace(/\//g, '') + `'>
                      <td>` + r[0] + `</td>
                      <td>` + r[1] + `</td>
                      <td>` + r[2] + `</td>
                      <td>` + r[4] + `</td>
                      <td>` + r[5] + `</td>
                      <td>` + r[7] + `</td>
                      <td>` + r[8] + `</td>
                      <td class='text-right'><span>` + r[3] + `</span></td>
              
                    </tr>`


                );

            }


        })
        countTableRow("report");
        $("#report").fadeIn(200);

    })



    .always(function() {
        var force = localStorage.getItem(session + "_force");
        countReport("report", "count-report");
        getReport(date, force);

        updateTable('searchReport');
        // countReportD("report", ndate.replace(/\//g, ''));
        countReportT("report", ndate.replace(/\//g, ''));
        $("#count-vcr").html($("#total-report").html());



    });




}

function loadReportResume() {

    menuActive("report-resume");
    menuNonActive("selling-report");

}