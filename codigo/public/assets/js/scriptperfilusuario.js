const editProfileButton = document.querySelector('.edit-profile');
const bioText = document.getElementById('bio-text');
const editBioText = document.getElementById('edit-bio-text');
const goalItems = document.querySelectorAll('.goal-item');
const addStarButton = document.getElementById('add-star-button');
const starsContainer = document.getElementById('stars-container');
const profilePicture = document.getElementById('profile-picture');
const navProfilePicture = document.getElementById('nav-profile-picture');
const uploadImage = document.getElementById('upload-image');
const levelElement = document.querySelector('.level');
const floatingBar = document.getElementById('floating-bar');

document.addEventListener('DOMContentLoaded', () => {
  const userProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
  
  if (userProfile.profilePicture) {
    profilePicture.src = userProfile.profilePicture;
    navProfilePicture.src = userProfile.profilePicture;
  }
  
  if (userProfile.bio) {
    bioText.textContent = userProfile.bio;
  }

  if (userProfile.level) {
    levelElement.textContent = `Nvl ${userProfile.level}`;
  }

  for (let i = 1; i <= 4; i++) {
    const goalText = document.getElementById(`goal-text-${i}`);
    const goalTextArea = document.getElementById(`edit-goal-text-${i}`);
    if (userProfile[`goal${i}`]) {
      goalText.textContent = userProfile[`goal${i}`];
      goalTextArea.value = userProfile[`goal${i}`];
    }
  }

  const pointsPerLevel = 100; 

  function updateLevel() {
    const points = userProfile.points || 0;
    const level = Math.floor(points / pointsPerLevel);
    userProfile.level = level;
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    document.querySelector('.level').textContent = `Nvl ${level}`;
  }

  function addPoints(points) {
    userProfile.points = (userProfile.points || 0) + points;
    updateLevel();
  }

  // Exemplo de como adicionar pontos
  document.getElementById('complete-goal-button').addEventListener('click', function() {
    addPoints(10); // Adiciona 10 pontos ao completar uma meta
  });

  updateLevel();

  // Gerenciar conquistas
  const stars = floatingBar.querySelectorAll('.star');
  stars.forEach(star => {
    star.addEventListener('click', () => {
      const starId = star.id;
      const starElement = document.getElementById(starId);
      starsContainer.appendChild(starElement);
    });
  });
});

editProfileButton.addEventListener('click', () => {
  bioText.style.display = bioText.style.display === 'none' ? 'block' : 'none';
  editBioText.style.display = editBioText.style.display === 'none' ? 'block' : 'none';

  goalItems.forEach(goalItem => {
    const goalTextArea = goalItem.querySelector('.edit-area');
    const goalText = goalItem.querySelector('span');

    goalTextArea.style.display = goalTextArea.style.display === 'none' ? 'block' : 'none';
    goalText.style.display = goalText.style.display === 'none' ? 'block' : 'none';
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

      const userProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
      userProfile[`goal${goalItem.id.split('-')[1]}`] = goalTextArea.value;
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
    }
  });
});

editBioText.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    bioText.textContent = editBioText.value;
    editBioText.style.display = 'none';
    bioText.style.display = 'block';

    const userProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
    userProfile.bio = editBioText.value;
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  }
});

addStarButton.addEventListener('click', () => {
  const newStar = document.createElement('i');
  newStar.classList.add('fas', 'fa-star');
  starsContainer.appendChild(newStar);
});

uploadImage.addEventListener('change', () => {
  if (uploadImage.files && uploadImage.files[0]) {
    const reader = new FileReader();

    reader.onload = (e) => {
      profilePicture.src = e.target.result;
      navProfilePicture.src = e.target.result;
      
      const userProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
      userProfile.profilePicture = e.target.result;
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
    };

    reader.readAsDataURL(uploadImage.files[0]);
  }
});

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text");
  const star = document.getElementById(data);
  event.target.appendChild(star);
}
