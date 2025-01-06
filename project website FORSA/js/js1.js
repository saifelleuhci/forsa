// Ensure the div is hidden when the page loads
window.addEventListener("load", () => {
    const div = document.getElementById("div");
    if (div) {
        div.style.display = "none"; // Hide the div on page load
    }
});

// Form submission logic
const form = document.getElementById("form");
const div = document.getElementById("div");

form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form submission initially

    // Reset error state and error list
    let error = false;
    let error_list = [];
    div.style.display = "none"; // Hide the error div
    div.innerHTML = ""; // Clear any previous error messages

    // Get the values of the inputs
    let state = document.getElementById("state").value.trim();
    let name = document.getElementById("name").value.trim();
    let phone_number = document.getElementById("phone_number").value.trim();
    let experience = document.getElementById("experience").value.trim();

    // Validation
    if (state === "") {
        error_list.push("يرجى إدخال الولاية");
    }
    if (name === "") {
        error_list.push("يرجى إدخال الاسم واللقب");
    }
    if (experience === "") {
        error_list.push("يرجى إدخال الخبرة العملية");
    }
    if (phone_number === "") {
        error_list.push("يرجى إدخال رقم الهاتف");
    } else if (phone_number.length !== 8) {
        error_list.push("لازم نومرو يكون 8 ارقام");
    }

    // Display errors if any
    if (error_list.length > 0) {
        div.innerHTML = error_list.join("<br>"); // Show error messages
        div.style.display = "block"; // Make the div visible
        error = true; // Set error flag
        return; // Exit the function to prevent further execution
    }

    // If no errors, submit the form data programmatically
    if (!error) {
        const formData = new FormData(form); // Create FormData object from the form

        // Submit the form data using fetch
        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    // If the form submission is successful, redirect to done.html
                    window.location.href = "done.html";
                } else {
                    // Handle API errors (optional)
                    div.innerHTML = "حدث خطأ أثناء إرسال النموذج. يرجى المحاولة مرة أخرى.";
                    div.style.display = "block";
                }
            })
            .catch((error) => {
                // Handle network errors (optional)
                div.innerHTML = "حدث خطأ في الشبكة. يرجى المحاولة مرة أخرى.";
                div.style.display = "block";
            });
    }
});