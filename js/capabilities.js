// Open an existing native disclosure when navigating to its material comparison.
function revealMaterialComparison() {
  const target = document.getElementById(location.hash.slice(1));
  if (target?.matches('details.cap-materials')) target.open = true;
}
document.querySelectorAll('.cap-material-jump').forEach(link => {
  link.addEventListener('click', () => {
    const target = document.getElementById(link.hash.slice(1));
    if (target) target.open = true;
  });
});
window.addEventListener('hashchange', revealMaterialComparison);
revealMaterialComparison();
