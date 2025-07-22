const input = document.getElementById('accessCode');
const error = document.getElementById('error');
const accessGrantedSound = document.getElementById('accessGranted');
const accessDeniedSound = document.getElementById('accessDenied');

// Настройки паролей
const REAL_CODE = "REDWOLF";       // настоящий
const FAKE_CODE = "BLUEFOX";       // ложный

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const value = input.value.trim().toUpperCase();
    input.value = '';

    if (value === REAL_CODE) {
      accessGrantedSound.play();
      error.textContent = '';
      document.body.style.transition = "opacity 1.5s";
      document.body.style.opacity = "0";
      setTimeout(() => window.location.href = "terminal.html", 1500);
    } else if (value === FAKE_CODE) {
      accessDeniedSound.play();
      error.textContent = '';
      document.body.style.transition = "opacity 1.5s";
      document.body.style.opacity = "0";
      setTimeout(() => window.location.href = "alt-terminal.html", 1500);
    } else {
      error.textContent = "ACCESS DENIED";
      accessDeniedSound.play();
    }
  }
});

