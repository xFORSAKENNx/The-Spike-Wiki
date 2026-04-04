// script.js
let players = [];
let currentOpenedPlayerIndex = null; // Guarda qual jogador está no modal

async function load() { 
    try {
        const res = await fetch('data.json');
        players = await res.json();
        renderGrid(players); // Renderiza a grade inicial
    } catch (error) {
        console.error("Erro ao carregar dados:", error);
    }
}

// 1. RENDERIZA APENAS A GRADE (Os cards pequenos)
function renderGrid(data) {
    const grid = document.getElementById('playerGrid');
    grid.innerHTML = "";

    const positions = ["WS", "MB", "SE"];
    const positionNames = {
        "WS": "WING SPIKER",
        "MB": "MIDDLE BLOCKER",
        "SE": "SETTER"
    };

    positions.forEach(pos => {
        const playersInPos = data.filter(p => p.position === pos);

        if (playersInPos.length > 0) {
            
            // 1. Cria o Cabeçalho da Seção
            const sectionHeader = document.createElement('div');
            sectionHeader.className = 'position-section';
            sectionHeader.innerHTML = `
                <div class="position-header">
                    <h2 class="position-title">${pos} <span style="font-size: 0.6em; color: var(--text-secondary); opacity: 0.7;">| ${positionNames[pos]}</span></h2>
                    <div class="position-line"></div>
                </div>
            `;
            grid.appendChild(sectionHeader);

            // 2. Cria os Cards dessa posição
            playersInPos.forEach(p => {
                // MUDANÇA 1: Agora busca por NOME e POSIÇÃO para diferenciar personagens repetidos (Ex: Sara)
                const originalIndex = players.findIndex(player => 
                    player.name === p.name && player.position === p.position
                );
                
                const card = document.createElement('div');
                card.className = 'player-card';
                card.onclick = () => openDetailsModal(originalIndex);

                card.innerHTML = `
                    <img src="${p.image_main}" class="player-img-main" alt="${p.name}">
                    <div style="padding: 15px">
                        <h2 style="margin:0">${p.name}</h2>
                        <p style="color:var(--accent-color); margin:0">${p.rank}</p>
                    </div>
                `;
                grid.appendChild(card);
            });
        }
    });
}

// 2. FUNÇÃO PARA ABRIR O MODAL E GERAR O CONTEÚDO AMPLIADO
function openDetailsModal(playerIndex) {
    const p = players[playerIndex];
    currentOpenedPlayerIndex = playerIndex; 
    const modal = document.getElementById('detailsModal');
    const body = document.getElementById('detailsBody');

    // MUDANÇA 2: Reseta o scroll do conteúdo do modal para o topo ao abrir
    const modalContent = modal.querySelector('.details-content');
    if (modalContent) modalContent.scrollTop = 0;

    // Lógica para os atributos
    const attributesHTML = p.atributes ? `
        <div class="attributes-grid">
            <div class="attr-item"><strong>ATQ:</strong> ${p.atributes.Attack || '--'}</div>
            <div class="attr-item"><strong>DEF:</strong> ${p.atributes.Defense || '--'}</div>
            <div class="attr-item"><strong>VEL:</strong> ${p.atributes.Velocity || '--'}</div>
            <div class="attr-item"><strong>SALTO:</strong> ${p.atributes.Salto || '--'}</div>
        </div>
    ` : '';

    // INJETA O CONTEÚDO AMPLIADO NO MODAL
    body.innerHTML = `
        <div class="modal-player-header">
            <img src="${p.image_main}" class="modal-player-img">
            <div>
                <h1 style="margin:0; color:var(--text-primary)">${p.name}</h1>
                <p style="color:var(--accent-color); margin:0; font-size:1.2em">${p.rank} | ${p.position}</p>
                <div class="info-row" style="margin-top:10px; gap: 15px; justify-content: flex-start;">
                    <span>Altura: ${p.height}</span>
                    <span>Nº Camisa: ${p.number}</span>
                </div>
            </div>
        </div>

        <div class="modal-main-content" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div>
                <h3>Resumo</h3>
                <p style="color:var(--text-secondary); line-height:1.6">${p.summary}</p>
                <p style="font-size: 1em; color: var(--text-primary);">
                    <strong>Aniversário:</strong> ${p.birthday || 'Não informado'}
                </p>
                <p style="text-align:center; font-style:italic; border-top:1px solid #333; padding-top:10px">"${p.phrase}"</p>
                
                ${attributesHTML}
                <img src="${p.image_status}" class="status-img" style="cursor:default">
            </div>

            <div>
                <h3>Habilidades</h3>
                <div style="background: #222; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                    ${p.skills.length > 0 ? p.skills.map(s => `
                        <div style="margin-bottom:8px;">
                            <strong style="color: var(--accent-color)">${s.name}:</strong> ${s.desc}
                        </div>
                    `).join('') : 'Nenhuma habilidade cadastrada.'}
                </div>

                <h3>Ascensão</h3>
                <div class="ascension-tabs">
                    ${[0,1,2,3,4,5].map(lv => `
                        <button class="asc-btn ${lv===0?'active':''}" onclick="updateAscensionInModal(${lv}, this)">${lv}</button>
                    `).join('')}
                </div>
                
                <div class="ascension-box" id="modal-asc-box" style="margin-bottom: 20px;">
                    <strong>Melhoria (Nível 0):</strong><br>
                    ${p.ascension_levels && p.ascension_levels[0] ? p.ascension_levels[0].upgrade_details : 'Base'}
                </div>
            </div>

            <div class="combos-section">
                <h3>Combinações</h3>
                <div class="combos-wrapper">
                    ${p.combos.length > 0 ? p.combos.map(combo => `
                        <div class="combo-item">
                            <strong style="color:var(--accent-color); font-size: 1.1em;">${combo.name}</strong>
                            <div class="team-simulation">
                                ${combo.team_images.map(img => `<img src="${img}" class="team-img">`).join('')}
                            </div>
                            <div style="font-size:0.95em; color: var(--text-secondary);">${combo.benefits}</div>
                        </div>
                    `).join('') : '<p style="color:var(--text-secondary)">Nenhuma combinação disponível.</p>'}
                </div>
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; 
}

// 3. FUNÇÕES DE FECHAR O MODAL
function closeDetailsModal(e) {
    if(e.target.classList.contains('details-overlay')) {
        forceCloseDetailsModal();
    }
}

function forceCloseDetailsModal() {
    const modal = document.getElementById('detailsModal');
    modal.classList.remove('active');
    document.body.style.overflow = ''; 
    currentOpenedPlayerIndex = null;
}

// 4. ATUALIZAR ASCENSÃO DENTRO DO MODAL
function updateAscensionInModal(level, btn) {
    const parent = btn.parentElement;
    parent.querySelectorAll('.asc-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const box = document.getElementById(`modal-asc-box`);
    
    const p = players[currentOpenedPlayerIndex];
    if (p.ascension_levels && p.ascension_levels[level]) {
        box.innerHTML = `<strong>Melhoria (Nível ${level}):</strong><br>${p.ascension_levels[level].upgrade_details}`;
    }
}

function filterPlayers() {
    const term = document.getElementById('searchBar').value.toUpperCase(); 
    const pos = document.getElementById('filterPosition').value;
    const rank = document.getElementById('filterRank').value;

    const filtered = players.filter(p => {
        const matchName = p.name.toUpperCase().includes(term); 
        const matchPos = (pos === 'ALL' || p.position === pos);
        const matchRank = (rank === 'ALL' || p.rank === rank);
        return matchName && matchPos && matchRank;
    });
    renderGrid(filtered); 
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        forceCloseDetailsModal();
        const imgModal = document.getElementById('imageModal');
        if(imgModal) imgModal.classList.remove('active');
    }
});

load();
