document.querySelectorAll(".menu a").forEach((link) => {
  link.addEventListener("click", function (e) {
    if (this.hash !== "") {
      e.preventDefault();
      const target = document.querySelector(this.hash);
      target?.scrollIntoView({ behavior: "smooth" });
    }
  });
});

const counters = document.querySelectorAll(".card h2");
const speed = 200; // lower is faster

counters.forEach((counter) => {
  const updateCount = () => {
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText;

    const inc = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + inc);
      setTimeout(updateCount, 20);
    } else {
      counter.innerText = target;
    }
  };

  if (counter.hasAttribute("data-target")) {
    updateCount();
  }
});

// Form Validation
const scriptURL =
  "https://script.google.com/macros/s/AKfycbwUH9UB060iYN3dGpUNDfZOLcLxC5conzyNTDYWLvfuZff01pmvQcRNiZghivImh0zgaA/exec";

const form = document.querySelector("form");

form?.addEventListener("submit", function (e) {
  e.preventDefault();

  const fname = document.getElementById("fname").value.trim();
  const lname = document.getElementById("lname").value.trim();
  const email = document.getElementById("Emailadd").value.trim();
  const phone = document.getElementById("pnumber").value.trim();
  const service = document.getElementById("service").value;
  const message = document.getElementById("message").value.trim();

  if (!fname || !email || !message) {
    alert("❌ Please fill out all required fields!");
    return;
  }

  const formData = {
    firstName: fname,
    lastName: lname,
    email: email,
    phone: phone,
    service: service,
    message: message,
  };

  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.result === "success") {
        alert("✅ Your message has been saved to Google Sheets!");
        form.reset();
      } else {
        alert("⚠️ Error saving data: " + JSON.stringify(data.error));
      }
    })
    .catch((err) => {
      console.error("Error!", err.message);
      alert("⚠️ Network error: " + err.message);
    });
});

const email = "mohsiraj@gmail.com";
const subject = "Project Inquiry";
const body =
  "Hi Siraj,\n\nI found your portfolio and would like to discuss a project.\n\nThanks,\n";

document.getElementById("hireBtn")?.addEventListener("click", () => {
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    email
  )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  // Try Gmail in a new tab
  const win = window.open(gmailUrl, "_blank");

  // Fallback to mailto if the new tab didn't open (popup blocked/no Gmail)
  setTimeout(() => {
    try {
      if (!win || win.closed || typeof win.closed === "undefined") {
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(body)}`;
      }
    } catch {
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
    }
  }, 300);
});
