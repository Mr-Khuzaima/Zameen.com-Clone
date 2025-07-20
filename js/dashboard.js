document.addEventListener('DOMContentLoaded', function() {
  // ======================
  // Authentication System
  // ======================
  const auth = {
    check: function() {
      if (localStorage.getItem('isAuthenticated') !== 'true') {
        window.location.href = 'signin.html';
        return false;
      }
      return true;
    },
    
    setUser: function() {
      const userEmail = localStorage.getItem('userEmail');
      if (userEmail) {
        const usernameElement = document.querySelector('.user-name');
        if (usernameElement) {
          usernameElement.textContent = userEmail.split('@')[0] || 'User';
        }
      }
    },
    
    logout: function() {
      const logoutLink = document.querySelector('.logout-link');
      if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
          e.preventDefault();
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('userEmail');
          window.location.href = 'signin.html';
        });
      }
    }
  };

  if (!auth.check()) return;
  auth.setUser();
  auth.logout();

  // ======================
  // Sidebar System
  // ======================
  const sidebar = {
    init: function() {
      this.element = document.getElementById('profolio-sidebar');
      this.toggleBtn = document.getElementById('sidebarToggle');
      this.navLinks = document.querySelectorAll('.sidebar-menu .nav-link');
      
      this.setupEventListeners();
      this.setActiveLink();
      this.handleInitialState();
    },

    setupEventListeners: function() {
      // Toggle button click
      if (this.toggleBtn) {
        this.toggleBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.toggle();
        });
      }

      // Close when clicking outside on mobile
      document.addEventListener('click', (e) => {
        if (window.innerWidth < 992 && 
            !this.element.contains(e.target) && 
            e.target !== this.toggleBtn) {
          this.hide();
        }
      });

      // Handle window resize
      window.addEventListener('resize', () => this.handleResize());
    },

    toggle: function() {
      if (window.innerWidth >= 992) {
        // Desktop - toggle between expanded and collapsed
        this.element.classList.toggle('collapsed');
        this.updateToggleIcon();
      } else {
        // Mobile - toggle visibility
        this.element.classList.toggle('open');
        document.body.style.overflow = this.element.classList.contains('open') ? 'hidden' : '';
        this.updateToggleIcon();
      }
    },

    hide: function() {
      if (window.innerWidth < 992) {
        this.element.classList.remove('open');
        document.body.style.overflow = '';
      }
    },

    updateToggleIcon: function() {
      if (!this.toggleBtn) return;
      
      if (window.innerWidth >= 992) {
        // Desktop - show arrow or bars based on collapsed state
        this.toggleBtn.innerHTML = this.element.classList.contains('collapsed') 
          ? '<i class="fas fa-bars"></i>' 
          : '<i class="fas fa-arrow-left"></i>';
      } else {
        // Mobile - show arrow or bars based on open state
        this.toggleBtn.innerHTML = this.element.classList.contains('open') 
          ? '<i class="fas fa-arrow-left"></i>' 
          : '<i class="fas fa-bars"></i>';
      }
    },

    setActiveLink: function() {
      const currentPage = window.location.pathname.split('/').pop();
      
      this.navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
          link.classList.add('active');
        }
      });
    },

    handleResize: function() {
      if (window.innerWidth >= 992) {
        // Desktop - ensure sidebar is visible (either collapsed or expanded)
        this.element.classList.remove('open');
        document.body.style.overflow = '';
      } else {
        // Mobile - hide sidebar by default
        this.element.classList.remove('collapsed');
      }
      this.updateToggleIcon();
    },

    handleInitialState: function() {
      // Always start with sidebar hidden
      this.element.classList.remove('open');
      this.element.classList.add('collapsed');
      document.body.style.overflow = '';
      this.updateToggleIcon();
    }
  };

  // Initialize the sidebar when DOM is loaded
  sidebar.init();

  // ======================
  // Recent Listings System
  // ======================
  const recentListings = {
    init: function() {
      this.container = document.getElementById('recentListings');
      if (!this.container) return;
      
      this.loadListings();
    },
    
    loadListings: function() {
      const listings = JSON.parse(localStorage.getItem('propertyListings')) || [];
      const recent = listings.slice(0, 3); // Get 3 most recent
      
      if (recent.length === 0) {
        this.showEmptyState();
        return;
      }
      
      this.container.innerHTML = '';
      recent.forEach(listing => {
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-4';
        col.innerHTML = this.createListingHTML(listing);
        this.container.appendChild(col);
      });
    },
    
    createListingHTML: function(listing) {
      return `
        <div class="card recent-listing-card">
          ${listing.images && listing.images.length > 0 ? 
            `<img src="${listing.images[0]}" class="card-img-top" alt="Property Image">` : 
            '<div class="no-image-placeholder"><i class="fas fa-home"></i></div>'}
          <div class="card-body">
            <h6 class="card-title">${listing.title}</h6>
            <p class="card-text text-muted small">
              <i class="fas fa-map-marker-alt"></i> ${listing.location}, ${this.capitalizeFirstLetter(listing.city)}
            </p>
            <div class="d-flex justify-content-between align-items-center">
              <span class="text-primary">PKR ${this.formatPrice(listing.price)}</span>
              <a href="myListings.html" class="btn btn-sm btn-outline-primary">View</a>
            </div>
          </div>
        </div>
      `;
    },
    
    showEmptyState: function() {
      this.container.innerHTML = `
        <div class="col-12 text-center py-5 empty-listings">
          <i class="fas fa-home fa-3x text-muted mb-3"></i>
          <h5 class="mb-3">You don't have any listings yet</h5>
          <p class="text-muted mb-4">Start by posting your first property listing</p>
          <a href="post-listing.html" class="btn btn-primary">
            <i class="fas fa-plus"></i> Post New Listing
          </a>
        </div>
      `;
    },
    
    capitalizeFirstLetter: function(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    
    formatPrice: function(price) {
      const numPrice = Number(price);
      if (numPrice >= 10000000) {
        return (numPrice / 10000000).toFixed(1) + ' Crore';
      } else if (numPrice >= 100000) {
        return (numPrice / 100000).toFixed(1) + ' Lakh';
      }
      return numPrice.toLocaleString();
    }
  };
  recentListings.init();

  // ======================
  // Analytics System
  // ======================
  const analytics = {
    init: function() {
      this.buttons = document.querySelectorAll('.analytics-filters .btn');
      this.setupEventListeners();
    },
    
    setupEventListeners: function() {
      this.buttons.forEach(button => {
        button.addEventListener('click', (e) => this.handleButtonClick(e.target));
      });
    },
    
    handleButtonClick: function(button) {
      this.buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      this.updateDisplay(button.textContent.trim());
    },
    
    updateDisplay: function(filter) {
      // In a real app, this would update charts/data based on the filter
      console.log('Updating analytics with filter:', filter);
    }
  };
  analytics.init();
});