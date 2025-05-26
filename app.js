document.addEventListener("DOMContentLoaded", () => {
  const bars = document.getElementById('hamburger');
  const navList = document.getElementById('nav-list');
  const navLinks = document.querySelectorAll('#nav-list a');
  const navbar = document.getElementById('header');
  const btns = document.querySelectorAll('.nav-btn');
  const videoSlides = document.querySelectorAll('.video-slide');
  const videoTitle = document.getElementById('video-title');
  const videoDescription = document.getElementById('video-description');
  const buttonText = document.getElementById('button-text');
  const dateDisplay = document.getElementById('date-display');
  const currentDate = new Date();

  // Display current year
  const now = currentDate.getFullYear();
  dateDisplay.innerHTML = now;

  // Handling the scroll 
  const handleScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 70);
  };

  

  window.addEventListener('scroll', handleScroll);
  window.addEventListener('load', handleScroll);


  // toggle the hamburger menu
  let isActive = false;
  bars.addEventListener('click', () => {
    navList.classList.add('remove');
    navList.classList.toggle('active');

    isActive = !isActive;

     bars.innerHTML = isActive
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars-staggered"></i>';
  });

  // Close the mobile nav menu on click
  navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('active');
        bars.innerHTML = '<i class="fa-solid fa-bars-staggered"></i>';
      });
    });
  


  // Close the mobile nav menu on scroll
  window.addEventListener('scroll', () => {
    if (isActive) {
      isActive = false;
      
    setTimeout(() => {
      navList.classList.remove('active');
      bars.innerHTML = '<i class="fa-solid fa-bars-staggered"></i>';
    }, 1000); 
    }
  });

  // Function to update video slider
  let index = 0;
  const sliderNav = (manual) => {
    // Deactivate all
    videoSlides.forEach(video => video.classList.remove('active'));
    btns.forEach(btn => btn.classList.remove('active-btn'));

    // Activate selected
    const selectedVideo = videoSlides[manual];
    selectedVideo.classList.add('active');
    btns[manual].classList.add('active-btn');

    // Reset and play video
    selectedVideo.currentTime = 0;
    selectedVideo.play();

    // Update text content from data attributes
    videoTitle.innerHTML = selectedVideo.getAttribute('data-title');
    videoDescription.innerHTML = selectedVideo.getAttribute('data-description');
    buttonText.innerHTML = selectedVideo.getAttribute('data-button-text');

    index = manual;
  };

  // On page load
  window.addEventListener('load', () => {
    sliderNav(0);
  });

  // Manual navigation with dots
  btns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      sliderNav(i);
    });
  });

  // Auto-slide every 7 seconds
  setInterval(() => {
    index = (index + 1) % videoSlides.length;
    sliderNav(index);
  }, 7000);

});