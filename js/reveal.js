console.log("script reveal.js is running ✅");

// https://developer.mozilla.org/fr/docs/Web/API/Intersection_Observer_API

const ratio = 0.1;

const options = {
    root: null,
    rootMargin: "0px",
    threshold: ratio,
};

function handleIntersect(entries, observer) {
    entries.forEach(function (entry) {
        // console.log(entry.target);
        if (entry.intersectionRatio > ratio) {
            // console.log('Visibilité =>', entry.insersectionRatio)
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
        } else {
            // console.log('Visibilité =>', entry.insersectionRatio)
        }
    });
    // console.log('handleIntersect');
}

const observer = new IntersectionObserver(handleIntersect, options);

document.querySelectorAll(".reveal").forEach(function (revealElmt) {
    observer.observe(revealElmt);
});
