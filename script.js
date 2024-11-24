const slider = document.getElementById('slider');
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;

// Add event listeners for drag
slider.addEventListener('mousedown', dragStart);
slider.addEventListener('mouseup', dragEnd);
slider.addEventListener('mouseleave', dragEnd);
slider.addEventListener('mousemove', dragMove);

// For touch devices
slider.addEventListener('touchstart', dragStart);
slider.addEventListener('touchend', dragEnd);
slider.addEventListener('touchmove', dragMove);

function dragStart(e) {
  isDragging = true;
  startPos = getPositionX(e);
  animationID = requestAnimationFrame(animation);
  slider.style.cursor = 'grabbing';
}

function dragMove(e) {
  if (isDragging) {
    const currentPosition = getPositionX(e);
    currentTranslate = prevTranslate + currentPosition - startPos;
  }
}

function dragEnd() {
  isDragging = false;
  cancelAnimationFrame(animationID);
  prevTranslate = currentTranslate;
  slider.style.cursor = 'grab';
}

function getPositionX(event) {
  return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function animation() {
  slider.style.transform = `translateX(${currentTranslate}px)`;
  if (isDragging) requestAnimationFrame(animation);
}
