// Navigation JS for Landing, Auth, and Explore Pages

// Define page order for swiping
const pages = ['/', '/auth', '/explore'];
const currentPage = window.location.pathname;
const currentIndex = pages.indexOf(currentPage);

// Swipe variables
let startX, startY, endX, endY;
const threshold = 100; // Minimum swipe distance in pixels

// Handle touch start
function handleTouchStart(event) {
  startX = event.touches[0].clientX;
  startY = event.touches[0].clientY;
}

// Handle touch move (prevent scrolling on horizontal swipe)
function handleTouchMove(event) {
  endX = event.touches[0].clientX;
  endY = event.touches[0].clientY;
  if (Math.abs(endX - startX) > Math.abs(endY - startY)) {
    event.preventDefault(); // Prevent vertical scroll
  }
}

// Handle touch end (detect swipe direction)
function handleTouchEnd(event) {
  if (!startX || !startY) return;

  const deltaX = endX - startX;
  const deltaY = endY - startY;

  // Check for horizontal swipe
  if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
    if (deltaX > 0) {
      // Swipe right: Go to previous page
      const prevIndex = currentIndex - 1;
      if (prevIndex >= 0) {
        window.location.href = pages[prevIndex];
      }
    } else {
      // Swipe left: Go to next page
      const nextIndex = currentIndex + 1;
      if (nextIndex < pages.length) {
        window.location.href = pages[nextIndex];
      }
    }
  }

  // Reset
  startX = startY = endX = endY = null;
}

// Add touch event listeners
document.addEventListener('touchstart', handleTouchStart, { passive: false });
document.addEventListener('touchmove', handleTouchMove, { passive: false });
document.addEventListener('touchend', handleTouchEnd, { passive: false });

// Button navigation (for landing page buttons)
document.addEventListener('DOMContentLoaded', () => {
  // Landing page buttons
  const exploreBtn = document.getElementById('explore-btn');
  const loginBtn = document.getElementById('login-btn');
  const postBtn = document.getElementById('post-btn');

  if (exploreBtn) {
    exploreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = '/explore';
    });
  }

  if (loginBtn) {
    loginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = '/auth';
    });
  }

  if (postBtn) {
    postBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = '/auth'; // Redirect to auth for posting (orgs only)
    });
  }

  // Auth page form toggles (if on auth page)
  const loginTab = document.querySelector('button[onclick*="login"]');
  const registerTab = document.querySelector('button[onclick*="register"]');

  if (loginTab) {
    loginTab.addEventListener('click', () => showForm('login'));
  }

  if (registerTab) {
    registerTab.addEventListener('click', () => showForm('register'));
  }

  // Explore page back/logout (if on explore page)
  const backIcon = document.querySelector('.back-icon');
  const logoutIcon = document.querySelector('.logout-icon');

  if (backIcon) {
    backIcon.addEventListener('click', () => window.history.back());
  }

  if (logoutIcon) {
    logoutIcon.addEventListener('click', () => {
      localStorage.removeItem('token');
      window.location.href = '/auth';
    });
  }
});

// Form toggle function (for auth page)
function showForm(type) {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  if (loginForm) loginForm.style.display = type === 'login' ? 'block' : 'none';
  if (registerForm) registerForm.style.display = type === 'register' ? 'block' : 'none';
}

// Password toggle (for auth page)
function togglePassword(id) {
  const input = document.getElementById(id);
  if (input) input.type = input.type === 'password' ? 'text' : 'password';
}