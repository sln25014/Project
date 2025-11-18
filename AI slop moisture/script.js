// Add/remove plant card logic
const plantList = document.getElementById('plant-list');
const addBtn = document.getElementById('add-plant');
const removeBtn = document.getElementById('remove-plant');
function createPlantCard(name, moisture) {
    const card = document.createElement('div');
    card.className = 'plant-card';
    const plantName = document.createElement('div');
    plantName.className = 'plant-name';
    plantName.textContent = name;
    const moistureStatus = document.createElement('div');
    moistureStatus.className = moisture > 50 ? 'moisture-status wet' : 'moisture-status dry';
    const moistureBar = document.createElement('div');
    moistureBar.className = 'moisture-bar';
    const moistureBarInner = document.createElement('div');
    moistureBarInner.className = 'moisture-bar-inner';
    moistureBarInner.setAttribute('data-width', moisture);
    moistureBarInner.setAttribute('data-color', moisture > 50 ? 'wet' : 'dry');
    moistureBar.appendChild(moistureBarInner);
    card.appendChild(plantName);
    card.appendChild(moistureStatus);
    card.appendChild(moistureBar);
    return card;
}
// Modal logic
const modal = document.getElementById('plant-modal');
const modalAddBtn = document.getElementById('modal-add-btn');
const modalCancelBtn = document.getElementById('modal-cancel-btn');
const plantNameInput = document.getElementById('plant-name-input');
const moistureInput = document.getElementById('moisture-input');

addBtn.onclick = function () {
    // Show modal
    modal.style.display = 'flex';
    plantNameInput.value = '';
    moistureInput.value = 0;
    plantNameInput.focus();
};
modalCancelBtn.onclick = function () {
    modal.style.display = 'none';
};
modalAddBtn.onclick = function () {
    const name = plantNameInput.value.trim() || 'New Plant';
    let moisture = parseInt(moistureInput.value);
    if (isNaN(moisture) || moisture < 0) moisture = 0;
    if (moisture > 100) moisture = 100;
    plantList.appendChild(createPlantCard(name, moisture, 'Today'));
    setTheme(isDark ? darkTheme : lightTheme);
    modal.style.display = 'none';
};
// Close modal on outside click
modal.addEventListener('click', function (e) {
    if (e.target === modal) modal.style.display = 'none';
});
removeBtn.onclick = function () {
    // Remove the last plant card if any
    if (plantList.children.length > 0) {
        plantList.removeChild(plantList.lastElementChild);
    }
};
// Theme toggle logic
const toggleBtn = document.getElementById('theme-toggle');
const darkTheme = {
    bodyBg: '#181a1b',
    bodyColor: '#e0e0e0',
    headerBg: '#222c22',
    headerColor: '#e0e0e0',
    containerBg: '#23272a',
    cardBg: '#232c23',
    cardBorder: '#333c33',
    plantName: '#b6f7b0',
    moistureBar: '#333c33',
    dry: '#ff6f6f',
    wet: '#b6f7b0',
    lastWatered: '#bdbdbd',
    footerBg: '#222c22',
    footerColor: '#e0e0e0',
};
const lightTheme = {
    bodyBg: '#f4f4f4',
    bodyColor: '#222',
    headerBg: '#388e3c',
    headerColor: '#fff',
    containerBg: '#fff',
    cardBg: '#e8f5e9',
    cardBorder: '#c8e6c9',
    plantName: '#388e3c',
    moistureBar: '#c8e6c9',
    dry: '#d32f2f',
    wet: '#388e3c',
    lastWatered: '#555',
    footerBg: '#388e3c',
    footerColor: '#fff',
};
function setTheme(theme) {
    document.body.style.background = theme.bodyBg;
    document.body.style.color = theme.bodyColor;
    document.querySelector('header').style.background = theme.headerBg;
    document.querySelector('header').style.color = theme.headerColor;
    document.querySelector('.container').style.background = theme.containerBg;
    document.querySelectorAll('.plant-card').forEach(card => {
        card.style.background = theme.cardBg;
        card.style.borderColor = theme.cardBorder;
    });
    document.querySelectorAll('.plant-name').forEach(el => el.style.color = theme.plantName);
    document.querySelectorAll('.moisture-bar').forEach(el => el.style.background = theme.moistureBar);
    document.querySelectorAll('.dry').forEach(el => el.style.color = theme.dry);
    document.querySelectorAll('.wet').forEach(el => el.style.color = theme.wet);
    document.querySelectorAll('.last-watered').forEach(el => el.style.color = theme.lastWatered);
    document.querySelector('footer').style.background = theme.footerBg;
    document.querySelector('footer').style.color = theme.footerColor;
    // Set moisture bar inner width and color
    document.querySelectorAll('.moisture-bar-inner').forEach(el => {
        const width = parseInt(el.getAttribute('data-width'));
        el.style.width = width + '%';
        // Set color based on moisture value
        if (width > 50) {
            el.style.background = theme.wet;
        } else {
            el.style.background = theme.dry;
        }
    });
    // Update moisture-status text based on moisture-bar value
    document.querySelectorAll('.moisture-bar-inner').forEach(el => {
        const width = parseInt(el.getAttribute('data-width'));
        const statusEl = el.parentElement.parentElement.querySelector('.moisture-status');
        if (width > 50) {
            statusEl.textContent = 'Wet';
            statusEl.classList.remove('dry');
            statusEl.classList.add('wet');
        } else {
            statusEl.textContent = 'Dry';
            statusEl.classList.remove('wet');
            statusEl.classList.add('dry');
        }
    });
    // Theme toggle button style
    document.querySelectorAll('.theme-toggle').forEach(btn => {
        btn.style.background = theme.headerBg;
        btn.style.color = theme.headerColor;
        btn.style.border = '2px solid ' + theme.cardBorder;
        btn.style.borderRadius = '4px';
        btn.style.padding = '0.5rem 1rem';
        btn.style.cursor = 'pointer';
        btn.style.fontSize = '1rem';
    });
    // Float and margin only for theme toggle button in header
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.style.float = 'right';
    themeBtn.style.marginTop = '-2.5rem';
    themeBtn.style.marginRight = '1rem';
}
let isDark = true;
toggleBtn.onclick = function () {
    isDark = !isDark;
    setTheme(isDark ? darkTheme : lightTheme);
    toggleBtn.textContent = isDark ? 'Light Mode' : 'Dark Mode';
};
// Set initial theme
setTheme(darkTheme);
