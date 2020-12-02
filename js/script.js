// sweet alert to show error
function error(message) {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    confirmButtonColor: "#000",
    text: message,
  });
}

// function to open sidebars
function openNav(nav, direction) {
  $("#" + nav).removeClass("hidden animate__fadeOut" + direction);
  $("#" + nav).addClass("animate__fadeIn" + direction);
  $(".sidebar-bg-overlay").removeClass("hidden animate__fadeOut");
  $(".sidebar-bg-overlay").addClass("animate__fadeIn");
}

// function to close sidebars
function closeNav(nav, direction) {
  $("#" + nav).removeClass("animate__fadeIn" + direction);
  $("#" + nav).addClass("animate__fadeOut" + direction);
  $(".sidebar-bg-overlay").addClass("animate__fadeOut");
  $(".sidebar-bg-overlay").removeClass("animate__fadeIn");
  setTimeout(function () {
    $(".sidebar-bg-overlay").addClass("hidden");
  }, 500);
}

// function to display forgot password 
function showForgotPass() {
  $('#forgotPassword').addClass("active");
}

// function to hide forgot password 
function hideForgotPass() {
  $('#forgotPassword').removeClass("active");
}

// function to show arts submenu 
function showArtsSubMenu() {
  $('#arts-submenu').addClass("active");
}

// function to hide arts submenu 
function hideSubMenu(el) {
  this.event.stopPropagation();
  $(el).parent().parent().removeClass("active");
}

$(document).ready(function () {

  artsSubMenu = $("#arts-submenu");

  // close sidebar on clicking outside the container
  $('.sidebar-bg-overlay').click(e => {
    closeNav('accountBar', 'Right');
    closeNav('sideNav', 'Left');
  });

  /* Navigation scroll */
  // Select all links with hashes
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ?
          target :
          $("[name=" + this.hash.slice(1) + "]");
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $("html, body").animate({
              scrollTop: target.offset().top,
            },
            1000,
            function () {
              // Callback after animation
              // Must change focus!
              var $target = $(target);
              $target.focus();
              if ($target.is(":focus")) {
                // Checking if the target was focused
                return false;
              } else {
                $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
                $target.focus(); // Set focus again
              }
            }
          );
        }
      }
    });

  subscribeNews.addEventListener("submit", (e) => {
    e.preventDefault();
    if (subscribeNews.checkValidity() == false) {
      error();
      return;
    }
    var emailSub = subEmail.value;
    Swal.fire({
      icon: "success",
      title: "Success",
      confirmButtonColor: "greenyellow",
      text: "You have been subscribed successfully!",
    });
    subscribeNews.reset();
  });

  commentform.addEventListener("submit", (e) => {
    e.preventDefault();
    if (commentform.checkValidity() == false) {
      error();
      return;
    }
    var emailRev = commentform["email"].value;
    Swal.fire({
      icon: "success",
      title: "Success",
      confirmButtonColor: "greenyellow",
      text: "Your review has been submitted!",
    });
    commentform.reset();
  });

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (contactForm.checkValidity() == false) {
      error();
      return;
    }
    var contactEmail = contactForm.email.value;
    Swal.fire({
      icon: "success",
      title: "Success",
      confirmButtonColor: "greenyellow",
      text: "Your message has been sent successfully!",
    });
    contactForm.reset();
  });
});

$("#toggleCanvas").click(e => {
  $("#c").toggle("fold", 2000);
});

/* Drawing matrix on canvas */
var c = document.getElementById("c");
var cxt = c.getContext("2d");

c.width = window.innerWidth;
c.height = window.innerHeight;

var chinese =
  "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑";
chinese = chinese.split("");

var font_size = 10;
var columns = c.width / font_size;

var drops = [];

for (var x = 0; x < columns; x++) {
  drops[x] = 1;
}

function draw() {
  cxt.fillStyle = "rgba(0,0,0,0.05)";
  cxt.fillRect(0, 0, c.width, c.height);

  cxt.fillStyle = "#0F0";
  cxt.font = font_size + "px arial";

  for (var i = 0; i < drops.length; i++) {
    var text = chinese[Math.floor(Math.random() * chinese.length)];
    cxt.fillText(text, i * font_size, drops[i] * font_size);

    if (drops[i] * font_size > c.height && Math.random() > 0.975)
      drops[i] = 0;

    //increment y coordinate
    drops[i]++;
  }
}
setInterval(draw, 33);