function scrollToAbout() {
  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    aboutSection.scrollIntoView({ behavior: 'smooth' }); 
  } else {
    console.error("The 'about' section was not found."); 
  }
}
function showEducation() {
  document.getElementById("education").style.display = "block";
}

function showWork() {
  // Placeholder for future work tab content
  alert("Work content will be added later.");
}
let currentIndex = 0;

    function scrollCarousel(direction) {
      const track = document.getElementById('carousel-track');
      const totalItems = track.children.length;
      const itemWidth = track.children[0].offsetWidth;

      // Update index
      currentIndex += direction;
      if (currentIndex < 0) currentIndex = totalItems - 1;
      if (currentIndex >= totalItems) currentIndex = 0;

      // Apply transform
      track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }

    
    function conatctme() {
      const contactSection = document.getElementById('mummy');
    if (contactSection) {
     contactSection.scrollIntoView({ behavior: 'smooth' }); 
    }  else {
     console.error("The 'about' section was not found."); 
    }
    }

    function home(){
      const homeSection=document.getElementById('s');
      if(homeSection){
        homeSection.scrollIntoView({behavior:'smooth'});
      }
      else {
        console.error("The 'about' section was not found."); 
       }
    }

    function skills(){
      const skillsSection=document.getElementById('a');
      if(skillsSection){
        skillsSection.scrollIntoView({behavior:'smooth'});
      }
      else {
        console.error("The 'about' section was not found."); 
       }
    }

    function projects(){
      const projectsSection=document.getElementById('l');
      if(projectsSection){
        projectsSection.scrollIntoView({behavior:'smooth'});
      }
      else {
        console.error("The 'about' section was not found."); 
       }
    }

    function submitForm(event) {
      event.preventDefault(); // Prevent default form submission
      
      const form = document.querySelector('.contact-form'); // Select the form
      const inputs = form.querySelectorAll('input, textarea'); // Get all input fields
      let allFilled = true;
    
      // Validate each input field
      inputs.forEach(input => {
        if (!input.value.trim()) { // Check if the input is empty or only whitespace
          allFilled = false;
          input.style.borderColor = "red"; // Highlight empty inputs
        } else {
          input.style.borderColor = "initial"; // Reset border color for filled inputs
        }
      });
    
      if (allFilled) {
        alert("Your message has been sent!"); // Show success message
        form.reset(); // Clear the form fields for a new submission
      } else {
        alert("Please fill all the required fields."); // Show error message
      }
    }
    

    