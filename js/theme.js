const toggleTheme = () => {
	if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
		console.log("dark")
    localStorage.theme = "dark";
    document.getElementById("theme_toggler").innerHTML = "&#127774;"; // sun
  } else {
		console.log("light");
		document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
    document.getElementById("theme_toggler").innerHTML = "&#127769;"; // moon
  }
}

// Executed before loading the HTML to avoid Flash of unstyled content (FOUC)
toggleTheme();

export default toggleTheme;
