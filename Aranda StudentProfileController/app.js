// Cached DOM Elements (Selection via getElementById and querySelector)
const profileCard = document.getElementById('profileCard');
const profileName = document.getElementById('profileName');
const profileProgram = document.getElementById('profileProgram');
const profileYear = document.getElementById('profileYear');
const profileStatus = document.getElementById('profileStatus');
const detailsPanel = document.getElementById('detailsPanel');
const studentIdDisplay = document.getElementById('studentIdDisplay');

const nameInput = document.getElementById('nameInput');
const programInput = document.getElementById('programInput');
const yearInput = document.getElementById('yearInput');
const statusInput = document.getElementById('statusInput');

const updateBtn = document.getElementById('updateBtn');
const toggleDetailsBtn = document.getElementById('toggleDetailsBtn');
const themeBtn = document.getElementById('themeBtn');
const resetBtn = document.getElementById('resetBtn');

// QuerySelector requirement met
const formMessage = document.querySelector('#formMessage');

// Initial Setup using dataset
if (profileCard && studentIdDisplay) {
  const initialId = profileCard.dataset.studentId;
  studentIdDisplay.textContent = `Student ID: ${initialId}`;
}

// 1. isValidStudentName
function isValidStudentName(name) {
  return typeof name === 'string' && name.trim().length >= 2;
}

// 2. formatStudentStatus
function formatStudentStatus(status) {
  if (status === 'active') return 'Active';
  if (status === 'inactive') return 'Inactive';
  return status;
}

// 3. setStatus
function setStatus(status) {
  if (!profileCard || !profileStatus) return;

  const formatted = formatStudentStatus(status);
  profileStatus.textContent = formatted;
  profileCard.dataset.status = status;

  if (status === 'active') {
    profileCard.classList.add('active');
    profileCard.classList.remove('inactive');
  } else if (status === 'inactive') {
    profileCard.classList.add('inactive');
    profileCard.classList.remove('active');
  }
}

// 4. updateProfile
function updateProfile() {
  if (!nameInput || !formMessage || !profileName || !profileProgram || !profileYear) return;

  const rawName = nameInput.value;

  if (!isValidStudentName(rawName)) {
    formMessage.textContent = 'Student name is required';
    return;
  }

  // Clear validation errors
  formMessage.textContent = '';

  // Safe update using textContent exclusively
  profileName.textContent = rawName.trim();
  profileProgram.textContent = programInput.value;
  profileYear.textContent = yearInput.value;

  setStatus(statusInput.value);
}

// 5. toggleDetails
function toggleDetails() {
  if (detailsPanel) {
    detailsPanel.classList.toggle('hidden');
  }
}

// 6. toggleTheme
function toggleTheme() {
  document.body.classList.toggle('dark-theme');
}

// 7. resetProfile
function resetProfile() {
  // Restore initial profile data
  if (profileName) profileName.textContent = 'Maria Santos';
  if (profileProgram) profileProgram.textContent = 'BS Information Technology';
  if (profileYear) profileYear.textContent = '3rd Year';

  // Restore initial status
  setStatus('active');

  // Restore controls
  if (nameInput) nameInput.value = 'Maria Santos';
  if (programInput) programInput.value = 'BS Information Technology';
  if (yearInput) yearInput.value = '3rd Year';
  if (statusInput) statusInput.value = 'active';

  // Clear message
  if (formMessage) formMessage.textContent = '';

  // Restore details visibility
  if (detailsPanel) detailsPanel.classList.remove('hidden');

  // Remove dark theme
  document.body.classList.remove('dark-theme');
}

// Event Listeners Setup
if (updateBtn) updateBtn.addEventListener('click', updateProfile);
if (toggleDetailsBtn) toggleDetailsBtn.addEventListener('click', toggleDetails);
if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
if (resetBtn) resetBtn.addEventListener('click', resetProfile);