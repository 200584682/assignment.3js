document.addEventListener("DOMContentLoaded", function () {
    const smoothieForm = document.getElementById('smoothieForm');
    const orderButton = document.getElementById('orderButton');
    const orderSummary = document.getElementById('orderSummary');
    const orderDetails = document.getElementById('orderDetails');
    const smoothieImage = document.getElementById('smoothieImage');
  
    // Base prices for different smoothie sizes
    const basePrices = {
      small: 5.00,
      medium: 7.50,
      large: 10.00
    };
  
    // Extra costs
    const extraCosts = {
      "Protein Powder": 2.00
    };
  
    // Event listener for the "Order Smoothie" button
    orderButton.addEventListener('click', function () {
      const customerName = document.getElementById('customerName').value;
      const size = smoothieForm.size.value;
      const base = smoothieForm.base.value;
      const selectedIngredients = Array.from(smoothieForm.ingredients)
        .filter(ingredient => ingredient.checked)
        .map(ingredient => ingredient.value);
      const selectedExtras = Array.from(smoothieForm.extras)
        .filter(extra => extra.checked)
        .map(extra => extra.value);
      const blendLevel = smoothieForm.blendLevel.value;
  
      // Calculate the total price
      let totalPrice = basePrices[size]; // Start with the base price for the selected size
      selectedIngredients.forEach(() => totalPrice += 1); // $1 for each ingredient
      selectedExtras.forEach(extra => totalPrice += extraCosts[extra] || 0); // Add extra costs if any
  
      // Default image source
      let imageSrc = "images/default-smoothie.png"; 
  
      // Update the smoothie image based on the base selection
      if (base === "Milk") {
        imageSrc = "images/milk.jpg"; // Milk-based smoothie
      } else if (base === "Almond Milk") {
        imageSrc = "images/almond.jpg"; // Almond milk-based smoothie
      } else if (base === "Coconut Water") {
        imageSrc = "images/coconut.jpg"; // Coconut water-based smoothie
      }
  
      // Modify image based on selected ingredients
      if (selectedIngredients.length === 0) {
        imageSrc = "images/default-smoothie.png"; // If no ingredients are selected, show default image
      } else {
        if (selectedIngredients.includes("Banana")) {
          imageSrc = "images/img 2.jpg"; // Update to banana smoothie
        } 
        if (selectedIngredients.includes("Strawberry")) {
          imageSrc = "images/img 1.jpg"; // Update to strawberry smoothie
        }
        if (selectedIngredients.includes("Blueberry")) {
          imageSrc = "images/img 3.jpg"; // Update to blueberry smoothie
        }
        if (selectedIngredients.includes("Kale")) {
          imageSrc = "images/img 5.jpg"; // Update to kale smoothie
        }
        if (selectedIngredients.includes("Mango")) {
          imageSrc = "images/img 4.jpg"; // Update to mango smoothie
        }
      }
  
      // Set the updated image as the preview
      smoothieImage.src = imageSrc;
  
      // Show the order summary
      orderSummary.style.display = 'block';
      orderDetails.innerHTML = `
        <p><strong>Customer Name:</strong> ${customerName}</p>
        <p><strong>Smoothie Size:</strong> ${size.charAt(0).toUpperCase() + size.slice(1)} ($${basePrices[size].toFixed(2)})</p>
        <p><strong>Base:</strong> ${base}</p>
        <p><strong>Blend Level:</strong> ${blendLevel}</p>
        <p><strong>Ingredients:</strong> ${selectedIngredients.length > 0 ? selectedIngredients.join(', ') : 'None'}</p>
        <p><strong>Extras:</strong> ${selectedExtras.length > 0 ? selectedExtras.join(', ') : 'None'}</p>
        <p><strong>Total Price:</strong> $${totalPrice.toFixed(2)}</p>
      `;
    });
  
    // Optional: Form reset functionality (if you want to reset the form after submission)
    smoothieForm.addEventListener('reset', function () {
      orderSummary.style.display = 'none';
      smoothieImage.src = "images/default-smoothie.png"; // Reset the image to default
    });
  });
