$(function(){ //same as document.addEventListener("DOMCONTENTLOADED")

//same as document.queryselector().addEventListener("blur")

$("#navbarToggle").blur(
    function(event){

    var screenWidth=window.innerWidth;
    if(screenWidth<768)
    {
        $("#collapsable-nav").collapse('hide');
    }    
    }


);




});

(function(global){

var dc={};

var homehtml="snippets/home-snippet.html";
var allCategoriesUrl="http://davids-restaurant.herokuapp.com/categories.json";
var categoryhtml="snippets/category-snippet.html";
var categoriesTitleHtml="snippets/categories-title-snippet.html";
var menuItemsTitleHtml="snippets/menu-items-title.html";
var menuItemHtml="snippets/menu-item.html";
var menuitemsurl="http://davids-restaurant.herokuapp.com/menu_items.json?category=";

//Convenience function for inserting innerhtml for 'select'

var insertHtml=function(selector,html){

var targetElem=document.querySelector(selector);
targetElem.innerHTML=html;
};

var showLoading=function(selector){
    var html="<div class='text-center'>";
    html+="<img src='images/ajax-loader.gif'></div>";
    insertHtml(selector,html);
};
//return substitute of '{{propName}}'
var insertProperty=function(string,propName,propValue){

var propToReplace="{{"+propName+"}}";
string =string.replace(new RegExp(propToReplace,"g"),propValue);
return string;
};




//on page load before images or css

document.addEventListener("DOMContentLoaded",function(event){

showLoading("#main-content");
$ajaxUtils.sendGetRequest(
    homehtml,
    function(responseText)
    {
        document.querySelector("#main-content").innerHTML=responseText;
    },false);

    
 //load the menu categories view
 dc.loadMenuCategories= function(){
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
        allCategoriesUrl,buildAndShowCategoriesHTML);

        var classes=document.querySelector("#navhomebutton").className;
        classes=classes.replace(new RegExp('active','g'),"");
        document.querySelector("#navhomebutton").className=classes;
 
 //add active to menu button if not already there
        classes=document.querySelector("#navmenubutton").className;
        if(classes.indexOf('active')==-1)
        {
            classes+=" active";
            document.querySelector("#navmenubutton").className=classes;
 }

    
 }; 

dc.loadMenuItems=function(categoryShort) //function jo ki category-snippet.html se call hoga
{
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
        menuitemsurl+categoryShort,buildAndShowMenuItemsHTML);
 
};

//dc.switchMenuToActive=function(){
//remove 'active' from home button


//};

 //builds HTML for the categoriesn page based on data from the server
 function buildAndShowCategoriesHTML(categories)
 {
     //loading the title snippet of categories page
     console.log("Categires are"+categories);
     chooseRandomCategory (categories);
     $ajaxUtils.sendGetRequest(
         categoriesTitleHtml,
         function(categoriesTitleHtml)
         {
            //retrieve single category snippet
            $ajaxUtils.sendGetRequest(categoryhtml,
            function(categoryhtml){
                var categoriesViewHtml=buildCategoriesViewHtml(categories,categoriesTitleHtml,categoryhtml);
                insertHtml("#main-content",categoriesViewHtml);


            },

            false);
         },false
     );
 }  

 function chooseRandomCategory (categories) {
    // Choose a random index into the array (from 0 inclusively until array length (exclusively))
    var randomArrayIndex = Math.floor(Math.random() * categories.length);
  
    // return category object with that randomArrayIndex
    //return categories[randomArrayIndex];
    console.log("random vaala:"+categories[randomArrayIndex]);
  }

 

 function buildCategoriesViewHtml(categories,categoriesTitleHtml,categoryhtml)
 {
     var finalHtml=categoriesTitleHtml;
     finalHtml+="<section class='row'>";

     //loop over categories
     for(var i=0;i<categories.length;i++)
     {
         var html=categoryhtml;
         var name="" + categories[i].name;
         var short_name=categories[i].short_name;
         html=insertProperty(html,"name",name);
         html=insertProperty(html,"short_name",short_name);
        finalHtml+=html; 
     }
     finalHtml+="</section>";
     return finalHtml;
 }

 //for menu items
  function buildAndShowMenuItemsHTML(categoryMenuItems)
 {
     //loading the title snippet of categories page
     
     $ajaxUtils.sendGetRequest(
         menuItemsTitleHtml,
         function(menuItemsTitleHtml)
         {
            //retrieve single category snippet
            $ajaxUtils.sendGetRequest(menuItemHtml,
            function(menuItemHtml){
                var menuItemViewHtml=buildMenuItemViewHtml(categoryMenuItems,menuItemsTitleHtml,menuItemHtml);
                insertHtml("#main-content",menuItemViewHtml);


            },

            false);
         },false
     );
 }  

 
 function buildMenuItemViewHtml(categoryMenuItems,menuItemsTitleHtml,menuItemHtml)
 {
     
     menuItemsTitleHtml=insertProperty(menuItemsTitleHtml,"name",categoryMenuItems.category.name);
     menuItemsTitleHtml=insertProperty(menuItemsTitleHtml,"special_instructions",categoryMenuItems.category.special_instructions);
     var finalHtml=menuItemsTitleHtml;
     finalHtml+="<section class='row'>";

     //loop over menu items
     var menuItems=categoryMenuItems.menu_items;
     var catShortName=categoryMenuItems.category.short_name;
     for(var i=0;i<menuItems.length;i++)
     {
         var html=menuItemHtml;
         html=insertProperty(html,"catShortName",catShortName);
         html=insertProperty(html,"short_name",menuItems[i].short_name);
         html=insertItemPrice(html,"price_small",menuItems[i].price_small);
         html=insertItemPrice(html,"price_large",menuItems[i].price_large);
         html=insertProperty(html,"name",menuItems[i].name);
         html=insertProperty(html,"description",menuItems[i].description);
        //adding clearfix after every second menu item

        if(i%2!=0)
        {
            html+="<div class='visible-lg-block visible-md-block'></div>";
        }
        
        finalHtml+=html; 
     }
     finalHtml+="</section>";
     return finalHtml;
 }


function insertItemPrice(html,pricepropName,priceValue){

if(!priceValue)
{
    return insertProperty(html,pricepropName,"");
}
priceValue="$"+priceValue.toFixed(2);
html=insertProperty(html,pricepropName,priceValue);
return html;
};

});
global.$dc=dc;
})(window);