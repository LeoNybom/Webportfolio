// Filtrerar projektkorten utifrån vald knapp (data-filter) och kortens data-category
const filterButtons = document.querySelectorAll(".filter-btn");
const projectItems = document.querySelectorAll(".projectitem");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        filterButtons.forEach(b => b.classList.remove("active"));
        button.classList.add("active");

        projectItems.forEach(item => {
            const show = filter === "alla" || item.dataset.category === filter;
            item.classList.toggle("hidden", !show);
        });
    });
});
