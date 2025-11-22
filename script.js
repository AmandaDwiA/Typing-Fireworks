document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('fireworksInput');
    const particleContainer = document.getElementById('particleContainer');
    const PARTICLE_COUNT = 15; // Jumlah partikel per ketikan

    // Fungsi untuk mendapatkan posisi kursor dalam input field
    function getCursorPosition(input) {
        // Teks dummy untuk mengukur posisi kursor
        const tempSpan = document.createElement('span');
        tempSpan.style.visibility = 'hidden';
        tempSpan.style.position = 'absolute';
        tempSpan.style.fontSize = window.getComputedStyle(input).fontSize;
        tempSpan.style.fontFamily = window.getComputedStyle(input).fontFamily;
        tempSpan.style.whiteSpace = 'pre';
        
        // Ambil teks sebelum kursor
        const textBeforeCursor = input.value;
        tempSpan.textContent = textBeforeCursor;
        
        document.body.appendChild(tempSpan);
        
        const textWidth = tempSpan.offsetWidth;
        document.body.removeChild(tempSpan);
        
        const rect = input.getBoundingClientRect();
        
        // Hitung posisi x dan y
        const x = rect.left + textWidth + (input.offsetWidth - input.clientWidth) / 2;
        const y = rect.top + rect.height / 2;
        
        return { x, y };
    }

    // Fungsi untuk membuat dan meledakkan partikel
    function createFireworks(x, y) {
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Posisi awal (tengah kursor)
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            
            // Warna acak
            const hue = Math.floor(Math.random() * 360);
            particle.style.backgroundColor = `hsl(${hue}, 100%, 70%)`;

            // Hitung arah dan jarak acak untuk animasi CSS
            const angle = Math.random() * 2 * Math.PI; // Sudut acak
            const distance = Math.random() * 60 + 20; // Jarak acak
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance;

            // Setel variabel CSS untuk digunakan dalam @keyframes
            particle.style.setProperty('--dx', `${dx}px`);
            particle.style.setProperty('--dy', `${dy}px`);

            particleContainer.appendChild(particle);

            // Hapus partikel dari DOM setelah animasi selesai
            particle.addEventListener('animationend', () => {
                particle.remove();
            });
        }
    }

    // Event listener saat ada input (pengetikan)
    inputField.addEventListener('input', (event) => {
        // Hanya memicu jika ada karakter baru yang diketik (bukan dihapus)
        if (event.inputType === 'insertText' || event.inputType === 'insertCompositionText') {
            const pos = getCursorPosition(inputField);
            createFireworks(pos.x, pos.y);
        }
        // Anda bisa menambahkan logika untuk 'deleteContentBackward' jika ingin kembang api saat menghapus
    });
});