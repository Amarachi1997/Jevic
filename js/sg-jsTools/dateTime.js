/*
A digital date and time library written by Ifeanyi Michael (A.k.a. Worths-Alive)

HOW TO USE
1.  embed this script at the head section of your      html or php page
2.  Call a function in the 'onLoad' event of the        body tag. there are only three main methods to call [showDate(id_value_of_the_html_elemet), showTime(), showDateTime()]
3.  Create a html element with an id value 'time'. Eg: <span id='time'></span>
#
#
#
#
*/


var element;
 var days = new Array("Sun","Mon","Tue","Wed","Thu","Fri","Sat");
    var mont = new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
//-=FUNCTION TO SETUP THE CURRENT DATE=-//
function setDate(){
    var dateObject = new Date();//get the date object
   var d = dateObject.getDate();
   var dy = dateObject.getDay();
   var m = dateObject.getMonth();
   var y = dateObject.getFullYear();
   if(d<10){
      d="0"+d;
  }
  
   var display=days[dy]+" "+d+" "+mont[m]+" "+y+". ";
   return display;
    //alert(dob);
}
function showDate(obj){
    setInterval(function(){
        $(obj).text(setDate());
    },500);
}
//-=FUNCTION TO SETUP THE CRRENT TIME=-//
function setTime(){
    dateObject=new Date();
        var ampm="am";
    var h=dateObject.getHours();
   var m=dateObject.getMinutes();
   var s=dateObject.getSeconds();
    m=checkTime(m);
    s=checkTime(s);
    if(h >12){
        var ampm="pm";
        h-=12;//subtract 12
    }//end am/pm assignment else
    else if(h == 0){
        h=12;//assing 12 as in am
    }
        h=checkTime(h);

    
    //format the time
    var time=h+":"+m+":"+s+" "+ampm;
    return time;
       
}
function showTime(ele){
    
    setInterval(function(){
        $(ele).text(setTime());
    },500);
    
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}


function showDateTime(date,time){
        var curdate=showDate(date);
       var curtime=showTime(time);
        
    
}

         
function demacate(){
    var head=document.getElementById('head');
    var h_height=head.clientHeight;
    var dem=document.getElementById('demacator');
    h_height+=2;
    dem.style.height=h_height+"px";
}