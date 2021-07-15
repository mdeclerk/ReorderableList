const container = document.querySelector(".container");
let items = [...container.querySelectorAll(".item")];
let draggedItem = null;
let initialItemY = 0;
let initialClientY = 0;
let currentClientY = 0;

const getTranslateY = (item) =>
  parseFloat(item.style.transform.match(/-?\d+\.?\d*/)[0]);

const setTranslateY = (item, y) =>
  (item.style.transform = "translateY(" + y + "px)");

const getItemReferenceY = (item) => {
  if (item === draggedItem) return currentClientY - container.offsetTop;
  return getTranslateY(item) + item.offsetHeight / 2;
};

const sortItemsByReferenceY = () =>
  items.sort((a, b) => getItemReferenceY(a) - getItemReferenceY(b));

const layoutItems = () => {
  let y = 0;
  for (var item of items) {
    if (item !== draggedItem) setTranslateY(item, y);
    y += item.offsetHeight;
  }
};

const reorderstart = (item, clientY) => {
  draggedItem = item;
  draggedItem.classList.add("item-dragged");
  initialItemY = getTranslateY(draggedItem);
  currentClientY = clientY + window.scrollY;
  initialClientY = currentClientY;
};

const reordermove = (clientY) => {
  if (draggedItem === null) return;
  currentClientY = clientY + window.scrollY;
  const newY = initialItemY + (currentClientY - initialClientY);
  setTranslateY(draggedItem, newY);
  sortItemsByReferenceY();
  layoutItems();
};

const reorderend = () => {
  if (draggedItem === null) return;
  draggedItem.classList.remove("item-dragged");
  draggedItem = null;
  layoutItems();
};
