// script.js

// Particles Animation
function createParticles() {
    const particles = document.querySelector('.particles');
    if (!particles) return;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particles.appendChild(particle);
    }
}

// Loading Animation
function showLoading(element, text = 'กำลังโหลด') {
    element.textContent = text;
    element.classList.add('loading-dots');
}

function hideLoading(element, text) {
    element.textContent = text;
    element.classList.remove('loading-dots');
}

// Login Animation
function loginWithGoogle() {
    const button = document.querySelector('button');
    const originalText = button.innerHTML;
    
    showLoading(button, 'กำลังเข้าสู่ระบบ');
    
    setTimeout(() => {
        hideLoading(button, originalText);
        window.location.href = 'main.html';
    }, 2000);
}

// Chat Functionality
function initChat() {
    const chatContainer = document.getElementById('chat-container');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    if (!chatContainer || !messageInput || !sendButton) return;

    const mockResponses = [
        'ฉันเข้าใจคำถามของคุณแล้ว กำลังค้นหาข้อมูลที่เกี่ยวข้อง...',
        'ขอบคุณที่ถามคำถามนี้ ฉันยินดีช่วยคุณค้นหาคำตอบ',
        'นี่เป็นคำถามที่น่าสนใจมาก ฉันจะช่วยอธิบายให้เข้าใจง่ายๆ',
        'ฉันมีข้อมูลที่เกี่ยวข้องกับคำถามของคุณ ลองดูข้อมูลนี้นะคะ'
    ];

    function addMessage(text, type) {
        const messageDiv = document.createElement('div');
// script.js (ต่อ)
messageDiv.className = `chat-message ${type}-message animate__animated animate__fadeIn`;
messageDiv.textContent = text;
chatContainer.appendChild(messageDiv);
chatContainer.scrollTop = chatContainer.scrollHeight;

// Add typing animation for bot responses
if (type === 'bot') {
    messageDiv.classList.add('typing-animation');
}
}

sendButton.addEventListener('click', () => {
const message = messageInput.value.trim();
if (message) {
    // Add user message
    addMessage(message, 'user');
    messageInput.value = '';

    // Simulate bot typing
    setTimeout(() => {
        const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
        addMessage(randomResponse, 'bot');
    }, 1000);
}
});

messageInput.addEventListener('keypress', (e) => {
if (e.key === 'Enter') {
    sendButton.click();
}
});

// Add some initial suggestions
const suggestions = [
'ขอคำแนะนำเรื่องการลงทะเบียน',
'อยากทราบเรื่องทุนการศึกษา',
'มีปัญหาเรื่องการเรียนออนไลน์',
'ต้องการติดต่ออาจารย์ที่ปรึกษา'
];

const suggestionsContainer = document.createElement('div');
suggestionsContainer.className = 'flex flex-wrap gap-2 mt-4';
suggestions.forEach(suggestion => {
const chip = document.createElement('button');
chip.className = 'bg-gray-700/50 text-white px-4 py-2 rounded-full text-sm hover:bg-yellow-400 hover:text-gray-900 transition-colors duration-300';
chip.textContent = suggestion;
chip.onclick = () => {
    messageInput.value = suggestion;
    sendButton.click();
};
suggestionsContainer.appendChild(chip);
});
chatContainer.appendChild(suggestionsContainer);
}

// Parking System
function initParking() {
const parkingContainer = document.getElementById('parking-container');
if (!parkingContainer) return;

const buildings = [
{ id: 'IT', name: 'อาคารคณะวิทยาการสารสนเทศ', spots: 30 },
{ id: 'SC', name: 'อาคารคณะวิทยาศาสตร์', spots: 25 },
{ id: 'EN', name: 'อาคารคณะวิศวกรรมศาสตร์', spots: 35 },
{ id: 'BA', name: 'อาคารคณะการบัญชีและการจัดการ', spots: 40 }
];

buildings.forEach(building => {
const buildingDiv = document.createElement('div');
buildingDiv.className = 'bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 mb-6 animate__animated animate__fadeIn';

const header = document.createElement('div');
header.className = 'flex justify-between items-center mb-4';
header.innerHTML = `
    <div>
        <h3 class="text-xl font-semibold text-white">${building.name}</h3>
        <p class="text-gray-400">รหัสอาคาร: ${building.id}</p>
    </div>
    <div class="text-right">
        <p class="text-lg font-semibold text-green-400">ว่าง: <span id="${building.id}-available">20</span> คัน</p>
        <p class="text-sm text-gray-400">ทั้งหมด: ${building.spots} คัน</p>
    </div>
`;
buildingDiv.appendChild(header);

const spotsGrid = document.createElement('div');
spotsGrid.className = 'grid grid-cols-5 gap-4';

for (let i = 1; i <= building.spots; i++) {
    const isAvailable = Math.random() > 0.3;
    const spot = document.createElement('div');
    spot.className = `parking-spot ${isAvailable ? 'available' : 'occupied'}`;
    spot.innerHTML = `
        <span class="text-lg font-semibold">${building.id}-${i}</span>
        <span class="text-sm">${isAvailable ? 'ว่าง' : 'ไม่ว่าง'}</span>
    `;

    if (isAvailable) {
        spot.addEventListener('click', () => reserveSpot(spot, building.id, i));
    }

    spotsGrid.appendChild(spot);
}

buildingDiv.appendChild(spotsGrid);
parkingContainer.appendChild(buildingDiv);
updateAvailableSpots(building.id);
});
}

function reserveSpot(spotElement, buildingId, spotNumber) {
if (confirm(`ยืนยันการจองที่จอดรถ ${buildingId}-${spotNumber}?`)) {
spotElement.className = 'parking-spot occupied';
spotElement.querySelector('span:last-child').textContent = 'ไม่ว่าง';
updateAvailableSpots(buildingId);

// Show success notification
showNotification('จองที่จอดรถเรียบร้อยแล้ว', 'success');
}
}

function updateAvailableSpots(buildingId) {
const availableSpots = document.querySelectorAll(`#${buildingId}-container .parking-spot.available`).length;
document.getElementById(`${buildingId}-available`).textContent = availableSpots;
}

// Notification System
function showNotification(message, type = 'success') {
const notification = document.createElement('div');
notification.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg animate__animated animate__fadeInUp ${
type === 'success' ? 'bg-green-500' : 'bg-red-500'
} text-white`;
notification.textContent = message;

document.body.appendChild(notification);

setTimeout(() => {
notification.classList.replace('animate__fadeInUp', 'animate__fadeOutDown');
setTimeout(() => notification.remove(), 1000);
}, 3000);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
createParticles();

// Initialize features based on current page
const path = window.location.pathname;
if (path.includes('ai-chat.html')) {
initChat();
} else if (path.includes('parking.html')) {
initParking();
}
});