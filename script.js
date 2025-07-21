const form = document.getElementById('registrationForm');
const shareBtn = document.getElementById('shareBtn');
const shareCount = document.getElementById('shareCount');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');

let count = parseInt(localStorage.getItem('shareCount')) || 0;
let submitted = localStorage.getItem('submitted') === 'true';

// Update share counter
updateShareCount();
if (submitted) disableForm();

// WhatsApp sharing logic
shareBtn.addEventListener('click', () => {
  if (count < 5) {
    const message = encodeURIComponent("Hey Buddy, Join Tech For Girls Community!\n\n" + 
                     "Register here: [YOUR_WEBSITE_URL]");
    const whatsappUrl = `https://api.whatsapp.com/send?text=${message}`;
    window.open(whatsappUrl, '_blank');
    count++;
    localStorage.setItem('shareCount', count);
    updateShareCount();
  }
});

// 🆕 Form submission logic
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (count < 5) {
    alert("Please share on WhatsApp 5 times before submitting.");
    return;
  }

  const formData = new FormData(form);

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbxVm6EqeVlHdo_7lloE524hpgSujUVfMEsDkxYHsOo61U3gfygzWL5cE5r1MvzGhrz_/exec", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      localStorage.setItem('submitted', 'true');
      disableForm();
      successMessage.classList.remove('hidden');
    } else {
      alert("Submission failed. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong!");
  }
});

// Helper functions
function updateShareCount() {
  shareCount.textContent = `Click count: ${count}/5`;
  if (count >= 5) {
    shareBtn.disabled = true;
    shareCount.textContent = "Sharing complete. Please continue.";
  }
}

function disableForm() {
  form.querySelectorAll("input, button").forEach(el => el.disabled = true);
}
