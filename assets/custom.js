jQuery_T4NT(document).ready(function ($) {

	/**
	*  Variant selection changed
	*  data-variant-toggle="{{ variant.id }}"
	*/
	$(document).on("variant:changed", function (evt) {
		// console.log( evt.currentVariant );
		// $('[data-variant-toggle]').hide(0);
		// $('[data-variant-toggle="'+evt.currentVariant.id+'"]').show(0);
	});


});


// Header SearchBar and Type Animation 

document.addEventListener('shopify:section:load', function () {
	initializeTypeWriterEffect();
});

document.addEventListener('DOMContentLoaded', function () {
	initializeTypeWriterEffect();



	$('.t4s-mini-search__input, .t4s-search-header__input').focusin(function () {
		$('body').addClass('focused-search');
		$('button.t4s-search-header__submit').addClass('clear-search');
	});

	$(document).on('click', '.clear-search svg.close-icon', function () {
		$('.t4s-mini-search__input, .t4s-search-header__input ').val('');
		$('body').removeClass('focused-search');
		$('button.t4s-search-header__submit').removeClass('clear-search');

	});

	$(document).on('click', '.t4s-push-menu-btn', function () {
		$('body').addClass('menu-overlay');
	});

	$(document).on('click', '.t4s-drawer-menu__close', function () {
		$('body').removeClass('menu-overlay');
	});

	$(window).scroll(function () {
		if ($(this).scrollTop() > 450.8) {
			$('body').addClass('newClass');
		} else {
			$('body').removeClass('newClass');
		}
	});
});

// Delay for 1 second (1000ms)

function initializeTypeWriterEffect() {
  // Cancel any previous instances
  if (window.typewriterTimers) {
    window.typewriterTimers.forEach(timer => clearTimeout(timer));
  }
  window.typewriterTimers = [];
  
  // Get the input elements
  const inputs = [
    document.querySelector('.t4s-search-header__input'),
    document.querySelector('.t4s-mini-search__input'),
  ].filter(input => input !== null);
  
  if (inputs.length === 0) return; // No valid inputs found
  
 const baseText = 'Search for: ';
 const textList = ['Best Sellers', 'Shop by Country', 'Shop by Club', 'Mystery Box'];
  
  // Setup each input element
  inputs.forEach(input => {
    let state = {
    textIndex: 0,
    charIndex: 0,
    isDeleting: false,
    active: true
    };
    
    // Reset placeholder
    input.setAttribute('placeholder', baseText);
    
    // Create non-recursive animation function
    function animate() {
    if (!state.active) return;
    
    const currentText = textList[state.textIndex];
    
    if (!state.isDeleting) {
      // Typing forward
      if (state.charIndex <= currentText.length) {
      input.setAttribute('placeholder', baseText + currentText.substring(0, state.charIndex));
      state.charIndex++;
      
      if (state.charIndex <= currentText.length) {
        // Continue typing
        const timer = setTimeout(animate, 100);
        window.typewriterTimers.push(timer);
      } else {
        // Done typing, pause before deleting
        const timer = setTimeout(() => {
        if (state.active) {
          state.isDeleting = true;
          animate();
        }
        }, 2000);
        window.typewriterTimers.push(timer);
      }
      }
    } else {
      // Deleting
      if (state.charIndex >= 0) {
      input.setAttribute('placeholder', baseText + currentText.substring(0, state.charIndex));
      state.charIndex--;
      
      if (state.charIndex >= 0) {
        // Continue deleting
        const timer = setTimeout(animate, 50);
        window.typewriterTimers.push(timer);
      } else {
        // Done deleting, move to next text
        state.isDeleting = false;
        state.textIndex = (state.textIndex + 1) % textList.length;
        state.charIndex = 0;
        
        // Small pause before starting next word
        const timer = setTimeout(animate, 300);
        window.typewriterTimers.push(timer);
      }
      }
    }
    }
    
    // Handle input focus
    input.addEventListener('focus', function() {
    state.active = false;
    this.setAttribute('placeholder', '');
    });
    
    // Handle input blur
    input.addEventListener('blur', function() {
    if (this.value === '') {
      state.active = true;
      state.isDeleting = false;
      state.charIndex = 0;
      animate();
    }
    });
    
    // Start animation
    animate();
  });
  }
  
  // Call the function when the document is ready
  document.addEventListener('DOMContentLoaded', initializeTypeWriterEffect);


// Custom Title in Recommendations Products

const intervalId = setInterval(function () {
	// Get the custom heading and its HTML content
	const customHeading = document.querySelector('.custom-heading');
	const customHeadingHTML = customHeading ? customHeading.innerHTML.trim() : '';

	// Get the dynamic link from the custom heading (assuming it's rendered by Liquid)
	const dynamicLinkElement = document.querySelector('.custom-view-link'); // Select the anchor with class "custom-view-link"
	const dynamicHref = dynamicLinkElement ? dynamicLinkElement.href : '#'; // Extract the dynamic href

	// Find the target h3 element where the HTML will be replaced
	const targetHeading = document.querySelector(
		'.shopify-section.t4s-section.id_product-recommendations h3.t4s-section-title.t4s-title'
	);
	const targetHeadingnew = document.querySelector(
		'.shopify-section.t4s-section.id_product-recommendations button.flickityt4s-button.flickityt4s-prev-next-button.next'
	);
	// Check if both elements exist and the customHeadingHTML has content
	if (targetHeading && customHeadingHTML.length > 0) {
		// Replace the target h3 element's content with the custom heading HTML
		targetHeading.innerHTML = customHeadingHTML;

		// Create the new anchor element
		const anchor = document.createElement('a');
		anchor.href = dynamicHref; // Use the dynamically extracted href
		anchor.className =
			'custom-view-link-bew t4s-btn-base t4s-btn-size-large t4s-btn-color-primary t4s-btn-effect-default t4s-btn';
		anchor.textContent = 'View All'; // Anchor text

		// Append the anchor to the targetHeading
		targetHeadingnew.insertAdjacentElement('afterend', anchor);

		// Stop the interval after updating the target
		clearInterval(intervalId);
	}
}, 1000); // Check every 1 second

document.addEventListener('click', function (event) {
	if (event.target.classList.contains('cc-btn-decision')) {
		setTimeout(function () {
			document.body.classList.add('removecookies');
		}, 500); // 500 milliseconds delay
	}
});




// Sticky collection

let lastScrollTop = 500;
const body = document.body;

window.addEventListener("scroll", () => {
	const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

	if (currentScrollTop < lastScrollTop) {
		// Scrolling up
		body.classList.add("scroll-up");
	} else {
		// Scrolling down
		body.classList.remove("scroll-up");
	}

	lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // Ensure it doesn't go negative
});


// Make Title Dynamic

let interval = setInterval(function () {
	const url = new URL(window.location.href);
	const params = new URLSearchParams(url.search);

	const size = params.get('filter_size') || '';
	const type = params.get('filter_product_type') || '';
	const brand = params.get('filter_brand') || '';

	const title = `${brand || ''} ${type || ''}`.trim();

	if (title) {
		const collectionTitleElement = document.querySelector('.collectionname h2');
		if (collectionTitleElement) {
			collectionTitleElement.textContent = title;
		}
		clearInterval(interval);
	}
}, 100);


// Current Menu JS

var path = window.location.pathname;

// Create a function to check and update the menu items
function updateMenuLinks() {
	var links = document.querySelectorAll("#t4s-menu-drawer .t4s-menu-item a");
	if (links.length > 0) {
		links.forEach(function (link) {
			if (link.getAttribute("href") === path) {
				link.parentElement.classList.add("mobile-menu_current"); // Add the class
			}
		});
	}
}

// Create a MutationObserver to monitor DOM changes
var observer = new MutationObserver(function (mutationsList, observer) {
	for (var mutation of mutationsList) {
		if (mutation.type === "childList") {
			updateMenuLinks(); // Call the update function whenever the DOM changes
		}
	}
});

// Start observing the body or a specific container
observer.observe(document.body, {
	childList: true, // Monitor direct children
	subtree: true,   // Monitor all descendants
});

// Optionally, call the function immediately if the menu is already loaded
updateMenuLinks();



document.addEventListener('DOMContentLoaded', function() {
	// Initial setup
	setupVideoCarouselAutoplay();
	
	// Also run again after a short delay to catch elements that might load dynamically
	setTimeout(setupVideoCarouselAutoplay, 1000);
	
	// For single-page applications or sites with dynamic content loading,
	// you might need to run this function after content updates
  });
  
  // Main function to set up the auto-play functionality
  function setupVideoCarouselAutoplay() {
	console.log('Setting up video carousel autoplay...');
	
	// Find all video items in the carousel
	const videoItems = document.querySelectorAll('.t4s-col-item.t4s-carousel__nav-item[data-mdtype="video"]');
	console.log(`Found ${videoItems.length} video items`);
	
	videoItems.forEach((item, index) => {
	  // Check if we already added a listener to avoid duplicates
	  if (!item.hasAttribute('data-video-listener')) {
		console.log(`Binding click to video item #${index}`);
		
		item.setAttribute('data-video-listener', 'true');
		
		item.addEventListener('click', function() {
		  console.log(`Clicked video item #${index}`);
		  
		  // Use multiple attempts with increasing delays to handle different loading scenarios
		  tryClickPlayButton(0);
		  
		  function tryClickPlayButton(attempt) {
			if (attempt >= 5) return; // Give up after 5 attempts
			
			setTimeout(() => {
			  const playButton = document.querySelector('.plyr__control--overlaid');
			  
			  if (playButton) {
				console.log(`Attempt ${attempt + 1}: Found play button`);
				
				if (playButton.offsetParent !== null) {
				  console.log('Play button is visible — clicking');
				  playButton.click();
				} else {
				  console.log('Play button is hidden, trying again...');
				  tryClickPlayButton(attempt + 1);
				}
			  } else {
				console.log(`Attempt ${attempt + 1}: Play button NOT found, trying again...`);
				tryClickPlayButton(attempt + 1);
			  }
			}, 300 * (attempt + 1)); // Increasing delay for each attempt
		  }
		});
	  }
	});
  
	// For carousels that might be added dynamically later
	// Setup a mutation observer to detect when new carousel items are added
	setupMutationObserver();
  }
  
  // Set up a MutationObserver to catch dynamically added carousel items
  function setupMutationObserver() {
	// Check if observer already exists
	if (window.videoCarouselObserver) return;
	
	const observerConfig = { 
	  childList: true, 
	  subtree: true 
	};
	
	window.videoCarouselObserver = new MutationObserver(function(mutations) {
	  let shouldSetup = false;
	  
	  mutations.forEach(function(mutation) {
		// Check if any new nodes were added
		if (mutation.addedNodes.length) {
		  for (let i = 0; i < mutation.addedNodes.length; i++) {
			const node = mutation.addedNodes[i];
			// Check if it's an element and might contain our carousel items
			if (node.nodeType === Node.ELEMENT_NODE) {
			  if (node.querySelector('.t4s-carousel__nav-item[data-mdtype="video"]') || 
				  node.matches('.t4s-carousel__nav-item[data-mdtype="video"]')) {
				shouldSetup = true;
				break;
			  }
			}
		  }
		}
	  });
	  
	  if (shouldSetup) {
		console.log('New carousel elements detected, setting up listeners...');
		setupVideoCarouselAutoplay();
	  }
	});
	
	// Start observing the document body for changes
	window.videoCarouselObserver.observe(document.body, observerConfig);
  }


// Function to check if infinite scroll has ended
function checkInfiniteScrollEnd() {
  const paginationWrapper = document.querySelector('[data-wrap-lm]');
  const body = document.body;
  
  if (paginationWrapper) {
    const isHidden = window.getComputedStyle(paginationWrapper).display === 'none';
    
    if (isHidden) {
      // Pagination wrapper is hidden (display: none), add the class
      if (!body.classList.contains('infinite_ended')) {
        body.classList.add('infinite_ended');
        // alert('Infinite scroll has ended - no more products to load!');
      }
    } else {
      // Pagination wrapper is visible, remove the class
      body.classList.remove('infinite_ended');
    }
  } else {
    // Pagination wrapper doesn't exist at all, also add the class
    if (!body.classList.contains('infinite_ended')) {
      body.classList.add('infinite_ended');
      // alert('Infinite scroll has ended - no more products to load!');
    }
  }
}

// Monitor for style changes on the pagination wrapper
function monitorPaginationWrapper() {
  const paginationWrapper = document.querySelector('[data-wrap-lm]');
  if (paginationWrapper) {
    // Create observer to watch for style attribute changes
    const styleObserver = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'attributes' && 
            (mutation.attributeName === 'style' || mutation.attributeName === 'class')) {
          checkInfiniteScrollEnd();
        }
      });
    });
    
    styleObserver.observe(paginationWrapper, {
      attributes: true,
      attributeFilter: ['style', 'class']
    });
  }
}

// Monitor AJAX requests completion
function monitorAjaxRequests() {
  // Override fetch function to monitor AJAX calls
  const originalFetch = window.fetch;
  window.fetch = function(...args) {
    return originalFetch.apply(this, args)
      .then(response => {
        // Check for infinite scroll end after AJAX completes
        setTimeout(checkInfiniteScrollEnd, 500);
        return response;
      });
  };

  // Override XMLHttpRequest for jQuery AJAX calls
  const originalOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function() {
    this.addEventListener('load', function() {
      // Check for infinite scroll end after AJAX completes
      setTimeout(checkInfiniteScrollEnd, 500);
    });
    originalOpen.apply(this, arguments);
  };
}

// Watch for DOM changes
function watchDOMChanges() {
  const domObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList') {
        // Re-monitor pagination wrapper if DOM changes
        setTimeout(() => {
          monitorPaginationWrapper();
          checkInfiniteScrollEnd();
        }, 100);
      }
    });
  });
  
  domObserver.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// Listen for Shopify/Kalles specific events
function listenForThemeEvents() {
  // Common Shopify theme events
  document.addEventListener('shopify:section:load', () => {
    setTimeout(() => {
      monitorPaginationWrapper();
      checkInfiniteScrollEnd();
    }, 300);
  });
  
  // Kalles theme custom events
  document.addEventListener('kalles:collection:loaded', () => {
    setTimeout(checkInfiniteScrollEnd, 300);
  });
  
  // Listen for collection updates
  document.addEventListener('collection:updated', () => {
    setTimeout(checkInfiniteScrollEnd, 300);
  });
}

// Initialize everything
function init() {
  checkInfiniteScrollEnd();
  monitorPaginationWrapper();
  monitorAjaxRequests();
  watchDOMChanges();
  listenForThemeEvents();
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Also check periodically as fallback
setInterval(checkInfiniteScrollEnd, 2000);










document.addEventListener('cart:updated', function () {
  fetch('/cart.js')
    .then(response => response.json())
    .then(cart => {
      let chargeItem = null;
      let otherQuantityTotal = 0;

      cart.items.forEach(item => {
        if (item.product_id === 15157668413818) {
          chargeItem = item;
        } else {
          otherQuantityTotal += item.quantity;
        }
      });

      // If only charge item is in cart, remove it
      if (chargeItem && cart.items.length === 1) {
        const removeBtn = document.querySelector(`a[data-id="${chargeItem.key}"]`);
        if (removeBtn) {
          removeBtn.click();
        } else {
          console.warn('Remove button not found for key:', chargeItem.key);
        }
        return;
      }

      // If charge item is present but quantity mismatch, update it
      if (chargeItem && chargeItem.quantity !== otherQuantityTotal) {
        fetch('/cart/change.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: chargeItem.key,
            quantity: otherQuantityTotal
          })
        })
        .then(response => response.json())
        .then(data => {
          console.log('Charge item quantity updated:', data);
        })
        .catch(error => {
          console.error('Error updating charge item quantity:', error);
        });
      }
    })
    .catch(error => {
      console.error('Error fetching cart:', error);
    });
});


 document.addEventListener("DOMContentLoaded", function () {
  const sizeGuideLink = document.querySelector('.size-guide');
  const sizeAccordionButton = document.getElementById('size-accodian');

  if (sizeGuideLink && sizeAccordionButton) {
    sizeGuideLink.addEventListener('click', function (e) {
      e.preventDefault();

      const isActive = sizeAccordionButton.classList.contains('active');

      if (!isActive) {
        sizeAccordionButton.click();
      }

      // Always scroll smoothly to the button
      setTimeout(() => {
        sizeAccordionButton.scrollIntoView({ behavior: 'smooth' });
      }, 300); // Adjust delay if needed
    });
  }
});


// Quntity Updated

// Add this JavaScript code to your theme's product page template or in a script tag

document.addEventListener('DOMContentLoaded', function () {
  // Find only swatch items inside .t4s-swatch__list.shirts
  const swatchItems = document.querySelectorAll('.t4s-swatch__list.shirts [data-swatch-item]');

  // Find the quantity input field
  const quantityInput = document.querySelector('input[name="quantity"], .quantity-input input, .t4s-quantity input');

  // Function to update quantity
  function updateQuantity(value) {
    if (quantityInput) {
      quantityInput.value = value;

      // Trigger change and input events
      const changeEvent = new Event('change', { bubbles: true });
      const inputEvent = new Event('input', { bubbles: true });
      quantityInput.dispatchEvent(changeEvent);
      quantityInput.dispatchEvent(inputEvent);
    }
  }

  // Function to update main product price from label
  function updateMainPrice(selectedValue) {
    const selectedLabel = document.querySelector(`label[for="box${selectedValue}"]`);
    if (selectedLabel) {
      const currentPriceEl = selectedLabel.querySelector('.current-price');
      const targetPrice = document.querySelector('.t4s-product-price');
      if (currentPriceEl && targetPrice) {
        targetPrice.textContent = currentPriceEl.textContent.trim();
      }
    }
  }

  // Initial swatch click binding
  swatchItems.forEach(function (item) {
    item.addEventListener('click', function () {
      const selectedValue = this.getAttribute('data-value');
      const quantityValue = parseInt(selectedValue, 10);

      if (!isNaN(quantityValue) && quantityValue > 0) {
        updateQuantity(quantityValue);
      }

      // Update display
      const currentValueSpan = document.querySelector('[data-current-value]');
      if (currentValueSpan) {
        currentValueSpan.textContent = selectedValue;
      }

      // Update selection
      document.querySelectorAll('.t4s-swatch__list.shirts [data-swatch-item]').forEach(swatch => swatch.classList.remove('is--selected'));
      this.classList.add('is--selected');

      // ✅ Update main product price
      updateMainPrice(selectedValue);
    });
  });
});

// Event delegation for dynamically added swatches
document.addEventListener('click', function (e) {
  if (e.target.hasAttribute('data-swatch-item') && e.target.closest('.t4s-swatch__list.shirts')) {
    const selectedValue = e.target.getAttribute('data-value');
    const quantityInput = document.querySelector('input[name="quantity"], .quantity-input input, .t4s-quantity input');

    const quantityValue = parseInt(selectedValue, 10);
    if (!isNaN(quantityValue) && quantityValue > 0) {
      quantityInput.value = quantityValue;
      quantityInput.dispatchEvent(new Event('change', { bubbles: true }));
      quantityInput.dispatchEvent(new Event('input', { bubbles: true }));
    }

    const currentValueSpan = document.querySelector('[data-current-value]');
    if (currentValueSpan) {
      currentValueSpan.textContent = selectedValue;
    }

    document.querySelectorAll('.t4s-swatch__list.shirts [data-swatch-item]').forEach(swatch => swatch.classList.remove('is--selected'));
    e.target.classList.add('is--selected');

    // ✅ Update main product price
    const selectedLabel = document.querySelector(`label[for="box${selectedValue}"]`);
    if (selectedLabel) {
      const currentPriceEl = selectedLabel.querySelector('.current-price');
      const targetPrice = document.querySelector('.t4s-product-price');
      if (currentPriceEl && targetPrice) {
        targetPrice.textContent = currentPriceEl.textContent.trim();
      }
    }
  }
});

// MutationObserver to bind listeners on dynamically loaded content
function syncVariantWithQuantity() {
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === 'childList') {
        const newSwatchItems = document.querySelectorAll('.t4s-swatch__list.shirts [data-swatch-item]:not([data-listener-attached])');

        newSwatchItems.forEach(function (item) {
          item.setAttribute('data-listener-attached', 'true');
          item.addEventListener('click', function () {
            const selectedValue = this.getAttribute('data-value');
            const quantityInput = document.querySelector('input[name="quantity"], .quantity-input input, .t4s-quantity input');

            const quantityValue = parseInt(selectedValue, 10);
            if (!isNaN(quantityValue) && quantityValue > 0) {
              quantityInput.value = quantityValue;
              quantityInput.dispatchEvent(new Event('change', { bubbles: true }));
              quantityInput.dispatchEvent(new Event('input', { bubbles: true }));
            }

            const currentValueSpan = document.querySelector('[data-current-value]');
            if (currentValueSpan) {
              currentValueSpan.textContent = selectedValue;
            }

            document.querySelectorAll('.t4s-swatch__list.shirts [data-swatch-item]').forEach(swatch => swatch.classList.remove('is--selected'));
            this.classList.add('is--selected');

            // ✅ Update main product price
            const selectedLabel = document.querySelector(`label[for="box${selectedValue}"]`);
            if (selectedLabel) {
              const currentPriceEl = selectedLabel.querySelector('.current-price');
              const targetPrice = document.querySelector('.t4s-product-price');
              if (currentPriceEl && targetPrice) {
                targetPrice.textContent = currentPriceEl.textContent.trim();
              }
            }
          });
        });
      }
    });
  });

  const shirtsSwatchContainer = document.querySelector('.t4s-swatch__list.shirts');
  if (shirtsSwatchContainer) {
    observer.observe(shirtsSwatchContainer, {
      childList: true,
      subtree: true
    });
  } else {
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
}

syncVariantWithQuantity();


// Cart Page redirect

(() => {
  const CHECKBOX_SELECTOR = '#shipping-insurance-checkbox';
  const INSURANCE_VARIANT_ID = '55820416614778'; // insurance variant id
  const VARIANT_ID = '55820416614778'; // main product variant id
  const log = (...a) => console.log('[Insurance]', ...a);
  
  // --- UI HELPERS ---
  function showLoader(checkbox) {
    const checkboxContainer = checkbox.closest('.custom-checkbox');
    const labelText = checkboxContainer.querySelector('.lable-text p');
    
    // Hide checkbox and show loader
    checkbox.style.display = 'none';
    checkboxContainer.querySelector('.checkmark').style.display = 'none';
    
    // Create loader if it doesn't exist
    let loader = checkboxContainer.querySelector('.insurance-loader');
    if (!loader) {
      loader = document.createElement('div');
      loader.className = 'insurance-loader';
      loader.innerHTML = `
        <div class="spinner" style="
          width: 20px;
          height: 20px;
          border: 2px solid #f3f3f3;
          border-top: 2px solid #333;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        "></div>
      `;
      checkboxContainer.insertBefore(loader, checkboxContainer.firstChild);
      
      // Add CSS animation if not already added
      if (!document.querySelector('#insurance-loader-css')) {
        const style = document.createElement('style');
        style.id = 'insurance-loader-css';
        style.textContent = `
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .insurance-loader {
            display: flex;
            align-items: center;
          }
        `;
        document.head.appendChild(style);
      }
    }
    
    loader.style.display = 'flex';
    
    // Update text based on checkbox state
    if (checkbox.checked) {
      labelText.textContent = 'Shipping insurance adding...';
    } else {
      labelText.textContent = 'Shipping insurance removing...';
    }
  }
  
  function hideLoader(checkbox) {
    const checkboxContainer = checkbox.closest('.custom-checkbox');
    const labelText = checkboxContainer.querySelector('.lable-text p');
    const loader = checkboxContainer.querySelector('.insurance-loader');
    
    // Hide loader and show checkbox
    if (loader) {
      loader.style.display = 'none';
    }
    checkbox.style.display = '';
    checkboxContainer.querySelector('.checkmark').style.display = '';
    
    // Reset text
    labelText.textContent = 'Protect your package (£4.99)';
  }
  
  // --- CART HELPERS ---
  async function addInsurance() {
    return fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        items: [{
          id: Number(INSURANCE_VARIANT_ID),
          quantity: 1
        }]
      })
    }).then(r => r.json());
  }
  
  async function removeInsurance() {
    return fetch('/cart/update.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ updates: { [INSURANCE_VARIANT_ID]: 0 } })
    }).then(r => r.json());
  }
  
  // --- KALLES SPECIFIC CART REFRESH ---
  async function refreshKallesCartDrawer() {
    try {
      // Method 1: Try Kalles theme specific functions
      if (window.KART && typeof window.KART.getCart === 'function') {
        window.KART.getCart();
        log('Kalles KART.getCart() triggered');
        return;
      }
      
      // Method 2: Try cart drawer refresh using Kalles structure
      const drawerSelectors = [
        '#cart-drawer',
        '#CartDrawer', 
        '.cart-drawer',
        '[data-cart-drawer]',
        '#drawer-cart',
        '.drawer__cart'
      ];
      
      for (const selector of drawerSelectors) {
        const drawerEl = document.querySelector(selector);
        if (drawerEl) {
          // Try to get section ID from element
          const sectionId = drawerEl.dataset.sectionId || 'cart-drawer';
          
          try {
            const res = await fetch(`${window.location.pathname}?sections=${sectionId}`);
            const data = await res.json();
            
            if (data[sectionId]) {
              drawerEl.innerHTML = data[sectionId];
              log(`Kalles drawer refreshed via sections API: ${sectionId}`);
              return;
            }
          } catch (e) {
            log('Section refresh failed, trying next method');
          }
        }
      }
      
      // Method 3: Use Kalles cart events
      const cartEvents = [
        'cart:updated',
        'cart:build', 
        'cart:refresh',
        'drawer:refresh',
        'kalles:cart:updated'
      ];
      
      const cart = await fetch('/cart.js').then(r => r.json());
      
      cartEvents.forEach(eventName => {
        document.dispatchEvent(new CustomEvent(eventName, { 
          detail: { cart },
          bubbles: true 
        }));
        window.dispatchEvent(new CustomEvent(eventName, { 
          detail: { cart },
          bubbles: true 
        }));
      });
      
      // Method 4: Update cart counts and totals manually
      updateCartElements(cart);
      
      log('Kalles cart updated via events and manual update');
      
    } catch (error) {
      log('Error refreshing Kalles cart:', error);
      // Fallback: reload page
    }
  }
  
  // --- UPDATE CART ELEMENTS MANUALLY ---
  function updateCartElements(cart) {
    // Update cart count
    const countSelectors = [
      '[data-cart-count]',
      '.cart-count',
      '#cart-count',
      '.header__cart-count',
      '.cart__count',
      '.js-cart-count'
    ];
    
    countSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        el.textContent = cart.item_count;
        if (cart.item_count > 0) {
          el.style.display = '';
          el.classList.remove('hidden');
        }
      });
    });
    
    // Update cart total
    const totalSelectors = [
      '[data-cart-total]',
      '.cart-total',
      '#cart-total',
      '.cart__total',
      '.js-cart-total'
    ];
    
    totalSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        if (window.Shopify && window.Shopify.formatMoney) {
          el.textContent = window.Shopify.formatMoney(cart.total_price);
        } else {
          el.textContent = (cart.total_price / 100).toFixed(2);
        }
      });
    });
    
    // Update cart drawer items if drawer is open
    const drawerItems = document.querySelector('.cart-drawer__items, .drawer__cart-items, [data-cart-items]');
    if (drawerItems) {
      updateCartItems(drawerItems, cart);
    }
  }
  
  // --- UPDATE CART ITEMS IN DRAWER ---
  function updateCartItems(container, cart) {
    // This is a simplified version - you might need to adjust based on your exact HTML structure
    let itemsHTML = '';
    
    cart.items.forEach(item => {
      itemsHTML += `
        <div class="cart-item" data-variant-id="${item.variant_id}">
          <div class="cart-item__info">
            <h4>${item.product_title}</h4>
            <p>Qty: ${item.quantity}</p>
            <p>Price: ${window.Shopify ? window.Shopify.formatMoney(item.line_price) : (item.line_price / 100).toFixed(2)}</p>
          </div>
        </div>
      `;
    });
    
    if (itemsHTML) {
      container.innerHTML = itemsHTML;
    }
  }
  
  // --- TRY EXISTING KALLES FUNCTIONS ---
  function triggerKallesCartUpdate() {
    // Kalles specific functions
    const kallesFunctions = [
      () => window.KART && window.KART.getCart && window.KART.getCart(),
      () => window.theme && window.theme.cart && window.theme.cart.getCart && window.theme.cart.getCart(),
      () => window.ajaxCart && window.ajaxCart.load && window.ajaxCart.load(),
      () => window.cartDrawer && window.cartDrawer.refresh && window.cartDrawer.refresh(),
      () => window.KallesCart && window.KallesCart.refresh && window.KallesCart.refresh()
    ];
    
    for (const fn of kallesFunctions) {
      try {
        const result = fn();
        if (result) {
          log('Kalles function executed successfully');
          return true;
        }
      } catch (e) {
        // Continue to next function
      }
    }
    
    return false;
  }
  
  // --- MAIN EVENT HANDLER ---
  document.addEventListener('change', async (e) => {
    if (!e.target.matches(CHECKBOX_SELECTOR)) return;
    
    const checkbox = e.target;
    const originalState = !checkbox.checked; // Store opposite state for rollback
    
    try {
      // Show loader immediately
      showLoader(checkbox);
      
      if (checkbox.checked) {
        log('Adding insurance...');
        const result = await addInsurance();
        log('Insurance added:', result);
      } else {
        log('Removing insurance...');
        const result = await removeInsurance();
        log('Insurance removed:', result);
      }
      
      // Try Kalles specific functions first
      if (!triggerKallesCartUpdate()) {
        // Fallback to our custom refresh
        await refreshKallesCartDrawer();
      }
      
    } catch (error) {
      log('Error updating cart:', error);
      // Reset checkbox on error
      checkbox.checked = originalState;
    } finally {
      // Always hide loader and restore UI
      hideLoader(checkbox);
    }
  });
  
  // --- INITIALIZE ---
  log('Kalles Insurance script loaded for variant:', VARIANT_ID);
  
  // Debug: Log available cart functions
  log('Available cart functions:', {
    KART: !!window.KART,
    theme: !!window.theme,
    ajaxCart: !!window.ajaxCart,
    cartDrawer: !!window.cartDrawer,
    KallesCart: !!window.KallesCart
  });
})();
