"use strict";

const themes = {
  'Red': {
    images: {},
    properties: {},
    colors: {
      toolbar: 'rgb(20, 17, 26)',
      bookmark_text: 'rgb(251, 29, 78)',
      frame: 'rgb(0, 0, 0)',
      tab_background_text: 'rgb(251, 29, 78)',
      toolbar_field: 'rgb(20, 17, 26)',
      toolbar_field_text: 'rgb(251, 29, 78)',
      toolbar_field_border: 'rgb(251, 29, 78)',
      toolbar_field_border_focus: 'rgb(251, 29, 78)',      
      ntp_background: 'rgb(20, 17, 26)',
      ntp_background_text: 'rgb(0, 255, 65)',
      ntp_text: 'rgb(251, 29, 78)',
      tab_line: 'rgb(251, 29, 78)',
      popup: 'rgb(20, 17, 26)',
      popup_text: 'rgb(251, 29, 78)',
      tab_loading: 'rgb(251, 29, 78)'
    }
  },

  'Orange': {
    images: {},
    properties: {},
    colors: {
      toolbar: 'rgb(20, 17, 26)',
      frame: 'rgb(0, 0, 0)',
      tab_background_text: 'rgb(255, 138, 0)',
      ntp_background: 'rgb(20, 17, 26)',
      ntp_background_text: 'rgb(0, 255, 65)',
      popup: 'rgb(20, 17, 26)',
      toolbar_field_text: 'rgb(255, 138, 0)',
      toolbar_field_border: 'rgb(255, 138, 0)',
      toolbar_field_border_focus: 'rgb(255, 138, 0)',  
      ntp_text: 'rgb(255, 138, 0)',
      tab_line: 'rgb(255, 138, 0)',
      toolbar_field: 'rgb(20, 17, 26)',
      bookmark_text: 'rgb(255, 138, 0)',
      popup_text: 'rgb(255, 138, 0)',
      tab_loading: 'rgb(255, 138, 0)'
    }
  },

  'Yellow': {
    images: {},
    properties: {},
    colors: {
      toolbar: 'rgb(20, 17, 26)',
      frame: 'rgb(0, 0, 0)',
      tab_background_text: 'rgb(255, 221, 0)',
      ntp_background: 'rgb(20, 17, 26)',
      ntp_background_text: 'rgb(0, 255, 65)',
      popup: 'rgb(20, 17, 26)',
      toolbar_field_text: 'rgb(255, 221, 0)',
      toolbar_field_border: 'rgb(255, 221, 0)',
      toolbar_field_border_focus: 'rgb(255, 221, 0)',  
      ntp_text: 'rgb(255, 221, 0)',
      tab_line: 'rgb(255, 221, 0)',
      toolbar_field: 'rgb(20, 17, 26)',
      bookmark_text: 'rgb(255, 221, 0)',
      popup_text: 'rgb(255, 221, 0)',
      tab_loading: 'rgb(255, 221, 0)'
    }
  },

  'Green': {
    images: {},
    properties: {},
    colors: {
      toolbar: 'rgb(20, 17, 26)',
      frame: 'rgb(0, 0, 0)',
      tab_background_text: 'rgb(0, 255, 65)',
      ntp_background: 'rgb(20, 17, 26)',
      ntp_background_text: 'rgb(0, 255, 65)',
      popup: 'rgb(20, 17, 26)',
      toolbar_field_text: 'rgb(0, 255, 65)',
      toolbar_field_border: 'rgb(0, 255, 65)',
      toolbar_field_border_focus: 'rgb(0, 255, 65)',  
      ntp_text: 'rgb(0, 255, 65)',
      tab_line: 'rgb(0, 255, 65)',
      toolbar_field: 'rgb(20, 17, 26)',
      bookmark_text: 'rgb(0, 255, 65)',
      popup_text: 'rgb(0, 255, 65)',
      tab_loading: 'rgb(0, 255, 65)'
    }
  },

  'Blue': {
    images: {},
    properties: {},
    colors: {
      toolbar: 'rgb(20, 17, 26)',
      frame: 'rgb(0, 0, 0)',
      tab_background_text: 'rgb(0, 200, 215)',
      ntp_background: 'rgb(20, 17, 26)',
      ntp_background_text: 'rgb(0, 255, 65)',
      popup: 'rgb(20, 17, 26)',
      toolbar_field_text: 'rgb(0, 200, 215)',
      toolbar_field_border: 'rgb(0, 200, 215)',
      toolbar_field_border_focus: 'rgb(0, 200, 215)',  
      ntp_text: 'rgb(0, 200, 215)',
      tab_line: 'rgb(0, 200, 215)',
      toolbar_field: 'rgb(20, 17, 26)',
      bookmark_text: 'rgb(0, 200, 215)',
      popup_text: 'rgb(0, 200, 215)',
      tab_loading: 'rgb(0, 200, 215)'
    }
  },

  'Purple': {
    images: {},
    properties: {},
    colors: {
      toolbar: 'rgb(20, 17, 26)',
      frame: 'rgb(0, 0, 0)',
      tab_background_text: 'rgb(184, 51, 255)',
      ntp_background: 'rgb(20, 17, 26)',
      ntp_background_text: 'rgb(0, 255, 65)',
      popup: 'rgb(20, 17, 26)',
      toolbar_field_text: 'rgb(184, 51, 255)',
      toolbar_field_border: 'rgb(184, 51, 255)',
      toolbar_field_border_focus: 'rgb(184, 51, 255)',  
      ntp_text: 'rgb(184, 51, 255)',
      tab_line: 'rgb(184, 51, 255)',
      toolbar_field: 'rgb(20, 17, 26)',
      bookmark_text: 'rgb(184, 51, 255)',
      popup_text: 'rgb(184, 51, 255)',
      tab_loading: 'rgb(184, 51, 255)'
    }
  }
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
  // Will set the theme between 8am and 8pm.
  switch(hours) {
    case 0:
    case 12: 
          setTheme('Red');
          break;
    case 1: 
    case 13:
          setTheme('Orange');
          break;
    case 2: 
    case 14:
          setTheme('Yellow');
          break;
    case 3:
    case 15: 
          setTheme('Green');
          break;
    case 4: 
    case 16: 
          setTheme('Blue');
          break;
    case 5: 
    case 17: 
          setTheme('Purple');
          break;
    case 6: 
    case 18: 
          setTheme('Red');
          break;
    case 7:
    case 19: 
          setTheme('Orange');
          break;
    case 8: 
    case 20:
          setTheme('Yellow');
          break;
    case 9: 
    case 21:
          setTheme('Green');
          break;
    case 10: 
    case 22:
          setTheme('Blue');
          break;
    case 11: 
    case 23:
          setTheme('Purple');
          break;
    default:
          setTheme('Green');
  }

}

// On start up, check the time to see what theme to show.
checkTime();

// Set up an alarm to check this regularly.
browser.alarms.onAlarm.addListener(checkTime);
browser.alarms.create('checkTime', {periodInMinutes: 5});
