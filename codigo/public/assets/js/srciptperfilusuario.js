const editProfileButton = document.querySelector('.edit-profile');
const bioText = document.getElementById('bio-text');
const editBioText = document.getElementById('edit-bio-text');
const goalItems = document.querySelectorAll('.goal-item');
const addStarButton = document.getElementById('add-star-button');
const starsContainer = document.getElementById('stars-container');

editProfileButton.addEventListener('click', () => {
 
  bioText.style.display = bioText.style.display === 'none' ? 'none' : 'block';
  editBioText.style.display = editBioText.style.display === 'none' ? 'block' : 'none';

 
  goalItems.forEach(goalItem => {
    const goalTextArea = goalItem.querySelector('.edit-area');
    const goalText = goalItem.querySelector('span');

    goalTextArea.style.display = goalTextArea.style.display === 'none' ? 'block' : 'none';
    goalText.style.display = goalText.style.display === 'none' ? 'none' : 'block'; 
  });
});


goalItems.forEach(goalItem => {
  const goalTextArea = goalItem.querySelector('.edit-area');
  goalTextArea.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      const goalText = goalItem.querySelector('span');
      goalText.textContent = goalTextArea.value; 
      goalTextArea.style.display = 'none';
      goalText.style.display = 'block'; 
    }
  });
});


editBioText.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    bioText.textContent = editBioText.value;
    editBioText.style.display = 'none';
    bioText.style.display = 'block';
  }
});

addStarButton.addEventListener('click', () => {
  const newStar = document.createElement('i');
  newStar.classList.add('fas', 'fa-star'); 
  starsContainer.appendChild(newStar); 
});



const profilePicture = document.getElementById('profile-picture');
const uploadImage = document.getElementById('upload-image');
const changeProfileButton = document.getElementById('change-profile-button');

changeProfileButton.addEventListener('click', () => {
  uploadImage.click(); 
});

uploadImage.addEventListener('change', () => {
  if (uploadImage.files && uploadImage.files[0]) {
    const reader = new FileReader();

    reader.onload = (e) => {
      profilePicture.src = e.target.result;
    };

    reader.readAsDataURL(uploadImage.files[0]);
  }
});
