// (function(global){

//         var ajaxUtils={};
//         function getRequestObject()
//         {
//             if(window.XMLHttpRequest)
//             {
//                 return (new XMLHttpRequest());
//             }

//             else if(window.ActiveXObject)
//             {
//                 return (new ActiveXObject("Microsoft XMLHTTP"));
//             }

//             else{
//                 global.alert("Ajax is not supported");
//                 return(null);
//             }
//         }

//         ajaxUtils.sendGetRequest=function(requestUrl,responseHandler){

//                 var request=getRequestObject();
//                 request.onreadystatechange= function(){

//                     handleResponse(request,responseHandler);
//                 };
//                 request.open("GET",requestUrl,true);
//                 request.send(null);

//         };

//         function handleResponse(request,responseHandler)
//         {
//             if((request.readyState==4)&&(request.status==200))
//             {
//                 responseHandler(request);
//             }
//         }

//         global.$ajaxUtils=ajaxUtils;

// })(window);//end of IFFI


//traversing json

(function(global){

        var ajaxUtils={};
        function getRequestObject()
        {
            if(window.XMLHttpRequest)
            {
                return (new XMLHttpRequest());
            }

            else if(window.ActiveXObject)
            {
                return (new ActiveXObject("Microsoft XMLHTTP"));
            }

            else{
                global.alert("Ajax is not supported");
                return(null);
            }
        }

        ajaxUtils.sendGetRequest=function(requestUrl,responseHandler,isJsonResponse){

                var request=getRequestObject();
                request.onreadystatechange= function(){

                    handleResponse(request,responseHandler,isJsonResponse);
                };
                request.open("GET",requestUrl,true);
                request.send(null);

        };

        function handleResponse(request,responseHandler,isJsonResponse)
        {
            if((request.readyState==4)&&(request.status==200))
            {
                
                if(isJsonResponse==undefined)
                {
                    console.log("msd");
                    isJsonResponse=true;
                }

                if(isJsonResponse)
                {
                    console.log("parse karo bhai");
                    responseHandler(JSON.parse(request.responseText)); //converts to object
                }

                else 
                {
                    responseHandler(request.responseText);
                }
                console.log(isJsonResponse);
            }
        }

        global.$ajaxUtils=ajaxUtils;

})(window);//end of IFFI