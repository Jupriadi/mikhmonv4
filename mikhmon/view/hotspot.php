<?php
session_start();
// hide all error
error_reporting(0);
// protect .php
$get_self = explode("/",$_SERVER['PHP_SELF']);
$self[] = $get_self[count($get_self)-1];

if($self[0] !== "index.php"  && $self[0] !==""){
    include_once("../core/route.php");
}else{
    
if(!isMobile()){ 
    $hotspot_ma = "sidenav_active";
    
    include_once("view/header_html.php");
    include_once("view/menu.php");
?>
<div class="main">
    <div class="row">
        <div class="col-12">
            <div class="card card-shadow">
            <div class="card-header unselect">
                <span><i class="fa fa-wifi"></i>&nbsp; <b>Hotspot</b> &nbsp; </span>
                    <span class="card-tab" id="btn-hotspot-users"><i class="fa fa-users" ></i> Users</span>
                    <span class="card-tab" onclick="loadUserProfiles()" id="btn-user-profiles"><i class="fa fa-pie-chart" ></i> User Profile</span>
                    <span class="card-tab" onclick="loadHotspotActive()" id="btn-hotspot-active"><i class="fa fa-wifi" ></i> Active</span>
                    <span class="card-tab" onclick="loadHotspotHosts()" id="btn-hotspot-hosts"><i class="fa fa-laptop" ></i> Hosts</span>
            </div>
            <div class="card-body">
            <div class="row">
                <div class="col-12 hide" id="user-profiles">
                    <div id="menuUserProfile">
                    <div class="btn-group btn-container">
                    <button class="bg-btn-group table-total" id="total-profiles" >&nbsp;</button>
                                            
                        <button class="bg-btn-group" onclick="loadUserProfiles('true')"><i class="fa fa-refresh" title="Force reload" id="fr-profiles"></i></button>
                        <input type="text" autocomplete = "off" id="filter-profiles" onkeyup="filterTable('profiles','searchProfiles',this.value)" placeholder="Filter" />
                        <button class="bg-btn-group" onclick="filterTable('profiles','filter-profiles','')" title="Clear filter"><i class="fa fa-filter" ></i></button>

                    </div>
                    <div class="btn-group btn-container">
                        <button class="bg-btn-group" onclick="" id="btn-add-user-profiles"><i class="fa fa-plus" ></i>  Add</button>
                    </div>
                    
                    <div class="btn-group btn-container" >
                        <button class="bg-btn-group btn-add-hotspot-users" id=""><i class="fa fa-user-plus" ></i> Add User</button>
                        <button class="bg-btn-group btn-gen-hotspot-users" id=""><i class="fa fa-ticket" ></i> Generate</button>
                    </div>

                    </div>
                    <div class="card-fixed mr-t-10">
                    
                    <table class="table table-bordered table-hover user-profiles">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name <span id="exp_mon"></span></th>
                                <th>Shared Users</th>
                                <th>Rate Linit</th>
                                <th>Expire Mode</th>
                                <th>Validity</th>
                                <th>Price</th>
                                <th>Selling Price</th>
                                <th>User Lock</th>
                            </tr>
                        </thead>
                        <tbody id="profiles">
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
                <div class="col-12 hide" id="hotspot-users">
                    <div class=""id="btn-group-users">
                    <div class="btn-group btn-container" >
                        <button class="bg-btn-group table-total" id="total-users" >&nbsp;</button>
                        
                        <button class="bg-btn-group" onclick="loadUsersPPF('true');" title="Force reload"><i class="fa fa-refresh" id="fr-users"></i></button>
                        <input type="text" autocomplete = "off" id="filter-users" onkeyup="filterTable('users','searchUsers',this.value);printVcr('');" placeholder="Filter" />
                        <button class="bg-btn-group" onclick="filterTable('users','filter-users','');selectFirst('select-profile,select-comment');" title="Clear filter"><i class="fa fa-filter" ></i></button>
                        
                        
                       
                    </div>
                    <div class="btn-group btn-container" >
                        <button class="bg-btn-group btn-add-hotspot-users" onclick="" ><i class="fa fa-user-plus" ></i> Add</button>
                        <button class="bg-btn-group btn-gen-hotspot-users" onclick="" ><i class="fa fa-ticket" ></i> Generate</button>
                    </div>

                    <div class="btn-group btn-container" >
                        <select class="bg-btn-group pointer" id="select-profile" value="" onchange="filterTable('users','searchUsers',this.value);this.title=this.value;">
                            <option value="">Profile</option>
                        </select>
                        <select class="bg-btn-group pointer" id="select-comment" value="" onchange="filterTable('users','searchUsers',this.value);printVcr(this.value);this.title=this.value;">
                            
                        </select>
                        <button id='printVcr' title='Print with default template' class='bg-btn-group pointer hide'><i class="fa fa-print"></i> Print</button>
                        <button id='printVcrS' title='Print with small template' class='bg-btn-group pointer hide'><i class="fa fa-print"></i> Small</button>
                    </div>
                    
                    </div>
                    <div class="card-fixed mr-t-10">
                    
                    <table class="table table-bordered table-hover hotspot-users">
                        <thead>
                            <tr>
                                <th></th>
                                <th></th>
                                <th>Server</th>
                                <th>Name</th>
                                <th>Profile</th>
                                <th class="text-right">Uptime</th>
                                <th class="text-right">Bites In</th>
                                <th class="text-right">Bytes Out</th>
                                <th>Comment</th>
                            </tr>
                        </thead>
                        <tbody id="users">
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    <div>
                        
                    </div>
                </div>
                <div class="col-12 hide" id="hotspot-active">
                    <div class="">
                        <div class="btn-group btn-container">
                            <button class="bg-btn-group table-total" id="total-active" >&nbsp;</button>
                            <button class="bg-btn-group" onclick="loadHotspotActive()" title="Force reload"><i class="fa fa-refresh" id="fr-active"></i></button>
                            <input type="text" autocomplete = "off" id="filter-hotspot-active" onkeyup="filterTable('active','searchActive',this.value)" placeholder="Filter" />
                            <button class="bg-btn-group" onclick="filterTable('active','filter-hotspot-active','');selectFirst('select-server');" title="Clear filter"><i class="fa fa-filter" ></i></button>
                            
                        </div>
                        <div class="btn-group btn-container">
                            <select class="bg-btn-group pointer" id="select-server" value="" onchange="filterTable('active','searchActive',this.value)">
                                <option value="">Server</option>
                            </select>
                        </div>
                    
                    </div>
                    <div class="card-fixed mr-t-10">
                    
                    <table class="table table-bordered table-hover hotspot-active">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Server</th>
                                <th>User</th>
                                <th>Address</th>
                                <th>MAC Address</th>
                                <th class="text-right">Uptime</th>
                                <th class="text-right">Bites In</th>
                                <th class="text-right">Bytes Out</th>
                                <th>Time Left</th>
                                <th>Login By</th>
                                <th>Comment</th>
                            </tr>
                        </thead>
                        <tbody id="active">
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
                <div class="col-12 hide" id="hotspot-hosts">
                    <div class="">
                        <div class="btn-group btn-container">
                            <button class="bg-btn-group table-total" id="total-hosts" >&nbsp;</button>
                            <button class="bg-btn-group" onclick="loadHotspotHosts()" title="Force reload"><i class="fa fa-refresh" id="fr-hosts"></i></button>
                            <input type="text" autocomplete = "off" id="filter-hosts" onkeyup="filterTable('hosts','searchHosts',this.value)" placeholder="Filter" />
                            <button class="bg-btn-group" onclick="filterTable('hosts','filter-hosts','')" title="Clear filter"><i class="fa fa-filter" ></i></button>
                            
                       
                        </div>
                        <div class="btn-group btn-container">
                            <button class="bg-btn-group" onclick="filterTable('hosts','searchHosts','bypassed')" title="Filter bypassed">P</button>
                            <button class="bg-btn-group" onclick="filterTable('hosts','searchHosts','authorized')" title="Filter authorized">A</button>

                        </div>
                    
                    </div>
                    <div class="card-fixed mr-t-10">
                    
                    <table class="table table-bordered table-hover hotspot-hosts">
                        <thead>
                            <tr>
                                <th></th>
                                <th></th>
                                <th>Mac Address</th>
                                <th>Address</th>
                                <th>To Address</th>
                                <th>Server</th>
                                <th>Comment</th>
                            </tr>
                        </thead>
                        <tbody id="hosts" class="text-nowrap">
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
            </div>
            <div class="card-footer"><span id="loading"></span> </div>
            </div>
        </div>
    </div>

    
</div>

<script type="text/javascript">


</script>
<?php

}else if(isMobile()){ 
  $hotspot_ma = "nav_active";
  $navicon = '<i class="fa fa-wifi"></i>';
  include_once("view/header_html.php");
  include_once("view/menu.php");

  ?>

<div class="main-mobile">
    <div class="row">
        <div class="col-12">
        <div class="mobile-card ">
            <div class="col-12 mr-b-10">
                <div class="col-10"><h3><span  id="pload"></span></h3></div>
                <div class="col-2">
                <div class="dropdown">
                      <button onclick="dropD()" class="dropbtn"><i class="fa fa-bars"></i></button>
                      <div id="mDropdown" class="dropdown-content">
                        <a id="btn-hotspot-users"><i class="fa fa-users" ></i> Users</a>
                        <a id="btn-user-profiles"><i class="fa fa-pie-chart" ></i> User Profile</a>
                        <a id="btn-hotspot-active"><i class="fa fa-wifi" ></i> Active</a>
                        <a id="btn-hotspot-hosts"><i class="fa fa-laptop" ></i> Hosts</a>
                      </div>
                    </div>
                </div>
             </div>
            <div class="mr-t-10" >
            <div class="row">
                <div class="col-12 hide" id="user-profiles">
                    <div class="">
                    <div class="btn-group btn-container">
                    <button class="bg-btn-group table-total" id="total-profiles" >&nbsp;</button>
                        <button class="bg-btn-group" onclick="loadUserProfiles('true')"><i class="fa fa-refresh" title="Force reload" id="fr-profiles"></i></button>
                        <input type="text" autocomplete = "off" id="filter-profiles" onkeyup="filterTable('profiles','searchProfiles',this.value)" placeholder="Filter" />
                        <button class="bg-btn-group" onclick="filterTable('profiles','filter-profiles','')" title="Clear filter"><i class="fa fa-filter" ></i></button>

                    </div>

                    <div class="btn-group btn-container">
                        <button class="bg-btn-group" onclick="" id="btn-add-user-profiles"><i class="fa fa-plus" ></i>  Add</button>
                    </div>
                    
                    <div class="btn-group btn-container" >
                        <button class="bg-btn-group btn-add-hotspot-users" id=""><i class="fa fa-user-plus" ></i> Add User</button>
                        <button class="bg-btn-group btn-gen-hotspot-users" id=""><i class="fa fa-ticket" ></i> Generate</button>
                    </div>
                    </div>
                    <div class="card-fixed mr-t-10">
                    
                    <table class="table table-bordered table-hover user-profiles">
                        <thead>
                            <tr>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody id="profiles">
                            <tr>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
                <div class="col-12 hide " id="hotspot-users">
                    <div class="">
                    <div class="btn-group" id="btn-group-users">
                        <button class="bg-btn-group table-total" id="total-users" >&nbsp;</button>
                        <button class="bg-btn-group" onclick="loadUsersPPF('true');" title="Force reload"><i class="fa fa-refresh" id="fr-users"></i></button>
                        <input type="text" autocomplete="off" id="filter-users" onkeyup="filterTable('users','searchUsers',this.value);printVcr('');" placeholder="Filter" />
                        <button class="bg-btn-group" onclick="filterTable('users','filter-users','');selectFirst('select-profile,select-comment');" title="Clear filter"><i class="fa fa-filter" ></i></button>
                        
                        <select class="bg-btn-group pointer" id="select-profile" value="" onchange="filterTable('users','searchUsers',this.value);this.title=this.value;">
                            <option value="">Profile</option>
                        </select>
                        <select class="bg-btn-group pointer" id="select-comment" value="" onchange="filterTable('users','searchUsers',this.value);printVcr(this.value);this.title=this.value;">
                            
                        </select>
                        <button id='printVcr' title='Print with default template' class='bg-btn-group pointer hide'><i class="fa fa-print"></i> Print</button>
                        <button id='printVcrS' title='Print with small template' class='bg-btn-group pointer hide'><i class="fa fa-print"></i> Small</button>
                       
                    </div>
                    <div class="btn-group btn-container" >
                        <button class="bg-btn-group btn-add-hotspot-users" onclick="" ><i class="fa fa-user-plus" ></i> Add</button>
                        <button class="bg-btn-group btn-gen-hotspot-users" onclick="" ><i class="fa fa-ticket" ></i> Generate</button>
                    </div>
                    
                    </div>
                    <div class="card-fixed mr-t-10">
                    
                    <table class="table table-bordered table-hover hotspot-users">
                        <thead>
                            <tr>
                                <th></th>

                            </tr>
                        </thead>
                        <tbody id="users">
                            <tr>
                                <td></td>

                            </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
                <div class="col-12 hide" id="hotspot-active">
                    <div class="">
                        <div class="btn-group">
                            <button class="bg-btn-group table-total" id="total-active" >&nbsp;</button>
                            <button class="bg-btn-group" onclick="loadHotspotActive()" title="Force reload"><i class="fa fa-refresh" id="fr-active"></i></button>
                            <input type="text" autocomplete = "off" id="filter-hotspot-active" onkeyup="filterTable('active','searchActive',this.value)" placeholder="Filter" />
                            <button class="bg-btn-group" onclick="filterTable('active','filter-hotspot-active','');selectFirst('select-server');" title="Clear filter"><i class="fa fa-filter" ></i></button>
                            <select class="bg-btn-group pointer" id="select-server" value="" onchange="filterTable('active','searchActive',this.value)">
                            <option value="">Server</option>
                        </select>
                        </div>
                    
                    </div>
                    <div class="card-fixed mr-t-10">
                    
                    <table class="table table-bordered table-hover hotspot-active">
                        <thead>
                            <tr>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody id="active">
                            <tr>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
                <div class="col-12 hide" id="hotspot-hosts">
                    <div class="">
                        <div class="btn-group">
                            <button class="bg-btn-group table-total" id="total-hosts" >&nbsp;</button>
                            <button class="bg-btn-group" onclick="loadHotspotHosts()" title="Force reload"><i class="fa fa-refresh" id="fr-hosts"></i></button>
                            <input type="text" autocomplete = "off" id="filter-hosts" onkeyup="filterTable('hosts','searchHosts',this.value)" placeholder="Filter" />
                            <button class="bg-btn-group" onclick="filterTable('hosts','filter-hosts','')" title="Clear filter"><i class="fa fa-filter" ></i></button>
                            <button class="bg-btn-group" onclick="filterTable('hosts','searchHosts','bypassed')" title="Filter bypassed">P</button>
                            <button class="bg-btn-group" onclick="filterTable('hosts','searchHosts','authorized')" title="Filter authorized">A</button>

                       
                        </div>
                    
                    </div>
                    <div class="card-fixed mr-t-10">
                    
                    <table class="table table-bordered table-hover hotspot-hosts">
                        <thead>
                            <tr>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody id="hosts" class="text-nowrap">
                            <tr>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
            </div>
            <div class="card-footer"><span id="loading"></span> </div>
            </div>
        </div>
    </div>
</div>


<?php } ?>


<div id="addh_user" class="modal unselect">
  <div class="modal-content">
    <span id="huClose" class="close">&times;</span>
    <div class="modal-header">
      
      <!-- <h3 ><i class="fa fa-user-plus"></i> Add User</h3> -->

        <span id="usrtt"><i class="fa fa-user-plus"></i>&nbsp; <b>Add User</b> &nbsp; </span>
        <span class="card-tab card-tab-active" id="btn-general">General</span>
        <span class="card-tab" onclick="" id="btn-details">Details</span>
    </div>
    <div class="modal-body">
        <div id="ugeneral">
            <table class="table">
              <tr><td>Server</td><td>
                  <select class="form-control" id="add_hserver">
                    <option value="all">all</option>
                  </select>
              </td></tr>
              <tr><td>Name</td><td><input id="add_usrid" autocomplete="off" class="form-control" type="hidden" value="0" /><input id="add_usrname" autocomplete="off" class="form-control" type="text" /></td></tr>
              <tr><td>Password <span title="Show / hide password" class="mr-t-5 text-center"><input class="chkbox" onclick="shPass('add_usrpass')" type="checkbox"></span></td><td><input id="add_usrpass" autocomplete="off" style="position: relative;" class="form-control key" type="text"/></td></tr>
              <tr><td>MAC Address</td><td><input id="add_usrmac" autocomplete="off" class="form-control" type="text" /></td></tr>
              <tr><td>Profile</td><td>
                  <select class="form-control" id="add_usrprofile">
                  </select>
              </td></tr>
              <tr><td>Time Limit</td><td><input id="add_tlimit" autocomplete="off" class="form-control" type="text" onkeyup="this.value = this.value.toLowerCase();" /></td></tr>
              <tr><td>Data Limit</td><td><input id="add_dlimit" autocomplete="off" class="form-control" type="text"  onkeyup="this.value = this.value.toUpperCase();" /></td></tr>
              <tr><td>Comment</td><td><input id="add_usrcomm" autocomplete="off" class="form-control" type="text" /></td></tr>
              <tr><td>Expire Date</td><td><input id="usrexp" autocomplete="off" class="form-control" type="text" readonly /></td></tr>
          </table>
        </div>
        <div id='udetails' class="hide">
            <table class="table">
              <tr><td>Uptime</td><td><input class="form-control" readonly type="text" id="uuptime" /></td></tr>
              <tr><td>Bytes In</td><td><input class="form-control" readonly type="text" id="ubytesin" /></td></tr>
              <tr><td>Bytes Out</td><td><input class="form-control" readonly type="text" id="ubytesout" /></td></tr>
              <tr><td>Limit Uptime</td><td><input class="form-control" readonly type="text" id="ulimituptime" /></td></tr>
              <tr><td>Limit Bytes Total</td><td><input class="form-control" readonly type="text" id="ulimitbytestotal" /></td></tr>
              <tr><td>User Code</td><td><input class="form-control" readonly type="text" id="ucode" /></td></tr>
          </table>
        </div>
        <div>
            <table class="table">
                <tr>
                    <td>
                        <button class="btn bg-primary" style="float: right;" onclick="addUser()"><i class="fa fa-save"></i> Save</button>
                        <span id="usract-btn" style="display: none">
                            <button class="btn bg-warning" style="float: right;" onclick="resetUser()"><i class="fa fa-history"></i> Reset</button>
                            <button class="btn bg-danger" style="float: right;" onclick="remUser()"><i class="fa fa-minus-square"></i> Remove</button>
                        </span>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <div class="modal-footer">
        <span id="add_usrmsg">&nbsp;</span>
    </div>
  </div>

</div>
<script>
    
$(document).ready(function() {
// $("#user-profiles").removeClass('hide').addClass('block');
setTimeout(function(){
        setTimeout(function(){
            loadUserProfiles()
            // loadUsersPPF()
            // loadHotspotActive()
        },100)
    // $("#profiles").html("")
},1)



    $(".user-profiles").fancyTable({
    inputId: "searchProfiles",
    sortColumn:1,
    pagination: true,
    perPage:15,
    globalSearch:true,
    });

    $(".hotspot-users").fancyTable({
    inputId: "searchUsers",
    sortColumn:2,
    pagination: true,
    perPage:15,
    globalSearch:true,
    });

    $(".hotspot-active").fancyTable({
    inputId: "searchActive",
    sortColumn:1,
    pagination: true,
    perPage:15,
    globalSearch:true,
    });
    
    $(".hotspot-hosts").fancyTable({
    inputId: "searchHosts",
    sortColumn:2,
    pagination: true,
    perPage:15,
    globalSearch:true,
    });


})


</script>

<?php
include_once("view/footer_html.php");
}
?>
