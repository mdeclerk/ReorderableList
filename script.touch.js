items.forEach((item) => {
    item.ontouchstart = (e) => {
      e.preventDefault();
      reorderstart(e.target, e.touches[0].clientY);
    };
  });

document.ontouchmove = (e) => reordermove(e.touches[0].clientY);

document.ontouchend = () => reorderend();