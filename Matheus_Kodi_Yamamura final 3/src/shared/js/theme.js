const htmlElement = document.documentElement; 

const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    htmlElement.classList.add('dark-mode');
}

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');

    themeToggleBtn.addEventListener('click', () => {
    htmlElement.classList.toggle('dark-mode');
    if (htmlElement.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});
});
