document.addEventListener('DOMContentLoaded', () => {
    if (window.AOS) {
        AOS.init({ once: false, duration: 1000, easing: 'ease-out-cubic', offset: 180, mirror: true });
        window.addEventListener('load', () => AOS.refreshHard());
    }

    const revealItems = [...document.querySelectorAll('.reveal-side')];
    const updateReveals = () => {
        revealItems.forEach((item) => {
            const rect = item.getBoundingClientRect();
            const visible = rect.top < window.innerHeight * 0.88 && rect.bottom > 80;
            item.classList.toggle('is-visible', visible);
        });
    };
    if (revealItems.length) {
        window.addEventListener('scroll', updateReveals, { passive: true });
        window.addEventListener('resize', updateReveals);
        window.addEventListener('load', () => setTimeout(updateReveals, 250));
        setTimeout(updateReveals, 250);
    }

    const nav = document.getElementById('mainNav');
    document.querySelectorAll('#mainNav a').forEach((link) => {
        link.addEventListener('click', () => {
            const instance = bootstrap.Collapse.getInstance(nav);
            if (instance) instance.hide();
        });
    });

    document.querySelector('.subscribe-form')?.addEventListener('submit', (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const input = form.querySelector('input');
        if (!input.checkValidity()) {
            input.reportValidity();
            return;
        }
        form.classList.add('submitted');
        form.querySelector('button').textContent = 'Thank you!';
        input.disabled = true;
    });
});
