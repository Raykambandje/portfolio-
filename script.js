// Menu Burger
document.querySelector('.menu').addEventListener('click', function() {
    document.querySelector('.navbar').classList.toggle('show');
});
// Scroll Up Button
window.addEventListener('scroll', function() {
    document.getElementById('scrollUp').style.display = window.scrollY > 300 ? 'block' : 'none';
});
document.getElementById('scrollUp').addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});