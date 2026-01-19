/**
 * Project Modal & Interaction Logic
 * Handles opening/closing of the "Quick View" modal.
 */

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('projectModal');
    if (!modal) return;

    const modalContent = document.getElementById('modalContent');
    const modalExpandBtn = document.getElementById('modalExpandBtn');
    const closeBtn = modal.querySelector('.project-modal__close');
    const backdrop = modal.querySelector('.project-modal__backdrop');

    // Open Modal
    function openModal(projectId) {
        const project = projectsData.find(p => p.id === projectId);
        if (!project) return;

        // Populate Content
        modalContent.innerHTML = `
            <div class="project-modal__header">
                <span class="project-modal__tagline">${project.tagline}</span>
                <h2 class="project-modal__title">${project.title}</h2>
                <div class="project-modal__brief">${project.brief}</div>
            </div>
            
            <div class="project-modal__grid">
                <div class="project-modal__section">
                    <h3 class="project-modal__section-title">Roles</h3>
                    <div class="project-modal__list">
                        ${project.roles.map(role => `
                            <div class="project-modal__list-item">${role}</div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="project-modal__section">
                    <h3 class="project-modal__section-title">Deliverables</h3>
                    <div class="project-modal__list">
                        ${project.deliverables.map(item => `
                            <div class="project-modal__list-item">${item}</div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        // Update Expand Button Link
        modalExpandBtn.setAttribute('href', `project.html?id=${project.id}`);

        // Handle Expand Button Click with Transition
        modalExpandBtn.onclick = (e) => {
            e.preventDefault();
            closeModal();
            // Small delay to allow modal close animation
            setTimeout(() => {
                navigateWithTransition(`project.html?id=${project.id}`);
            }, 300);
        };

        // Show Modal
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    // Close Modal
    function closeModal() {
        if (!modal) return;
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    // Attach Click Listeners to Project Cards
    document.querySelectorAll('.project-card[data-id]').forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor behavior if any
            const projectId = card.getAttribute('data-id');
            openModal(projectId);
        });
    });

    // Close Listeners
    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
            closeModal();
        }
    });
});
