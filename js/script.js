const spinner = (remove, add) => {
  const spinnerBlink = document.getElementById('spinner-blink');
  spinnerBlink.classList.remove(remove);
  spinnerBlink.classList.add(add);
}

spinner(remove)