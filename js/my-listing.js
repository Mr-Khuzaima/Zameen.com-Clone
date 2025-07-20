document.addEventListener('DOMContentLoaded', function() {
  // Load listings from localStorage
  const listings = loadListings();
  
  // Display listings
  displayListings(listings);
  
  // Initialize search functionality
  //initSearch(); ---- Hide this line because There is no serach button in the Mylistings Menu so That's why This line is commented and also the function calling is hidden.
  
  // For debugging - show stored data
  console.log('Loaded listings from localStorage:', listings);
});

function loadListings() {
  const listings = JSON.parse(localStorage.getItem('propertyListings')) || [];
  console.log('Listings loaded from localStorage:', listings);
  return listings;
}

function displayListings(listings) {
  const container = document.querySelector('.row');
  container.innerHTML = ''; // Clear existing content
  
  if (listings.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <i class="fas fa-home fa-3x mb-3"></i>
        <h3>No listings found</h3>
        <p>You haven't created any listings yet.</p>
        <a href="post-listing.html" class="btn btn-primary">
          <i class="fas fa-plus"></i> Create Your First Listing
        </a>
      </div>
    `;
    return;
  }
  
  listings.forEach((listing, index) => {
    const card = createListingCard(listing, index);
    container.appendChild(card);
  });
  
  // Initialize card interactions
  initCardInteractions();
}

function createListingCard(listing, index) {
  const col = document.createElement('div');
  col.className = 'col-md-6 col-lg-4 mb-4';
  
  col.innerHTML = `
    <div class="card listing-card" 
         data-id="${listing.id}"
         data-type="${listing.propertyType}" 
         data-purpose="${listing.purpose}" 
         data-city="${listing.city}">
      <div class="listing-badge ${listing.status === 'active' ? '' : 'inactive'}">
        ${capitalizeFirstLetter(listing.status)}
      </div>
      ${index < 2 ? '<div class="listing-hot-badge">HOT</div>' : ''}
      ${listing.images && listing.images.length > 0 ? 
        `<img src="${listing.images[0]}" class="card-img-top" alt="Property Image">` : 
        '<div class="no-image-placeholder"><i class="fas fa-home"></i></div>'}
      <div class="card-body">
        <h5 class="card-title">${listing.title}</h5>
        <p class="card-text text-muted">
          <i class="fas fa-map-marker-alt"></i> ${listing.location}, ${capitalizeFirstLetter(listing.city)}
        </p>
        <div class="listing-details">
          ${listing.bedrooms !== 'Not specified' ? `
          <div class="detail-item">
            <i class="fas fa-bed"></i>
            <span>${listing.bedrooms}</span>
          </div>` : ''}
          ${listing.bathrooms !== 'Not specified' ? `
          <div class="detail-item">
            <i class="fas fa-bath"></i>
            <span>${listing.bathrooms}</span>
          </div>` : ''}
          <div class="detail-item">
            <i class="fas fa-vector-square"></i>
            <span>${listing.area} ${listing.areaUnit}</span>
          </div>
        </div>
        <div class="listing-price">
          <strong>PKR ${formatPrice(listing.price)}</strong>
        </div>
        <div class="listing-actions mt-3">
          <button class="btn btn-sm btn-outline-primary btn-view">
            <i class="fas fa-eye"></i> View
          </button>
          <button class="btn btn-sm btn-outline-secondary btn-edit">
            <i class="fas fa-edit"></i> Edit
          </button>
          <button class="btn btn-sm btn-outline-danger btn-delete" data-id="${listing.id}">
            <i class="fas fa-trash"></i> Delete
          </button>
          ${listing.status !== 'active' ? `
          <button class="btn btn-sm btn-success btn-activate mt-2 w-100">
            <i class="fas fa-power-off"></i> Activate
          </button>` : ''}
        </div>
        ${listing.status === 'active' ? `
        <div class="listing-stats mt-3">
          <div class="stat-item">
            <i class="fas fa-eye"></i> ${Math.floor(Math.random() * 1000)} Views
          </div>
          <div class="stat-item">
            <i class="fas fa-phone"></i> ${Math.floor(Math.random() * 100)} Calls
          </div>
        </div>` : ''}
      </div>
    </div>
  `;
  
  return col;
}

function initCardInteractions() {
  // Delete button
  document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', function() {
      const id = this.dataset.id;
      if (confirm('Are you sure you want to delete this listing?')) {
        deleteListing(id);
        this.closest('.col-md-6').remove();
      }
    });
  });
  
  // Activate/Deactivate button
  document.querySelectorAll('.btn-activate').forEach(btn => {
    btn.addEventListener('click', function() {
      const card = this.closest('.listing-card');
      const id = card.dataset.id;
      const badge = card.querySelector('.listing-badge');
      
      if (badge.classList.contains('inactive')) {
        // Activate
        updateListingStatus(id, 'active');
        badge.classList.remove('inactive');
        badge.textContent = 'Active';
        this.remove();
        // Add stats section
        card.querySelector('.card-body').insertAdjacentHTML('beforeend', `
          <div class="listing-stats mt-3">
            <div class="stat-item">
              <i class="fas fa-eye"></i> ${Math.floor(Math.random() * 1000)} Views
            </div>
            <div class="stat-item">
              <i class="fas fa-phone"></i> ${Math.floor(Math.random() * 100)} Calls
            </div>
          </div>
        `);
      }
    });
  });
}

function deleteListing(id) {
  let listings = JSON.parse(localStorage.getItem('propertyListings')) || [];
  listings = listings.filter(listing => listing.id !== id);
  localStorage.setItem('propertyListings', JSON.stringify(listings));
}

function updateListingStatus(id, status) {
  let listings = JSON.parse(localStorage.getItem('propertyListings')) || [];
  listings = listings.map(listing => {
    if (listing.id === id) {
      return {...listing, status};
    }
    return listing;
  });
  localStorage.setItem('propertyListings', JSON.stringify(listings));
}

// Helper functions
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatPrice(price) {
  const num = Number(price);
  if (num >= 10000000) return (num / 10000000).toFixed(1) + ' Crore';
  if (num >= 100000) return (num / 100000).toFixed(1) + ' Lakh';
  return num.toLocaleString();
}

// function initSearch() {
//   document.getElementById('searchButton').addEventListener('click', function() {
//     const searchTerm = document.getElementById('searchTitle').value.toLowerCase();
//     const propertyType = document.getElementById('propertyType').value;
//     const purpose = document.getElementById('purpose').value;
//     const city = document.getElementById('city').value;
//     const status = document.getElementById('status').value;
    
//     const listings = JSON.parse(localStorage.getItem('propertyListings')) || [];
//     const filtered = listings.filter(listing => {
//       const titleMatch = listing.title.toLowerCase().includes(searchTerm);
//       const typeMatch = !propertyType || listing.propertyType === propertyType;
//       const purposeMatch = !purpose || listing.purpose === purpose;
//       const cityMatch = !city || listing.city === city;
//       const statusMatch = !status || listing.status === status;
      
//       return titleMatch && typeMatch && purposeMatch && cityMatch && statusMatch;
//     });
    
//     displayListings(filtered);
//   });
// }