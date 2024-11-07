// الإشارة إلى العناصر الأساسية
const reviewsContainer = document.getElementById('reviews');
const addReviewBtn = document.getElementById('addReviewBtn');
const reviewModal = document.getElementById('reviewModal');
const closeModal = document.getElementById('closeModal');
const submitReviewBtn = document.getElementById('submitReview');

// تحميل التقييمات من Local Storage وعرضها بترتيب عكسي (الجديد أولاً)
function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviewsContainer.innerHTML = ''; // مسح التقييمات الحالية
    reviews.reverse().forEach(review => addReviewToDOM(review));
}

// إضافة التقييم إلى DOM
function addReviewToDOM(review) {
    const reviewDiv = document.createElement('div');
    reviewDiv.classList.add('review');
    reviewDiv.innerHTML = `
        <h4>${review.name}</h4>
        <span class="stars">${'★'.repeat(review.rating)}</span>
        <p>${review.comment}</p>
        <span>${review.date}</span>
    `;
    // إضافة التقييم في الأعلى لجعل التقييمات الجديدة تظهر أولاً
    reviewsContainer.prepend(reviewDiv);
}

// فتح المودال
addReviewBtn.addEventListener('click', () => {
    reviewModal.style.display = 'flex';
});

// غلق المودال
closeModal.addEventListener('click', () => {
    reviewModal.style.display = 'none';
});

// إضافة التقييم الجديد
submitReviewBtn.addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;
    const rating = document.getElementById('rating').value;
    const date = new Date().toLocaleString();

    if (name && comment && rating) {
        const review = { name, comment, rating: parseInt(rating), date };

        // تخزين التقييم في Local Storage
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviews.push(review);
        localStorage.setItem('reviews', JSON.stringify(reviews));

        // إضافة التقييم إلى DOM في الأعلى
        addReviewToDOM(review);

        // تنظيف النموذج وإخفاء المودال
        document.getElementById('name').value = '';
        document.getElementById('comment').value = '';
        document.getElementById('rating').value = '';
        reviewModal.style.display = 'none';
    } else {
        alert('الرجاء ملء جميع الحقول!');
    }
});

// تحميل التقييمات عند فتح الصفحة
document.addEventListener('DOMContentLoaded', loadReviews);
