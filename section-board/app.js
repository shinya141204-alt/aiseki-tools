/**
 * Section Board Logic
 * 2026-01-24
 */

// --- Data Models ---

const initialStaff = [
    { id: 's1', name: '田中', role: 'LD', color: 'bg-red-500' },
    { id: 's2', name: '鈴木', role: 'Member', color: 'bg-blue-500' },
    { id: 's3', name: '佐藤', role: 'Member', color: 'bg-blue-500' },
    { id: 's4', name: '高橋', role: 'Sub', color: 'bg-indigo-500' },
    { id: 's5', name: '伊藤', role: 'Member', color: 'bg-blue-500' },
    { id: 's6', name: '渡辺', role: 'New', color: 'bg-green-500' },
    { id: 's7', name: '山本', role: 'Member', color: 'bg-blue-500' },
    { id: 's8', name: '中村', role: 'Member', color: 'bg-blue-500' },
    { id: 's9', name: '小林', role: 'Kitchen', color: 'bg-orange-500' },
    { id: 's10', name: '加藤', role: 'Kitchen', color: 'bg-orange-500' },
];

const initialSections = [
    // --- 3F ---
    { id: '3f-reception', name: '受付', floor: '3F', icon: 'fa-concierge-bell', color: 'text-rose-400' },
    { id: '3f-reception-sup', name: '受付サポ', floor: '3F', icon: 'fa-user-nurse', color: 'text-rose-300' },
    { id: '3f-cashier', name: '会計', floor: '3F', icon: 'fa-cash-register', color: 'text-yellow-400' },
    { id: '3f-hall-head', name: 'ホール頭', floor: '3F', icon: 'fa-user-tie', color: 'text-purple-500' },
    { id: '3f-guide', name: '案内専属', floor: '3F', icon: 'fa-person-walking-arrow-right', color: 'text-emerald-400' },
    // Floater 3F (3)
    { id: '3f-floater-1', name: '移動中間 1', floor: '3F', icon: 'fa-person-arrows-loop', color: 'text-slate-300' },
    { id: '3f-floater-2', name: '移動中間 2', floor: '3F', icon: 'fa-person-arrows-loop', color: 'text-slate-300' },
    { id: '3f-floater-3', name: '移動中間 3', floor: '3F', icon: 'fa-person-arrows-loop', color: 'text-slate-300' },

    { id: '3f-drinker', name: 'ドリンカー', floor: '3F', icon: 'fa-martini-glass', color: 'text-sky-400' },
    { id: '3f-drinker-sup', name: 'ドリンカーサポ', floor: '3F', icon: 'fa-glass-water', color: 'text-sky-300' },
    // Bussing 3F (3)
    { id: '3f-bussing-1', name: '配膳・バッシング 1', floor: '3F', icon: 'fa-utensils', color: 'text-orange-300' },
    { id: '3f-bussing-2', name: '配膳・バッシング 2', floor: '3F', icon: 'fa-utensils', color: 'text-orange-300' },
    { id: '3f-bussing-3', name: '配膳・バッシング 3', floor: '3F', icon: 'fa-utensils', color: 'text-orange-300' },

    { id: '3f-kitchen', name: 'キッチンメイン', floor: '3F', icon: 'fa-fire-burner', color: 'text-orange-500' },
    { id: '3f-kitchen-sup', name: 'キッチンサポ', floor: '3F', icon: 'fa-kitchen-set', color: 'text-orange-400' },
    { id: '3f-dish', name: '洗い場', floor: '3F', icon: 'fa-sink', color: 'text-blue-300' },
    // Catch 3F (3)
    { id: '3f-catch-1', name: 'キャッチ 1', floor: '3F', icon: 'fa-bullhorn', color: 'text-indigo-400' },
    { id: '3f-catch-2', name: 'キャッチ 2', floor: '3F', icon: 'fa-bullhorn', color: 'text-indigo-400' },
    { id: '3f-catch-3', name: 'キャッチ 3', floor: '3F', icon: 'fa-bullhorn', color: 'text-indigo-400' },

    // --- 2F ---
    { id: '2f-hall-sub', name: 'ホール頭補助', floor: '2F', icon: 'fa-user-shield', color: 'text-purple-400' },
    { id: '2f-vip', name: 'VIP案内', floor: '2F', icon: 'fa-crown', color: 'text-amber-400' },
    // Floater 2F (3)
    { id: '2f-floater-1', name: '移動中間 1', floor: '2F', icon: 'fa-person-arrows-loop', color: 'text-slate-300' },
    { id: '2f-floater-2', name: '移動中間 2', floor: '2F', icon: 'fa-person-arrows-loop', color: 'text-slate-300' },
    { id: '2f-floater-3', name: '移動中間 3', floor: '2F', icon: 'fa-person-arrows-loop', color: 'text-slate-300' },

    { id: '2f-drinker', name: 'ドリンカー', floor: '2F', icon: 'fa-martini-glass', color: 'text-sky-400' },
    // Bussing 2F (3)
    { id: '2f-bussing-1', name: '配膳・バッシング 1', floor: '2F', icon: 'fa-utensils', color: 'text-orange-300' },
    { id: '2f-bussing-2', name: '配膳・バッシング 2', floor: '2F', icon: 'fa-utensils', color: 'text-orange-300' },
    { id: '2f-bussing-3', name: '配膳・バッシング 3', floor: '2F', icon: 'fa-utensils', color: 'text-orange-300' },

    { id: '2f-dish', name: '洗い場', floor: '2F', icon: 'fa-sink', color: 'text-blue-300' },
];

// --- State ---
let staffList = [...initialStaff];

// --- Initialization ---

document.addEventListener('DOMContentLoaded', () => {
    renderStaffPool();
    renderSections();
    initSortables();
    startClock();

    // Form Handler
    document.getElementById('addStaffForm').addEventListener('submit', handleAddStaff);
});

// --- Rendering ---

function renderStaffPool() {
    const container = document.getElementById('staffPool');
    container.innerHTML = ''; // Clear

    staffList.forEach(staff => {
        const el = createStaffElement(staff);
        container.appendChild(el);
    });

    updateStaffCount();
}

function createStaffElement(staff) {
    const el = document.createElement('div');
    el.className = 'staff-card bg-slate-700/50 hover:bg-slate-700 border border-slate-600/50 p-2 rounded-lg flex items-center justify-between text-white shadow-sm group select-none relative pr-8';
    el.setAttribute('data-id', staff.id);

    el.innerHTML = `
        <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full ${staff.color || 'bg-slate-500'} flex items-center justify-center text-[10px] font-bold shadow-lg shadow-black/20">
                ${staff.name.charAt(0)}
            </div>
            <div>
                <p class="font-medium text-sm leading-tight">${staff.name}</p>
                <p class="text-[10px] text-slate-400 leading-tight">${staff.role}</p>
            </div>
        </div>
        <div class="flex items-center gap-2">
            <i class="fa-solid fa-grip-vertical text-slate-600 group-hover:text-slate-400"></i>
        </div>
        <button class="delete-btn absolute right-2 top-1/2 -translate-y-1/2 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-1" title="Delete">
            <i class="fa-solid fa-trash-can"></i>
        </button>
    `;

    // Delete Event
    const deleteBtn = el.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent drag start interference? Sortable handles drags via listener on parent usually, but safer.
        handleDeleteStaff(staff.id, el);
    });

    return el;
}

function handleDeleteStaff(id, element) {
    if (!confirm('Delete this staff member?')) return;

    // Remove from List (if present)
    const idx = staffList.findIndex(s => s.id === id);
    if (idx > -1) staffList.splice(idx, 1);

    // Remove from DOM
    element.remove();

    updateCounts();
    updateStaffCount(); // Update total count if tracking
}

function renderSections() {
    const grid = document.getElementById('sectionsGrid');
    grid.innerHTML = '';

    // Group by Floor
    const floors = { '3F': [], '2F': [] };
    initialSections.forEach(sec => {
        if (floors[sec.floor]) floors[sec.floor].push(sec);
    });

    Object.keys(floors).forEach(floorName => {
        // Floor Header
        const header = document.createElement('div');
        header.className = 'col-span-full mt-6 mb-2 border-b border-white/10 pb-2 flex items-center gap-2';
        header.innerHTML = `
            <h2 class="text-xl font-bold text-slate-300">${floorName} Floor</h2>
            <div class="text-[10px] bg-white/10 px-2 py-0.5 rounded text-slate-400">${floors[floorName].length} Sections</div>
        `;
        grid.appendChild(header);

        // Sections
        floors[floorName].forEach(sec => {
            const card = document.createElement('div');
            card.className = 'glass-panel section-card rounded-xl overflow-hidden flex flex-col h-48 border-t-2 border-t-transparent hover:border-t-brand-500';

            card.innerHTML = `
                <div class="p-2 border-b border-white/5 bg-black/20 flex justify-between items-center">
                    <div class="flex items-center gap-2 min-w-0">
                        <i class="fa-solid ${sec.icon} ${sec.color}"></i>
                        <h3 class="font-bold text-slate-200 tracking-wide shadow-black drop-shadow-md truncate text-xs sm:text-sm" title="${sec.name}">${sec.name}</h3>
                    </div>
                    <span class="staff-count text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/50 shrink-0">0</span>
                </div>
                <div class="section-drop-zone flex-1 p-2 overflow-y-auto space-y-1 bg-gradient-to-b from-transparent to-black/10" id="sec-${sec.id}" data-section-id="${sec.id}">
                    <!-- Droppable Area -->
                </div>
            `;
            grid.appendChild(card);
        });
    });
}

// --- Logic ---

function initSortables() {
    // 1. Staff Pool
    const pool = document.getElementById('staffPool');
    new Sortable(pool, {
        group: 'shared', // Allow dragging between lists
        animation: 150,
        ghostClass: 'sortable-ghost',
        dragClass: 'sortable-drag',
        onEnd: updateCounts
    });

    // 2. All Sections
    const sections = document.querySelectorAll('.section-drop-zone');
    sections.forEach(sec => {
        new Sortable(sec, {
            group: 'shared',
            animation: 150,
            ghostClass: 'sortable-ghost',
            dragClass: 'sortable-drag',
            onAdd: (evt) => {
                // Optional: Flash effect or logic when item added
                updateCounts();
            },
            onRemove: updateCounts
        });
    });
}

function updateCounts() {
    // Staff Pool Count
    const poolCount = document.getElementById('staffPool').children.length;
    document.getElementById('staffCount').innerText = poolCount;

    // Sections Count
    document.querySelectorAll('.section-card').forEach(card => {
        const zone = card.querySelector('.section-drop-zone');
        const count = zone.children.length;
        const badge = card.querySelector('.staff-count');

        badge.innerText = count;

        // Active state styling
        if (count > 0) {
            badge.classList.remove('text-white/50', 'bg-white/10');
            badge.classList.add('text-white', 'bg-brand-500');
        } else {
            badge.classList.add('text-white/50', 'bg-white/10');
            badge.classList.remove('text-white', 'bg-brand-500');
        }
    });
}

function updateStaffCount() {
    document.getElementById('staffCount').innerText = staffList.length;
}

function handleAddStaff(e) {
    e.preventDefault();
    const input = document.getElementById('newStaffName');
    const name = input.value.trim();
    if (!name) return;

    const newPerson = {
        id: 's' + Date.now(),
        name: name,
        role: 'Helper',
        color: 'bg-teal-500'
    };

    staffList.push(newPerson);

    // Add to DOM directly instead of re-rendering all (to preserve drag state)
    const el = createStaffElement(newPerson);
    document.getElementById('staffPool').appendChild(el);
    input.value = '';

    // Update Count
    updateCounts();
}

function resetBoard() {
    if (!confirm('Reset all assignments?')) return;

    // Move all elements back to pool
    const pool = document.getElementById('staffPool');
    const zones = document.querySelectorAll('.section-drop-zone');

    zones.forEach(zone => {
        while (zone.firstChild) {
            pool.appendChild(zone.firstChild);
        }
    });
    updateCounts();
}

function startClock() {
    const el = document.getElementById('currentTime');
    const update = () => {
        const now = new Date();
        el.innerText = now.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
    };
    update();
    setInterval(update, 1000);
}
