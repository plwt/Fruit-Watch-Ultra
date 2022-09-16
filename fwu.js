"use strict";

const themes = {
  'Day': {
    images: {},
    properties: {},
    colors: {
      toolbar: "rgb(206, 206, 206)",
      toolbar_text: "rgb(0, 0, 0)",
      frame: "rgb(206, 206, 206)",
      tab_background_text: "rgb(0, 0, 0)",
      toolbar_field: "rgb(255, 255, 255)",
      toolbar_field_text: "rgb(0, 0, 0)",
      tab_line: "rgb(245, 105, 0)",
      popup: "rgb(255, 255, 255)",
      popup_text: "rgb(0, 0, 0)",
      toolbar_field_border: "rgb(245, 105, 0)",
      toolbar_field_highlight: "rgb(245, 105, 0)",
      tab_loading: "rgb(245, 105, 0)"
    }
  },

  'Night': {
    images: {},
    properties: {},
    colors: {
      toolbar: "rgb(0, 0, 0)",
      toolbar_text: "rgb(255, 0, 0)",
      frame: "rgb(0, 0, 0)",
      tab_background_text: "rgb(255, 0, 0)",
      toolbar_field: "rgb(0, 0, 0)",
      toolbar_field_text: "rgb(255, 0, 0)",
      tab_line: "rgb(255, 0, 0)",
      popup: "rgb(0, 0, 0)",
      popup_text: "rgb(255, 0, 0)",
      toolbar_field_border: "rgb(255, 0, 0)",
      toolbar_field_highlight: "rgb(255, 0, 0)",
      tab_loading: "rgb(255, 0, 0)"
    }
  },


};

// Time
var currentTheme = '';
async function setTheme(theme) {
  if (currentTheme === theme) {
    // No point in changing the theme if it has already been set.
    return;
  }
  currentTheme = theme;
  // Theme each window with the appropriate theme (morning/afternoon/night/dawn/private)
  browser.windows.getAll().then(wins => wins.forEach(themeWindow));
}

browser.windows.onCreated.addListener(themeWindow);

function themeWindow(window) {
  // Check if the window is in private browsing
  if (window.incognito) {
    browser.theme.update(window.id, themes[currentTheme]);
  } else {
    browser.theme.update(window.id, themes[currentTheme]);
  }
}

function checkTime() {
  let date = new Date();
  let hours = date.getHours();
  // zomg change
  if ((hours >= 6) && (hours <= 18)) {
    setTheme('Day');
  }
  else if ((hours >= 19) || (hours <= 5)) {
    setTheme('Night');
  }
}

// On start up, check the time to see what theme to show.
checkTime();

// Set up an alarm to check this regularly.
browser.alarms.onAlarm.addListener(checkTime);
browser.alarms.create('checkTime', { periodInMinutes: 5 })