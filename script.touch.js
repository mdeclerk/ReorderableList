for (let item of items) {
  item.ontouchstart = (e) => {
    e.preventDefault();
    reorderStart(e.target, e.touches[0].clientY);
  };
}

document.ontouchmove = (e) => reorderMove(e.touches[0].clientY);

document.ontouchend = () => reorderEnd();