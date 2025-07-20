function scrollProjects(direction) {
      const container = document.querySelector('.project-scroll-container');
      const scrollAmount = 300; // Adjust scroll amount as needed
      container.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}
function showLoginl() {
    document.querySelector('.login-containerl').style.display = 'block';
    document.querySelector('.overlayl').style.display = 'block';
}
function hideLoginl() {
    document.querySelector('.login-containerl').style.display = 'none';
    document.querySelector('.overlayl').style.display = 'none';
}
document.addEventListener('DOMContentLoaded', () => {
    // Toggle button for advanced options   
    const toggleButton = document.querySelector('.toggle-button');
    const advancedOptions = document.querySelector('.advanced-options');

    toggleButton.addEventListener('click', () => {
        if (advancedOptions.classList.contains('hidden')) {
            advancedOptions.classList.remove('hidden');
            toggleButton.textContent = '^ Less Options';
        } else {
            advancedOptions.classList.add('hidden');
            toggleButton.textContent = 'More Options';
        }
    });

    // Filter price dropdown functionality
    const filterPrice = document.querySelector('.filter-price');
    const dropdown = document.querySelector('.filter-droptown');
    const minDropdown = document.querySelector('.filter-droptown1-min-down');
    const maxDropdown = document.querySelector('.filter-droptown1-max-down');
    const minInput = document.querySelector('.filter-droptown1-min-select');
    const maxSelect = document.querySelector('.filter-droptown1-max-select');
    const minInputt_val = document.querySelector('.fileter-input-min-value');
    const maxInputt_val = document.querySelector('.fileter-input-max-value');
    const closeBtn = document.querySelector('.close-btn');


    // Function to toggle dropdown visibility
    const toggleDropdown = () => {
        const isVisible = dropdown.style.display === 'block';
        dropdown.style.display = isVisible ? 'none' : 'block';
    };

    // Open/close dropdown when clicking on .filter-price
    filterPrice.addEventListener('click', (event) => {
        toggleDropdown();  // Toggle dropdown visibility
        event.stopPropagation(); // Prevent event from propagating to the window
    });

    // Populate min dropdown with values
    const minValues = [0, 500000, 1000000, 2000000, 3500000, 5000000];
    minValues.forEach(value => {
        const div = document.createElement('div');
        div.textContent = value.toLocaleString();
        div.dataset.value = value;
        div.addEventListener('click', () => {
            minInput.value = div.textContent;  // Set value in input
            minInputt_val.textContent = div.textContent;
            dropdown.style.display = 'none';  // Close dropdown after selection
        });
        minDropdown.appendChild(div);
    });

    // Populate max dropdown with values
    const maxValues = [500000, 1000000, 2000000, 3500000, 5000000, 10000000];
    maxValues.forEach(value => {
        const div = document.createElement('div');
        div.textContent = value.toLocaleString();
        div.dataset.value = value;
        div.addEventListener('click', () => {
            maxSelect.value = div.textContent;  // Set value in input
            maxInputt_val.textContent = div.textContent;
            dropdown.style.display = 'none';  // Close dropdown after selection
        });
        maxDropdown.appendChild(div);
    });


    const areafilterPrice = document.querySelector('.filter-area');
    const areadropdown = document.querySelector('.filter-droptown-area');
    const areaminDropdown = document.querySelector('.filter-droptown1-min-down-area');
    const areamaxDropdown = document.querySelector('.filter-droptown1-max-down-area');
    const areaminInput = document.querySelector('.filter-droptown1-min-select-area');
    const areamaxSelect = document.querySelector('.filter-droptown1-max-select-area');
    const areaminInputt_val = document.querySelector('.fileter-areainput-min-value');
    const areamaxInputt_val = document.querySelector('.fileter-areainput-max-value');

    const areatoggleDropdown = () => {
        const isVisible = areadropdown.style.display === 'block';
        areadropdown.style.display = isVisible ? 'none' : 'block';
    };

    // Open/close dropdown when clicking on .filter-price
    areafilterPrice.addEventListener('click', (event) => {
        areatoggleDropdown();  // Toggle dropdown visibility
        event.stopPropagation(); // Prevent event from propagating to the window
    });

    // Populate min dropdown with values
    const areaminValues = [2, 3, 7, , 10, "1kanal"];
    areaminValues.forEach(value => {
        const div = document.createElement('div');
        div.textContent = value.toLocaleString();
        div.dataset.value = value;
        div.addEventListener('click', () => {
            areaminInput.value = div.textContent;  // Set value in input
            areaminInputt_val.textContent = div.textContent;
            areadropdown.style.display = 'none';  // Close dropdown after selection
        });
        areaminDropdown.appendChild(div);
    });

    // Populate max dropdown with values
    const areamaxValues = [2, 3, 7, , 10, "1kanal"];
    areamaxValues.forEach(value => {
        const div = document.createElement('div');
        div.textContent = value.toLocaleString();
        div.dataset.value = value;
        div.addEventListener('click', () => {
            areamaxSelect.value = div.textContent;  // Set value in input
            areamaxInputt_val.textContent = div.textContent;
            areadropdown.style.display = 'none';  // Close dropdown after selection
        });
        areamaxDropdown.appendChild(div);
    });

    // Close dropdown on clicking the close button
    closeBtn.addEventListener('click', () => {
        dropdown.style.display = 'none';
    });

    // Prevent closing the dropdown when clicking inside the filter inputs
    minInput.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent dropdown from closing when clicking inside the input
    });

    // Close dropdown when clicking outside the .filter-price container
    window.addEventListener('click', (event) => {
        if (!filterPrice.contains(event.target)) {
            dropdown.style.display = 'none';  // Close the dropdown if clicked outside
        }
    });
});
function showCurrencyDialog() {
    // Show the dialog and overlay
    document.getElementById('currencyDialog').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function closeCurrencyDialog() {
    // Hide the dialog and overlay
    document.getElementById('currencyDialog').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

// Toggle dropdown visibility when clicked
document.querySelector('.dropdown-trigger').addEventListener('click', function () {
    this.classList.toggle('active');
});

const currencyOptions = document.querySelectorAll('.currency-option');
currencyOptions.forEach(option => {
    option.addEventListener('click', function () {
        // Change the text of the selected currency div
        document.querySelector('.selected-currency').textContent = this.textContent;
        // Close the dropdown after selection
        document.querySelector('.dropdown-trigger').classList.remove('active');
    });
});

// Save the selected currency (for demonstration)
function saveCurrency() {
    const selectedCurrency = document.querySelector('.selected-currency').textContent;

    // Update the label text with the selected currency
    const priceLabel = document.querySelector('.filter-price-label');
    if (priceLabel) {
        priceLabel.textContent = selectedCurrency
    }


    closeCurrencyDialog(); // Close the dialog after saving
}

// Show the Area dialog and overlay
function showAreaDialog() {
    // Show the dialog and overlay for area
    document.getElementById('areaDialog').style.display = 'block';
    document.getElementById('overlayArea').style.display = 'block';
}

// Close the Area dialog and overlay
function closeAreaDialog() {
    // Hide the dialog and overlay for area
    document.getElementById('areaDialog').style.display = 'none';
    document.getElementById('overlayArea').style.display = 'none';
}

// Toggle dropdown visibility when clicked
// Toggle dropdown visibility when clicked
document.querySelector('.dropdown-trigger-area').addEventListener('click', function () {
    // Toggle the active class to control visibility of .dropdown-content-area
    this.classList.toggle('active');
});


// Handle area selection from the dropdown
const areaOptions = document.querySelectorAll('.area-option');
areaOptions.forEach(option => {
    option.addEventListener('click', function () {
        // Change the text of the selected area div
        document.querySelector('.selected-area').textContent = this.textContent;
        // Close the dropdown after selection
        document.querySelector('.dropdown-trigger-area').classList.remove('active');
    });
});

// Save the selected area
function saveArea() {
    const selectedArea = document.querySelector('.selected-area').textContent;

    // Update the label text with the selected area
    const areaLabel = document.querySelector('.filter-area-label');
    if (areaLabel) {
        areaLabel.textContent = selectedArea;
    }

    closeAreaDialog(); // Close the dialog after saving
} function more() {
    const advancedOptions = document.querySelector('.advanced-options');
    if (advancedOptions.style.display === 'none' || advancedOptions.style.display === '') {
        advancedOptions.style.display = 'flex';
    } else {
        advancedOptions.style.display = 'none';
    }
}
const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slide').length;
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let currentIndex = 0;

// Function to update the slide position
function updateSlidePosition() {
    // Adjust the transform to move the slides
    slides.style.transform = `translateX(-${currentIndex * (100 / totalSlides)}%)`;
}

// Add event listener for the "Previous" button
prevButton.addEventListener('click', () => {
    // Decrement index, ensuring it wraps around correctly
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalSlides - 1;
    updateSlidePosition();
});

// Add event listener for the "Next" button
nextButton.addEventListener('click', () => {
    // Increment index, ensuring it wraps around correctly
    currentIndex = (currentIndex < totalSlides - 1) ? currentIndex + 1 : 0;
    updateSlidePosition();
});

// Initialize the slide position on load
updateSlidePosition();

function highlightAgency(agency) {
    // Highlight the image


    // Show the 'loc-to-visit' div and hide 'agency-location'
    const locToVisit = agency.querySelector('.loc-to-visit');
    const agencyLocation = agency.querySelector('.agency-location');

    locToVisit.style.display = 'flex';
    agencyLocation.style.display = 'none';
}

function resetAgency(agency) {
    // Remove the highlight from the image


    // Reset the display of the divs
    const locToVisit = agency.querySelector('.loc-to-visit');
    const agencyLocation = agency.querySelector('.agency-location');

    locToVisit.style.display = 'none';
    agencyLocation.style.display = 'block';
}

