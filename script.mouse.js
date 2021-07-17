for (let item of items) {
  item.onmousedown = (e) => {
    e.preventDefault();
    reorderStart(e.target, e.clientY);
  };
}

document.onmousemove = (e) => reorderMove(e.clientY);

document.onmouseup = () => reorderEnd();