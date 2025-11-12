/* This file contains the interactive logic for the website.
  It runs after the HTML document is loaded because of the 'defer' attribute in the script tag.
*/

// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

    // --- Set Current Year ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Dark Mode Logic ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

    if (themeToggleBtn && themeToggleDarkIcon && themeToggleLightIcon) {
        // Function to set the theme state
        const setTheme = (isDark) => {
            if (isDark) {
                document.documentElement.classList.add('dark');
                themeToggleLightIcon.classList.remove('hidden');
                themeToggleDarkIcon.classList.add('hidden');
                localStorage.setItem('color-theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                themeToggleLightIcon.classList.add('hidden');
                themeToggleDarkIcon.classList.remove('hidden');
                localStorage.setItem('color-theme', 'light');
            }
        };

        // Check for saved theme in localStorage or system preference
        const prefersDark = localStorage.getItem('color-theme') === 'dark' ||
            (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        
        setTheme(prefersDark);

        // Add click listener to the toggle button
        themeToggleBtn.addEventListener('click', () => {
            const isCurrentlyDark = document.documentElement.classList.contains('dark');
            setTheme(!isCurrentlyDark);
        });
    }

    // --- Language Toggle Logic ---
    const langToggleBtn = document.getElementById('lang-toggle');

    if (langToggleBtn) {
        // Function to set the language state
        const setLanguage = (lang) => {
            if (lang === 'sw') {
                document.documentElement.classList.add('show-sw');
                document.documentElement.lang = 'sw';
                localStorage.setItem('language', 'sw');
            } else {
                document.documentElement.classList.remove('show-sw');
                document.documentElement.lang = 'en';
                localStorage.setItem('language', 'en');
            }
        };

        // Check for saved language in localStorage
        const savedLang = localStorage.getItem('language');
        if (savedLang === 'sw') {
            setLanguage('sw');
        } else {
            setLanguage('en'); // Default to English
        }

        // Add click listener to the language toggle button
        langToggleBtn.addEventListener('click', () => {
            const isSwahili = document.documentElement.classList.contains('show-sw');
            if (isSwahili) {
                setLanguage('en');
            } else {
                setLanguage('sw');
            }
        });
    }

});