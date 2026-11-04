document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menuButton');
    const navLinks = document.getElementById('navLinks');
    const navItems = navLinks ? navLinks.querySelectorAll('a') : [];
    const menuIcon = menuButton ? menuButton.querySelector('i') : null;

    if (!menuButton || !navLinks) {
        return;
    }

    // Set initial ARIA state for accessibility
    menuButton.setAttribute('aria-expanded', 'false');

    // Helper function to close navigation menu
    function closeMenu() {
        if (navLinks.classList.contains('show')) {
            navLinks.classList.remove('show');
            menuButton.setAttribute('aria-expanded', 'false');
            if (menuIcon) {
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            }
        }
    }

    // Helper function to toggle navigation menu
    function toggleMenu() {
        const isOpen = navLinks.classList.toggle('show');
        menuButton.setAttribute('aria-expanded', String(isOpen));

        if (menuIcon) {
            if (isOpen) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-xmark');
            } else {
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            }
        }
    }

    // Toggle menu on hamburger button click
    menuButton.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleMenu();
    });

    // Close menu when any navigation link is clicked
    navItems.forEach((link) => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Close menu when clicking outside of the navbar on mobile
    document.addEventListener('click', (event) => {
        if (!navLinks.contains(event.target) && !menuButton.contains(event.target)) {
            closeMenu();
        }
    });

    // Close menu if window is resized above mobile breakpoint (768px)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
});

