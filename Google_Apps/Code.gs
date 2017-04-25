function doGet() {
return HtmlService.createHtmlOutputFromFile('index')
}

var debug = false;
var google = true;
var languages = {
    "en_US":{
        custom_sms_text:"Download the HomeAway and VRBO Mobile App: {{ link }}",
        desktop_deepview : "homeaway_deepview_en_US",
        og_title : "HomeAway & VRBO Vacation Rentals",
        og_description : "Travelers can browse more than 1 million vacation rental property listings all over the world."
     },
     "en_UK":{
        custom_sms_text:"Download the HomeAway and Owners Direct Mobile App: {{ link }}",
        desktop_deepview : "homeaway_deepview_en_UK",
        og_title : "HomeAway.co.uk & Owners Direct Holiday Rentals",
        og_description : "Travellers can browse more than 1 million holiday rental property listings all over the world."
     },
     "es_ES":{
        custom_sms_text:"Descarga gratis la App móvil de HomeAway y Homelidays: {{ link }}",
        desktop_deepview : "homeaway_deepview_es_ES",
        og_title : "HomeAway y Homelidays Casas de Vacaciones",
        og_description : "Los viajeros tienen acceso a más de 1 millón de propiedades de alquiler vacacional en todo el mundo."
     },
     "fr_FR":{
        custom_sms_text:"Téléchargez l'application Abritel et Homelidays: {{ link }}",
        desktop_deepview : "homeaway_deepview_fr_FR",
        og_title : "Abritel et Homelidays Location de Vacances",
        og_description : "Les vacanciers peuvent rechercher une location de vacances parmi plus d’1 million d’annonces dans le monde entier."
     },
     "de_DE":{
        custom_sms_text:"Laden Sie die FeWo-direkt Mobile App herunter: {{ link }}",
        desktop_deepview : "homeaway_deepview_de_DE",
        og_title : "FeWo-direkt HomeAway Ferienwohnungen & Ferienhäuser",
        og_description : "Raus in die Welt in wenigen Fingertipps - in unserer kostenlosen FeWo-direkt Urlaubs-App halten Sie über 1 Million Ferienhäuser und Ferienwohnungen rund um den Globus in einer Hand."
     }
};
          

function createBranchLink(deeplink_path, campaign, feature, channel, language) {
          
          var desktop_deepview,custom_sms_text,og_title,og_description;
          //validate values
          
          if (!val(deeplink_path) || !val(campaign) || !val(feature) || !val(channel) || !val(language)) {
          logit("missing value [deeplink_path,campaign,feature,channel]");
          if (debug) {
          // deeplink_path = "test_deeplink_path";
          campaign = "test_campaign";
          feature = "test_feature";
          channel = "test_channel";
          language = "en_US";
          } else {
          Logger.log( "missing values");
          }
          
          }
 
  if(languages[language])
  {
    desktop_deepview = languages[language].desktop_deepview;
    custom_sms_text = languages[language].custom_sms_text;
    og_title = languages[language].og_title;
    og_description = languages[language].og_description;
  }
  else
  {
    Logger.log ("missing lang");
  }
 
  
 
 
    if (deeplink_path == 'launch-screen') {
        deeplink_path = null;
    }
 
    //generate payload
    //Social Media
    //"$og_title" : "", //       The title you’d like to appear for the link in social media
    //"$og_description" : "", //          The description you’d like to appear for the link in social media
    //"$og_image_url"        : "", //The URL for the image you’d like to appear for the link in social media
    //"$og_video" : "", //     The URL for the video
    //"$og_url": "", //           The URL you’d like to appear
    //"$og_redirect"            : "", //If you want to bypass our OG tags and use your own, use this key with the URL that contains your site’s metadata.
 
 
    //"$desktop_url" : "", //                Where to send the user on a desktop or laptop. By default it is the Branch-hosted text-me service
    //"$android_url"             : "", //The replacement URL for the Play Store to send the user if they don’t have the app. Only necessary if you want a mobile web splash
    //"$ios_url" : "", //         The replacement URL for the App Store to send the user if they don’t have the app. Only necessary if you want a mobile web splash
    //"$ipad_url" : "", //      Same as above but for iPad Store
 
 
    //"$fire_url" : "", //        Same as above but for Amazon Fire Store
    //"$blackberry_url" : "", //           Same as above but for Blackberry Store
    //"$windows_phone_url" : "", //                Same as above but for Windows Store
 
    //"$after_click_url" : "", //           When a user returns to the browser after going to the app, take them to this URL. iOS only; Android coming soon
    //"branch_key": "key_live_iloxIxoXURs2xAsdv8xCraifCBfYwHFn",
    //put on the header of the document
    //"identity": "", // optional (max 127 characters) The identity used to identify the user. If the link is not tied to an identity, there’s no need to specify an identity.
    //"tags" : "", // optional (each max 64 characters) An array of strings, which are custom tags in which to categorize the links by. Recommended syntax: "tags":[t1,t2,t3].
    //"campaign" : "", // optional (max 128 characters) The campaign in which the link will be used. eg: "new_product_launch", etc.
    //"feature": "", // optional (max 128 characters) The feature in which the link will be used. eg: "invite", "referral", "share", "gift", etc.
    // "channel": "", // optional (max 128 characters) The channel in which the link will be shared. eg: "facebook", "text_message".
    // "stage": "" // optional (max 128 characters) A string value that represents the stage of the user in the app. eg: "level1", "logged_in", etc.
 
 
    var payload = {
        "channel": channel,
        "campaign": campaign,
        "feature": feature,
        "data": {
          "brand": "HOMEAWAY_US",
          "$desktop_deepview" : desktop_deepview,
          "$custom_sms_text" : custom_sms_text,
          //"$og_title" : og_title,
          //"$og_description" : og_description
        },
        "branch_key": "key_live_iloxIxoXURs2xAsdv8xCraifCBfYwHFn"
    };
 
    if (deeplink_path) {
        payload.data.$deeplink_path = deeplink_path;
    }
 
    //generate url
    var url = "https://api.branch.io/v1/url";
    logit(url);
 
 
    var headers = {
        "Content-Type": "application/json"
    };
 
    var options = {
        'method': 'post',
        'contentType': 'application/json; charset=utf-8',
        //'headers': headers,
        "payload": JSON.stringify(payload),
        "muteHttpExceptions": true
    };
 
    var response = null;
    //retrieve link
 
    response = UrlFetchApp.fetch(url, options);
 
 
    var responseData = JSON.parse(response.getContentText());
    for (i in responseData) {
        logit(i + ": " + response[i]);
    }
 
 
    if (responseData.url) {
        Logger.log(responseData.url)
    }
    else {
        return "Error no url found in response";
    }
 
 
    return "wow call ryan - 770.241.7983";
 
 
}
 
//quick validation
function val(val) {
    if (val) {
        return true;
    }
    else {
        return false;
    }
 
}
//quick logging
function logit(val) {
    if (debug) {
        if (google) {
            Logger.log(val);
        }
        else {
            console.log(val);
        }
    }
          
          //document.getElementById("demo").innerHTML ="URL: " + "abc" + ".";
  
}
