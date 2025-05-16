document.addEventListener("DOMContentLoaded", function() {
    // Table sorting
    const table = document.querySelector(".alert-table");
    if (table) {
        const headers = table.querySelectorAll("th");
        headers.forEach((header, index) => {
            header.addEventListener("click", () => {
                const rows = Array.from(table.querySelectorAll("tbody tr"));
                const isAscending = header.classList.toggle("asc");
                headers.forEach(h => h.classList.remove("asc", "desc"));
                header.classList.add(isAscending ? "asc" : "desc");

                rows.sort((a, b) => {
                    let aText = a.children[index].textContent.trim();
                    let bText = b.children[index].textContent.trim();
                    if (index === 3) { // Severity column
                        aText = parseInt(aText) || 0;
                        bText = parseInt(bText) || 0;
                        return isAscending ? aText - bText : bText - aText;
                    } else if (index === 0) { // Timestamp column
                        aText = new Date(aText).getTime();
                        bText = new Date(bText).getTime();
                        return isAscending ? aText - bText : bText - aText;
                    }
                    return isAscending
                        ? aText.localeCompare(bText)
                        : bText.localeCompare(aText);
                });

                const tbody = table.querySelector("tbody");
                tbody.innerHTML = "";
                rows.forEach(row => tbody.appendChild(row));
            });
        });
    }

    // Modal functions
    window.showModal = function(data) {
        const modal = document.getElementById("alert-modal");
        const modalBody = document.getElementById("modal-body");
        const alertData = JSON.parse(data);
        modalBody.innerHTML = `
            <p><strong>Timestamp:</strong> ${alertData.timestamp}</p>
            <p><strong>Description:</strong> ${alertData.rule_description}</p>
            <p><strong>Agent:</strong> ${alertData.agent_name}</p>
            <p><strong>Severity:</strong> ${alertData.level}</p>
            <p><strong>Category:</strong> ${alertData.severity_category}</p>
        `;
        modal.style.display = "block";
    };

    window.closeModal = function() {
        const modal = document.getElementById("alert-modal");
        modal.style.display = "none";
    };

    // Close modal when clicking outside
    window.onclick = function(event) {
        const modal = document.getElementById("alert-modal");
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
});