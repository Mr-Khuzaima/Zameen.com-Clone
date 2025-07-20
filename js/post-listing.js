document.addEventListener('DOMContentLoaded', function() {
  // Initialize form pages
  const formPages = document.querySelectorAll('.form-page');
  const progressBar = document.querySelector('.progress-bar');
  const progressText = document.querySelector('.progress-text');
  let currentPage = 1;
  let uploadedImages = [];
  
  // Show first page by default
  showPage(currentPage);
  
  // Next page button functionality
  window.nextPage = function(pageNum) {
    if (validatePage(pageNum)) {
      currentPage = pageNum + 1;
      showPage(currentPage);
      updateProgress();
    }
  };
  
  // Previous page button functionality
  window.prevPage = function(pageNum) {
    currentPage = pageNum - 1;
    showPage(currentPage);
    updateProgress();
  };
  
  // Show specific page
  function showPage(pageNum) {
    formPages.forEach(page => {
      page.classList.remove('active');
      if (parseInt(page.id.replace('page', '')) === pageNum) {
        page.classList.add('active');
      }
    });
  }
  
  // Update progress bar
  function updateProgress() {
    const progress = (currentPage / formPages.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressBar.setAttribute('aria-valuenow', progress);
    progressText.textContent = `${Math.round(progress)}%`;
  }
  
  // Validate form inputs before proceeding
  function validatePage(pageNum) {
    const currentPageEl = document.getElementById(`page${pageNum}`);
    const requiredInputs = currentPageEl.querySelectorAll('[required]');
    let isValid = true;
    
    requiredInputs.forEach(input => {
      if (!input.value) {
        input.classList.add('is-invalid');
        isValid = false;
      } else {
        input.classList.remove('is-invalid');
      }
    });
    
    if (!isValid) {
      const firstInvalid = currentPageEl.querySelector('.is-invalid');
      firstInvalid.focus();
      alert('Please fill in all required fields before proceeding.');
    }
    
    return isValid;
  }
  
  // Location search functionality
  const citySelect = document.getElementById('citySelect');
  const locationInput = document.getElementById('locationInput');
  const locationSuggestions = document.querySelector('.location-suggestions');
  const allSuggestions = document.querySelectorAll('.suggestion-item');

  // Show suggestions based on selected city
  citySelect.addEventListener('change', function() {
    const selectedCity = this.value;
    
    // Hide all suggestions first
    allSuggestions.forEach(item => {
      item.style.display = 'none';
    });
    
    // Show suggestions for selected city
    if (selectedCity) {
      const citySuggestions = document.querySelectorAll(`.suggestion-item[data-city="${selectedCity}"]`);
      citySuggestions.forEach(item => {
        item.style.display = 'block';
      });
    }
    
    // Clear input when city changes
    locationInput.value = '';
  });

  locationInput.addEventListener('focus', function() {
    const selectedCity = citySelect.value;
    if (!selectedCity) {
      alert('Please select a city first');
      citySelect.focus();
      return;
    }
    locationSuggestions.style.display = 'block';
  });

  locationInput.addEventListener('blur', function() {
    setTimeout(() => {
      locationSuggestions.style.display = 'none';
    }, 200);
  });

  // Select location suggestion
  document.querySelectorAll('.suggestion-item').forEach(item => {
    item.addEventListener('click', function() {
      locationInput.value = this.textContent;
      locationSuggestions.style.display = 'none';
    });
  });
  
  // Image upload functionality with null checks
  const dropzone = document.querySelector('.dropzone');
  const fileInput = document.getElementById('propertyImages');
  const imagePreview = document.querySelector('.image-preview');
  const addMoreBtn = document.querySelector('.add-more');

  // Only initialize if elements exist
  if (dropzone && fileInput) {
    dropzone.addEventListener('click', function() {
      fileInput.click();
    });

    fileInput.addEventListener('change', function() {
      if (this.files && this.files.length) {
        handleFiles(this.files);
      }
    });

    // Drag and drop events
    dropzone.addEventListener('dragover', function(e) {
      e.preventDefault();
      this.classList.add('dragover');
    });
    
    dropzone.addEventListener('dragleave', function() {
      this.classList.remove('dragover');
    });
    
    dropzone.addEventListener('drop', function(e) {
      e.preventDefault();
      this.classList.remove('dragover');
      if (e.dataTransfer.files.length) {
        handleFiles(e.dataTransfer.files);
      }
    });
  }

  if (addMoreBtn && fileInput) {
    addMoreBtn.addEventListener('click', function() {
      fileInput.click();
    });
  }
  
  // Handle uploaded files
  function handleFiles(files) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.match('image.*')) {
        const reader = new FileReader();
        reader.onload = function(e) {
          uploadedImages.push(e.target.result);
          addImagePreview(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }
  
  // Add image preview
  function addImagePreview(src) {
    const previewItem = document.createElement('div');
    previewItem.className = 'preview-item';
    previewItem.innerHTML = `
      <img src="${src}" alt="Preview">
      <button class="btn-remove"><i class="fas fa-times"></i></button>
    `;
    
    // Insert before the "Add More" button
    imagePreview.insertBefore(previewItem, addMoreBtn);
    
    // Set first image as cover by default
    if (imagePreview.querySelectorAll('.preview-item').length === 1) {
      setCoverImage(previewItem);
    }
    
    // Add remove functionality
    previewItem.querySelector('.btn-remove').addEventListener('click', function() {
      const index = Array.from(imagePreview.children).indexOf(previewItem) - 1; // -1 for addMoreBtn
      uploadedImages.splice(index, 1);
      previewItem.remove();
    });
    
    // Add double click to set as cover
    previewItem.addEventListener('dblclick', function() {
      setCoverImage(this);
    });
  }
  
  // Set cover image
  function setCoverImage(item) {
    // Remove cover badge from all images
    document.querySelectorAll('.cover-badge').forEach(badge => {
      badge.remove();
    });
    
    // Add cover badge to selected image
    const coverBadge = document.createElement('div');
    coverBadge.className = 'cover-badge';
    coverBadge.textContent = 'Cover';
    item.appendChild(coverBadge);
  }
  
  // if (addMoreBtn && fileInput) {
  //   addMoreBtn.addEventListener('click', function() {
  //     fileInput.click();
  //   });
  // } else {
  //   console.warn('Add more button or file input not found');
  // }
  
  // Form submission
  document.getElementById('propertyForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Collect form data with enhanced validation
    const formData = {
      id: Date.now().toString(),
      title: document.querySelector('#page3 input[type="text"]').value.trim(),
      city: document.getElementById('citySelect').value,
      location: document.getElementById('locationInput').value.trim(),
      purpose: document.querySelector('input[name="purpose"]:checked')?.value || 'sell',
      propertyType: document.querySelector('input[name="propertyType"]:checked')?.value || 'home',
      area: document.querySelector('#page2 input[placeholder="Enter Area"]').value,
      areaUnit: document.querySelector('#page2 select[name="areaUnit"]').value,
      price: document.querySelector('#page2 input[placeholder="Enter Price"]').value,
      bedrooms: document.querySelector('.amenity-options .btn-amenity.active')?.textContent.trim() || 'Not specified',
      bathrooms: document.querySelectorAll('.amenity-options .btn-amenity.active')[1]?.textContent.trim() || 'Not specified',
      description: document.querySelector('#page3 textarea').value.trim(),
      mobile: document.querySelector('#page4 input[type="tel"]').value.trim(),
      images: uploadedImages,
      status: 'active',
      date: new Date().toISOString()
    };

    // Enhanced save functionality with debugging
    try {
      saveListing(formData);
      console.log('Listing saved:', formData); // Debug log
      alert('Listing submitted successfully!');
      window.location.href = 'myListings.html';
    } catch (error) {
      console.error('Error saving listing:', error);
      alert('Error saving listing. Please check console for details.');
    }
  });
  
  // Enhanced saveListing function with debugging
  function saveListing(listing) {
    try {
      // Get existing listings or initialize empty array
      let listings = JSON.parse(localStorage.getItem('propertyListings')) || [];
      
      // Add new listing at beginning
      listings.unshift(listing);
      
      // Save back to localStorage
      localStorage.setItem('propertyListings', JSON.stringify(listings));
      
      // Debug output
      console.log('Current listings in localStorage:', listings);
      console.log('Data stored under key: propertyListings');
    } catch (error) {
      console.error('Error in saveListing:', error);
      throw error; // Re-throw for handling in calling function
    }
  }
  
  // Initialize all tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Debug helper to view stored data
  window.debugShowListings = function() {
    console.log('Current listings:', JSON.parse(localStorage.getItem('propertyListings')));
  };
});