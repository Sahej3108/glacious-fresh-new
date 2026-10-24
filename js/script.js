/* ==========================================================================
   Glacious Fresh(TM) - Website Scripts
   By Gale Worldwide Movers Pvt. Ltd.

   - Single-page navigation (showPage)
   - Mobile menu
   - FAQ accordion
   - Copy-to-clipboard (UPI ID)
   - Quote request form -> Google Apps Script sheet
   - Callback bar close

   No inline `onclick` attributes are used in index.html. Interactive
   elements are wired up here through data attributes / ids:
     [data-goto="page"]   -> showPage(page)
     .faq-q               -> toggleFaq(button)
     [data-copy="text"]   -> copyText(text, button)
     #hamburger           -> toggleMenu()
     #submitQuoteBtn      -> submitQuote()
     #callbackClose       -> hides the sticky callback bar
   ========================================================================== */

const QUOTE_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbwSi5vlZhjepJdUlgy9X6PYenc8PuKNNgOWYFJYJ0Gw7DAy2pjErxOPjgYtzFtGVUtuHg/exec';

/* ---------- Mobile menu ---------- */
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

function closeMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
}

/* ---------- Page navigation ---------- */
function showPage(name) {
  document.querySelectorAll('.page').forEach(function (p) {
    p.classList.remove('active');
  });
  document.getElementById('page-' + name).classList.add('active');
  closeMenu();
  document.querySelectorAll('.nav-links a[data-page]').forEach(function (a) {
    a.classList.toggle('active', a.getAttribute('data-page') === name);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
  return false;
}

/* ---------- Shipment tracking (demo) ---------- */
function trackShipment() {
  var id = document.getElementById('trackInput').value.trim() || 'GF-2025-001234';
  document.getElementById('trackId').textContent = id;
  var result = document.getElementById('trackResult');
  result.classList.add('show');
  setTimeout(function () {
    document.getElementById('progressFill').style.width = '65%';
  }, 300);
  result.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ---------- Quote request form ---------- */
async function submitQuote() {
  const data = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    company: document.getElementById('company').value,
    phone: document.getElementById('phone').value,
    email: document.getElementById('email').value,
    serviceType: document.getElementById('serviceType').value,
    temperatureRange: document.getElementById('temperatureRange').value,
    cargoDetails: document.getElementById('cargoDetails').value
  };

  try {
    await fetch(QUOTE_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: JSON.stringify(data)
    });

    alert('Thank you! Your quote request has been submitted. We will contact you shortly.');
  } catch (error) {
    console.error(error);
    alert('Unable to submit form. Please try again.');
  }
}

/* ---------- Payment page: copy UPI ID ---------- */
function copyText(text, btn) {
  navigator.clipboard.writeText(text).then(function () {
    btn.textContent = 'Copied!';
    btn.style.color = 'var(--secondary-dark)';
    setTimeout(function () {
      btn.textContent = 'Copy';
      btn.style.color = '';
    }, 2000);
  });
}

/* ---------- FAQ accordion ---------- */
function toggleFaq(btn) {
  var item = btn.parentElement;
  item.classList.toggle('open');
  btn.querySelector('.faq-icon').textContent = item.classList.contains('open') ? 'x' : '+';
}

/* ---------- Event wiring ---------- */
document.addEventListener('click', function (e) {
  var target = e.target;
  if (!(target instanceof Element)) return;

  var nav = target.closest('[data-goto]');
  if (nav) {
    e.preventDefault();
    showPage(nav.getAttribute('data-goto'));
    return;
  }

  var faq = target.closest('.faq-q');
  if (faq) {
    toggleFaq(faq);
    return;
  }

  var copy = target.closest('[data-copy]');
  if (copy) {
    copyText(copy.getAttribute('data-copy'), copy);
    return;
  }

  if (target.closest('#hamburger')) {
    toggleMenu();
    return;
  }

  if (target.closest('#submitQuoteBtn')) {
    submitQuote();
    return;
  }

  if (target.closest('#callbackClose')) {
    document.getElementById('callbackBar').style.display = 'none';
  }
});

/* Expose for debugging / future use */
window.GF = { showPage: showPage, trackShipment: trackShipment, submitQuote: submitQuote };
