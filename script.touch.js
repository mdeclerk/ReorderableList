for (let item of items) {
  item.ontouchstart = (e) => {
    e.preventDefault();
    reorderstart(e.target);
  };
}

document.ontouchmove = (e) => reordermove(e.touches[0].clientY);

document.ontouchend = () => reorderend();