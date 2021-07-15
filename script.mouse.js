for (let item of items) {
  item.onmousedown = (e) => {
    e.preventDefault();
    reorderstart(e.target);
  };
}

document.onmousemove = (e) => reordermove(e.clientY);

document.onmouseup = () => reorderend();