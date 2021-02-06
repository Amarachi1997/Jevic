
/*AJAX FUNCTION TO SUBMIT FORMS*/
/* Description: 
    Ajax form submision library written by Ifeanyi Michael (A.k.a. Worths-Alive)

    the submitForm function works with the loader-preview.js script.
    params:
        frmObj - (Object) html form element
        url - (string) the action url where the form will be submited for processing
        succMsg - (string) Message to display on success
        loadMsg - (string) Message to be display while still loadding/sending the form
 */
function submitForm(frmObj,url,succMsg,loadMsg){
    if(!loadMsg){loadMsg = 'Submiting...';}
    if(!succMsg){succMsg = "Your Message Has Been Sent Successfully";}
    showLoader(loadMsg);//display the loader preview
        var data = false;
    if(window.FormData){
        data = new FormData(frmObj[0]);
    }
        //data = frmObj.serialize();
        data = new FormData(frmObj[0]);
         var promise = $.ajax({
            url: url,
            data: data ? data:frmObj.serialise(),
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            //mimeType:"multipart/form-data",
          })
            .done(function(msg) {
                console.log(msg);
                hideLoader();
                if(msg === "ok" || msg == 1){
                    swal(succMsg,'success');
                    //$.notify(succMsg,{className:"success",autoHideDelay:10000,clickToHide:true});
                   
                }else{
                    swal('Info!',msg,'info');
                    //$.notify(msg,{className:"warning",clickToHide:true,autoHide:false,position:""});
                }
                
                return true;
            })
            .fail(function(xhr) {
                var err =  "An Error Occured, Please Try Again ";
                hideLoader();
                console.log(err+": error code: "+xhr.status+" - "+xhr.statusText);
                swal(err,"error");
               // $.notify("Error! "+err,{className:"error",clickToHide:true,autoHideDelay:5000});
            
                return false;
                });
                return promise;
}

//function to login
function login(frmObj,url,callback_url){
    if(!callback_url){callback_url = ''}
    showLoader('Authenticating...');//display the loader preview
        var data = false;
    if(window.FormData){
        data = new FormData(frmObj[0]);
    }
        //data = frmObj.serialize();
        data = new FormData(frmObj[0]);
          return $.ajax({
            url: url,
            data: data ? data:frmObj.serialise(),
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            //mimeType:"multipart/form-data",
            before: function(){
                //$.notify.init();
                $.notify("Authenticating...",{className:"info",clickToHide:true});
                
            }
          })
            .done( function(msg) {
                if(msg != "ok"){
                    $(frmObj).notify(msg,{className:"error",clickToHide:true,autoHide:false,position:'t'});
                }else{
                    if(callback_url != '') {
                        $(frmObj).notify("Authentication Successfull. Redirecting...", {
                            className: "success",
                            clickToHide: true,
                            position: 't l'
                        });
                        document.location.replace(callback_url);
                    }else{
                        $(frmObj).notify("Authentication Successfull.", {
                            className: "success",
                            clickToHide: true,
                            position: 't l'
                        });
                        document.location.reload();
                    }
                }
                hideLoader();
            })
            .fail(function(xhr) {
                var err =  xhr.statusText;
            $.notify("Error! "+xhr.status+" - "+err,{className:"error",clickToHide:true,position:"t"});
            hideLoader();
            });
        
}

/*AJAX FUNCTION TO POPULATE DATA*/
function populateData(data_url,data,display){
    var output = $(display);
    //show the loader icon
    preLoader.show(output);
   return $.ajax({
        type: 'post',
        url: data_url,
        data: data
      
  }).done(function(d){
        output.html(d);
    })
    .fail(function(xhr){
        output.html("Oops! "+xhr.statusText);
    });
}

/*AJAX FUNCTION TO RETURN RESPONSE DATA*/
function returnResponse(data_url,data,requestType){
    if(!requestType){requestType = '';}
    return $.ajax({
        type: 'post',
        url: data_url,
        data: data
      
  }).done(function (response){
      if (requestType === 'json'){return JSON.parse(response);}
      else if(requestType === 'string'){return JSON.stringify(response);}
      else if (requestType === ''){  return response; }
    }).fail(function (xhr) {
        let err =  xhr.statusText;
        $.notify("Error! "+err,{className:"error",clickToHide:true,autoHideDelay:5000});
    });
}
