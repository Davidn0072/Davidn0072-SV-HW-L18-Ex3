document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registerForm');
  const resultDiv = document.getElementById('result');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    fetch('/submit-register-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(response => response.json().then(data => {
      if (response.ok) {
        if (Array.isArray(data)) {
          resultDiv.innerHTML = data
            .map(entry => `${entry.firstName} ${entry.lastName} - ${entry.timestamp}`)
            .join('<br>');
        } else {
          resultDiv.textContent = data.message;
        }
      } else {
        resultDiv.textContent = 'Error: ' + (data.error);
      }
    }))
    .catch(err => {
      resultDiv.textContent = 'Error: ' + err.message;
    });

  }); // סגירה נכונה של submit listener
}); // סגירה נכונה של DOMContentLoaded
