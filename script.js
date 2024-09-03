document.addEventListener('DOMContentLoaded', loadProfiles);

document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Collect data
    const maidImage = document.getElementById('maid-image').files[0];
    const maidName = document.getElementById('maid-name').value;
    const maidLocation = document.getElementById('maid-location').value;
    const maidServices = document.getElementById('maid-services').value;
    const maidExperience = document.getElementById('maid-experience').value;
    const maidLanguages = document.getElementById('maid-languages').value;

    // Create a FileReader to convert image to data URL
    const reader = new FileReader();
    reader.onload = function(e) {
        const maidImageURL = e.target.result;

        // Save to local storage
        saveProfileToLocalStorage({
            image: maidImageURL,
            name: maidName,
            location: maidLocation,
            services: maidServices,
            experience: maidExperience,
            languages: maidLanguages
        });

        // Display the profile
        displayProfile({
            image: maidImageURL,
            name: maidName,
            location: maidLocation,
            services: maidServices,
            experience: maidExperience,
            languages: maidLanguages
        });
    };

    reader.readAsDataURL(maidImage);

    // Reset form
    document.getElementById('upload-form').reset();
});

function saveProfileToLocalStorage(profile) {
    let profiles = JSON.parse(localStorage.getItem('maidProfiles')) || [];
    profiles.push(profile);
    localStorage.setItem('maidProfiles', JSON.stringify(profiles));
}

function loadProfiles() {
    let profiles = JSON.parse(localStorage.getItem('maidProfiles')) || [];
    profiles.forEach(profile => displayProfile(profile));
}

function displayProfile(profile) {
    // Create a new maid card
    const maidCard = document.createElement('div');
    maidCard.classList.add('maid-card');

    maidCard.innerHTML = `
        <img src="${profile.image}" alt="${profile.name}">
        <h3>${profile.name}</h3>
        <p><strong>Location:</strong> ${profile.location}</p>
        <p><strong>Services:</strong> ${profile.services}</p>
        <button onclick="viewProfile('${profile.image}', '${profile.name}', '${profile.location}', '${profile.services}', '${profile.experience}', '${profile.languages}')">View Profile</button>
    `;

    document.querySelector('.maid-profiles').appendChild(maidCard);
}

function viewProfile(image, name, location, services, experience, languages) {
    document.getElementById('maid-profile-image').src = image;
    document.getElementById('maid-profile-name').textContent = name;
    document.getElementById('maid-profile-location').textContent = `Location: ${location}`;
    document.getElementById('maid-profile-services').textContent = `Services: ${services}`;
    document.getElementById('maid-profile-experience').textContent = `Experience: ${experience} years`;
    document.getElementById('maid-profile-languages').textContent = `Languages: ${languages}`;

    document.getElementById('profile-details').classList.remove('hidden');
    document.getElementById('contact-form').classList.add('hidden');
}

document.getElementById('hire-button').addEventListener('click', function() {
    document.getElementById('contact-form').classList.remove('hidden');
    document.getElementById('profile-details').classList.add('hidden');
});

document.querySelector('#contact-form form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Collect contact form data
    const contactName = document.getElementById('contact-name').value;
    const contactEmail = document.getElementById('contact-email').value;
    const contactMessage = document.getElementById('contact-message').value;

    // Save contact data to local storage
    saveContactToLocalStorage({
        name: contactName,
        email: contactEmail,
        message: contactMessage
    });

    // Clear the form
    document.querySelector('#contact-form form').reset();
    alert('Contact form submitted successfully!');
});

function saveContactToLocalStorage(contact) {
    let contacts = JSON.parse(localStorage.getItem('maidContacts')) || [];
    contacts.push(contact);
    localStorage.setItem('maidContacts', JSON.stringify(contacts));
}
