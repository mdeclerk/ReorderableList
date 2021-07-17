const container = document.querySelector(".container");
let items = [...container.querySelectorAll(".item")];

let candidateItem = null;
let selectedItem = null;
let draggedItem = null;

let initialItemY = 0;
let initialClientY = 0;
let currentClientY = 0;

const getTranslateY = (item) =>
  parseFloat(item.style.transform.match(/-?\d+\.?\d*/)[0]);

const setTranslateY = (item, y) =>
  (item.style.transform = `translateY(${y}px)`);

const sortItemsByY = () => {
  const calcReferenceY = (item) => {
    if (item === draggedItem) return currentClientY - container.offsetTop;
    return getTranslateY(item) + item.offsetHeight / 2;
  };
  items.sort((a, b) => calcReferenceY(a) - calcReferenceY(b));
}

const layoutItems = () => items.reduce((y, item) => {
  if (item !== draggedItem) setTranslateY(item, y);
  return y + item.offsetHeight;
}, 0);

const reorderStart = (item, clientY) => {
  candidateItem = item;
  initialItemY = getTranslateY(item);
  initialClientY = clientY + window.scrollY;
}

const reorderMove = (clientY) => {
  if (candidateItem) { //start dragging
    draggedItem = candidateItem;
    draggedItem.classList.add("item-dragged");
    candidateItem = null;
  }
  if (draggedItem) { //dragging
    currentClientY = clientY + window.scrollY;
    const newY = initialItemY + (currentClientY - initialClientY);
    setTranslateY(draggedItem, newY);
    sortItemsByY();
    layoutItems();
  }
};

const reorderEnd = () => {
  if (candidateItem) { //click event
    if (selectedItem) selectedItem.classList.remove("item-selected");
    selectedItem = candidateItem;
    selectedItem.classList.add("item-selected");
    candidateItem = null;
  }
  if (draggedItem) { //stop dragging
    draggedItem.classList.remove("item-dragged");
    draggedItem = null;
    layoutItems();
  }
};
