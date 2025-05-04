document.addEventListener("DOMContentLoaded", function () {
  // Get the current page name from the URL
  const currentPage = window.location.pathname.split("/").pop(); // Get the file name from the URL

  // Set the title based on the page name
  let pageTitle = "";
  switch (currentPage) {
    case "index.html":
      pageTitle = "Home";
      break;
    case "projects.html":
      pageTitle = "Projects";
      break;
    case "aboutme.html":
      pageTitle = "About Me";
      break;
    default:
      pageTitle = "Welcome";
  }
  // Set the title
  document.querySelector("h1").textContent = pageTitle;
});

document.addEventListener("DOMContentLoaded", function () {
  // Auto-show function
  const autoShowElements = document.querySelectorAll(".autoShow");

  const autoShowObserverOptions = {
    root: null, // Use the viewport as the root
    rootMargin: "0px",
    threshold: 0.5, // Show when 50% of the element is visible
  };

  const autoShowObserverCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible"); // When the element is visible, add the class
      } else {
        entry.target.classList.remove("visible"); // When the element is hidden, remove the class
      }
    });
  };

  const autoShowObserver = new IntersectionObserver(
    autoShowObserverCallback,
    autoShowObserverOptions,
  );
  autoShowElements.forEach((element) => {
    autoShowObserver.observe(element);
  });

  // Auto-blur function
  const autoBlurElements = document.querySelectorAll(".autoBLur");

  const autoBlurObserverOptions = {
    root: null, // Use the viewport as the root
    rootMargin: "0px",
    threshold: 0.8, // Show when 80% of the element is visible
  };

  const autoBlurObserverCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio >= 0.8) {
        entry.target.classList.add("autoClear"); // When the element is visible, add the class
        entry.target.classList.remove("autoBLur"); // Remove the blur class
      } else {
        entry.target.classList.add("autoBLur"); // When the element is hidden, add the blur class
        entry.target.classList.remove("autoClear"); // Remove the clear class
      }
    });
  };

  const autoBlurObserver = new IntersectionObserver(
    autoBlurObserverCallback,
    autoBlurObserverOptions,
  );
  autoBlurElements.forEach((element) => {
    autoBlurObserver.observe(element);
  });
});
