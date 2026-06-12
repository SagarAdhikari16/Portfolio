// Grab modal layout pointers from the DOM
const modalElement = document.getElementById('lightboxModal');
const modalImage = document.getElementById('modal-img');
const modalTitleText = document.getElementById('modal-title');

/**
 * Opens the high resolution asset modal.
 * @param {string} imageSrc - The file name inside the root folder
 * @param {string} certName - The header title string
 */
function viewCertificate(imageSrc, certName) {
    modalImage.src = imageSrc;
    modalTitleText.innerText = certName;
    modalElement.style.display = 'flex';
}

/**
 * Wipes out active images and hides layout display structure.
 */
function closeModal() {
    modalElement.style.display = 'none';
    modalImage.src = '';
}

// Security catch: close modal immediately if user clicks outside the inner display window box area
window.onclick = function(event) {
    if (event.target === modalElement) {
        closeModal();
    }
}