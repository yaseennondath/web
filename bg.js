$.getScript("https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js",
function(){
     particlesJS('particles-js',
      { "particles": { "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
       "color": { "value": "#f59042" },
        "shape": { "type": "circle",
        "stroke": { "width": 0,
        "color": "#f5a442" },
        "polygon": { "nb_sides": 5 },
        "image": { "width": 100, 
        "height": 50 } }, 
        "opacity": { "value": 0.5, 
        "random": false, 
        "anim": { 
            "enable": false, 
            "speed": 1, 
            "opacity_min": 0.1, 
            "sync": false } 
        }, 
        "size": { 
            "value": 5, 
            "random": true, 
        "anim": { 
            "enable": false, 
            "speed": 40, 
            "size_min": 0.1, 
            "sync": false } 
        }, 
        "line_linked": { 
            "enable": true, 
            "distance": 150, 
            "color": "#f59042", 
            "opacity": 0.4, "width": 1 }, 
        "move": { 
            "enable": true, 
            "speed": 6, 
            "direction": "none", 
            "random": false, 
            "straight": false, 
            "out_mode": "out", 
        "attract": { 
            "enable": false, 
            "rotateX": 600, 
            "rotateY": 1200 
        } 
    } 
}, 
"interactivity": { 
    "detect_on": "canvas", 
    "events": { 
        "onhover": { 
            "enable": true, 
            "mode": "repulse" 
        }, 
        "onclick": { 
            "enable": true, 
            "mode": "push" 
        }, 
        "resize": true 
    }, 
    "modes": { 
        "grab": { 
            "distance": 400, 
            "line_linked": { 
                "opacity": 1 
            } 
        }, 
        "bubble": { 
            "distance": 400, 
            "size": 40, 
            "duration": 2, 
            "opacity": 8, 
            "speed": 3 
        }, 
        "repulse": { 
            "distance": 200 
        }, 
        "push": { 
            "particles_nb": 4 
        }, 
        "remove": { 
            "particles_nb": 2 
        } 
    } 
}, 
"retina_detect": true, "config_demo": { 
    "hide_card": false, 
    "background_color": "#b61924", 
    "background_image": "", 
    "background_position": "50% 50%", 
    "background_repeat": "no-repeat", 
    "background_size": "cover" 
} 
} 
);
}
); 


function validEmail(email) { // see:
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }
  //debugger;
  function validateHuman(honeypot) {
    if (honeypot) {  //if hidden form filled up
      console.log("Robot Detected!");
      return true;
    } else {
      console.log("Welcome Human!");
    }
  }
  
  // get all data in form and return object
  function getFormData() {
    var form = document.getElementById("submit-form");
    var elements = form.elements; // all form elements
    var fields = Object.keys(elements).map(function(k) {
      if(elements[k].name !== undefined) {
        return elements[k].name;
      // special case for Edge's html collection
      }else if(elements[k].length > 0){
        return elements[k].item(0).name;
      }
    }).filter(function(item, pos, self) {
      return self.indexOf(item) == pos && item;
    });
    var data = {};
    fields.forEach(function(k){
      data[k] = elements[k].value;
      var str = ""; // declare empty string outside of loop to allow
                    // it to be appended to for each item in the loop
      if(elements[k].type === "checkbox"){ // special case for Edge's html collection
        str = str + elements[k].checked + ", "; // take the string and append 
                                                // the current checked value to 
                                                // the end of it, along with 
                                                // a comma and a space
        data[k] = str.slice(0, -2); // remove the last comma and space 
                                    // from the  string to make the output 
                                    // prettier in the spreadsheet
      }else if(elements[k].length){
        for(var i = 0; i < elements[k].length; i++){
          if(elements[k].item(i).checked){
            str = str + elements[k].item(i).value + ", "; // same as above
            data[k] = str.slice(0, -2);
          }
        }
      }
    });
  
    // add form-specific values into the data
    data.formDataNameOrder = JSON.stringify(fields);
    data.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
    data.formGoogleSendEmail = form.dataset.email || ""; // no email by default
  
    console.log(data);
    return data;
  }
  
  function handleFormSubmit(event) {  // handles form submit withtout any jquery
    event.preventDefault();           // we are submitting via xhr below
    var data = getFormData();         // get the values submitted in the form
  
    /* OPTION: Remove this comment to enable SPAM prevention, see README.md
    if (validateHuman(data.honeypot)) {  //if form is filled, form will not be submitted
      return false;
    }
    */
  
    if( !validEmail(data.email) ) {   // if email is not valid show error
      document.getElementById('email-invalid').style.display = 'block';
      return false;
    } else {
      var url = event.target.action;  //
      var xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      // xhr.withCredentials = true;
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.onreadystatechange = function() {
          console.log( xhr.status, xhr.statusText )
          console.log(xhr.responseText);
          document.getElementById('submit-form').style.display = 'none'; //hide form
          document.getElementById('thankyou_message').style.display = 'block';
          return;
      };
      // url encode form data for sending as post data
      var encoded = Object.keys(data).map(function(k) {
          return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
      }).join('&')
      xhr.send(encoded);
    }
  }
  
  function loaded() {
    //console.log('idea form submission handler loaded successfully');
    // bind to the submit event of our form
    var form = document.getElementById('submit-form');
    form.addEventListener("submit", handleFormSubmit, false);
  };
  document.addEventListener('DOMContentLoaded', loaded, false);

  
  
  