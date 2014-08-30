$(document).ready(function() {
    var url = window.location.href;
    if (url.search("-au-whyactech") >= 0 || url.search("-tc-variety") >= 0 || url.search("-pm-variety") >= 0 || url.search("-vas-productdesign") >= 0) {
        $("#mylia1").addClass("current");
	} else if (url.search("-tc-equipment") >= 0 || url.search("-pm-equipment") >= 0 || url.search("-vas-prototyping") >= 0 || url.search("-au-testimonials") >= 0 || url.search("-au-tm") >= 0) {
		$("#mylia2").addClass("current");
    } else if (url.search("-au-projectschedule") >= 0 || url.search("-vas-marketsurveysampling") >= 0) {
        $("#mylia3").addClass("current");
    } else if (url.search("-au-contactus") >= 0 || url.search("-vas-secondaryoperations") >= 0) {
        $("#mylia4").addClass("current");
  	} else if (url.search("-vas-extendedservices") >= 0) {
        $("#mylia5").addClass("current");
   	} else if (url.search("-pm-abs") >= 0) {
		ShowSubMenu(1);
        $("#mylia3-1").addClass("current");
  	} else if (url.search("-pm-pc") >= 0) {
		ShowSubMenu(1);
        $("#mylia3-2").addClass("current");
   	} else if (url.search("-pm-pa") >= 0) {
		ShowSubMenu(1);
        $("#mylia3-3").addClass("current");
   	} else if (url.search("-pm-abspc") >= 0) {
		ShowSubMenu(1);
        $("#mylia3-4").addClass("current");
   	} else if (url.search("-pm-pmma") >= 0) {
		ShowSubMenu(1);
        $("#mylia3-5").addClass("current");
   	} else if (url.search("-pm-pp") >= 0) {
		ShowSubMenu(1);
        $("#mylia3-6").addClass("current");
   	} else if (url.search("-pm-pom") >= 0) {
		ShowSubMenu(1);
        $("#mylia3-7").addClass("current");
   	} else if (url.search("-pm-pbt") >= 0) {
		ShowSubMenu(1);
        $("#mylia3-8").addClass("current");
    }
 });

var currentMenu = 1;
function ShowSubMenu(id) {
  if (document.all["SubMenu" + id].style.display == "")
  {
     document.all["SubMenu" + id].style.display = "none";
     currentMenu = 0;
  }
  else
  {
     if (currentMenu != 0) {document.all["SubMenu" + currentMenu].style.display = "none";}
     document.all["SubMenu" + id].style.display = "";
     currentMenu = id;
  }
}
