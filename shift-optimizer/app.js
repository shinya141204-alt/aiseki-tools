/**
 * Shift Optimizer Logic
 * 2026-01 Phase 1
 */

// --- Constants & Config ---
const CONFIG = {
    holidays2026: ['2026-01-01', '2026-01-12', '2026-02-11', '2026-02-23'], // Simplified
    weekdays: ['月', '火', '水', '木', '金', '土', '日']
};

// --- State Management ---
const state = {
    settings: {
        baseRate: 1160,
        nightRate: 1450,
        normalStart: '19:00',
        normalEnd: '27:00', // 03:00 next day
        weekendStart: '18:00',
        weekendEnd: '29:00', // 05:00 next day
    },
    target: {
        amount: 100000,
        current: 0,
        isSectionRelease: false
    },
    currentMonth: {
        year: 2026,
        month: 0 // 0-indexed (Jan = 0)
    },
    days: [], // Array of Day objects
    selectedDayId: null // For modal
};

// --- Core Classes ---

class TimeUtils {
    // Convert "HH:MM" (including >24:00) to float hours
    static toFloat(timeStr) {
        if (!timeStr) return 0;
        const [h, m] = timeStr.split(':').map(Number);
        return h + m / 60;
    }

    // Parse "HH:MM" to minutes from start of day (0-~3000)
    static toMinutes(timeStr) {
        const [h, m] = timeStr.split(':').map(Number);
        return h * 60 + m;
    }

    // Format minutes to "HH:MM"
    static toTimeStr(minutes) {
        let h = Math.floor(minutes / 60);
        let m = minutes % 60;
        return `${h}:${m.toString().padStart(2, '0')}`;
    }

    // Get duration in hours between two times (handling > 24)
    static getDuration(start, end) {
        let s = this.toMinutes(start);
        let e = this.toMinutes(end);
        if (e < s) e += 24 * 60; // Handle wrap only if strictly smaller logic used improperly, but we use >24 notations
        return (e - s) / 60;
    }
}

class WageCalculator {
    static calculate(dateObj, settings, isSectionRelease) {
        // Determine rates based on day type
        // Day Type Logic:
        // - Friday, Saturday = Weekend
        // - Special Day = Weekend
        // - Holiday Eve = Weekend (Simple check: if next day is holiday. For now, manual special day is safer per spec)
        
        const isWeekendLogic = (dateObj.dayOfWeek === 5 || dateObj.dayOfWeek === 6 || dateObj.isSpecial);
        
        const shiftStart = dateObj.customStart || (isWeekendLogic ? settings.weekendStart : settings.normalStart);
        const shiftEnd = dateObj.customEnd || (isWeekendLogic ? settings.weekendEnd : settings.normalEnd);

        // Normalize times for calculation (minutes)
        // We treat everything as relative to 0 being 00:00 of the shift day.
        // e.g. 19:00 = 1140, 27:00 (3am) = 1620
        // Night Time: 22:00 (1320) to 29:00 (1740) (5am next day)
        
        let startMin = TimeUtils.toMinutes(shiftStart);
        let endMin = TimeUtils.toMinutes(shiftEnd);
        
        // Handle input like "03:00" meaning 27:00 if it's smaller than start
        if (endMin < startMin) endMin += 24 * 60;

        let totalPay = 0;
        const totalHours = (endMin - startMin) / 60;

        // --- Calculation Logic ---

        if (isSectionRelease && isWeekendLogic) {
            // Section Release Special Logic (Weekend/Special Only)
            // ~22:00: 1200
            // 22:00~26:00: 1600
            // 26:00~: 1500

            const t22 = 22 * 60; // 1320
            const t26 = 26 * 60; // 1560

            // Segment 1: Start to 22:00
            if (startMin < t22) {
                const segEnd = Math.min(endMin, t22);
                totalPay += ((segEnd - startMin) / 60) * 1200;
            }

            // Segment 2: 22:00 to 26:00
            if (endMin > t22 && startMin < t26) {
                const segStart = Math.max(startMin, t22);
                const segEnd = Math.min(endMin, t26);
                totalPay += ((segEnd - segStart) / 60) * 1600;
            }

            // Segment 3: 26:00 to End
            if (endMin > t26) {
                const segStart = Math.max(startMin, t26);
                totalPay += ((endMin - segStart) / 60) * 1500;
            }

        } else {
            // Standard Logic
            // Base: All time
            // Night Bonus: 22:00 (1320) ~ 29:00 (1740) (5am next day)
            // Actually spec: Night Rate (1450) REPLACES Base Rate during night? 
            // "Normal 1160, Night 1450". Usually means replacement.
            
            const nightStart = 22 * 60; // 1320
            const nightEnd = 29 * 60;   // 05:00 next day (1740)

            // Split into Normal and Night segments
            // We iterate minute by minute? No, algebra.
            
            // Intersection of [start, end] and [nightStart, nightEnd]
            const nS = Math.max(startMin, nightStart);
            const nE = Math.min(endMin, nightEnd);
            
            let nightMinutes = 0;
            if (nS < nE) {
                nightMinutes = nE - nS;
            }
            
            const totalMinutes = endMin - startMin;
            const normalMinutes = totalMinutes - nightMinutes;

            totalPay += (normalMinutes / 60) * settings.baseRate;
            totalPay += (nightMinutes / 60) * settings.nightRate;
        }

        return {
            pay: Math.floor(totalPay), // Round down per standard
            hours: totalHours.toFixed(1),
            isWeekend: isWeekendLogic
        };
    }
}

// --- App Controller ---

function init() {
    initCalendar(state.currentMonth.year, state.currentMonth.month);
    setupEventListeners();
    updateUI();
}

function initCalendar(year, month) {
    const dates = [];
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let d = 1; d <= daysInMonth; d++) {
        const dateObj = new Date(year, month, d);
        const dayOfWeek = dateObj.getDay(); // 0=Sun, 6=Sat
        const dayKey = `${year}-${(month+1).toString().padStart(2,'0')}-${d.toString().padStart(2,'0')}`;
        
        // Auto-detect Holidays (Simple implementation)
        const isPublicHoliday = CONFIG.holidays2026.includes(dayKey);

        dates.push({
            id: dayKey,
            date: d,
            dayOfWeek: (dayOfWeek === 0) ? 6 : dayOfWeek - 1, // Shift to 0=Mon, 6=Sun for loop convenience
            nativeDay: dayOfWeek, // 0=Sun
            isHoliday: isPublicHoliday,
            isSpecial: isPublicHoliday, // Default special if holiday
            customStart: null,
            customEnd: null,
            isSelected: false,
            // Computed later
            potentialPay: 0,
            potentialHours: 0
        });
    }
    state.days = dates;
    renderCalendar();
}

function renderCalendar() {
    const grid = document.getElementById('calendarGrid');
    grid.innerHTML = ''; // Clear

    // Add empty cells for start of month offset
    const firstDay = new Date(state.currentMonth.year, state.currentMonth.month, 1).getDay(); // 0=Sun
    // We want Mon=0. 
    // Sun(0)->6, Mon(1)->0
    const offset = (firstDay === 0) ? 6 : firstDay - 1;

    for(let i=0; i<offset; i++) {
        const spacer = document.createElement('div');
        spacer.className = 'bg-slate-50/30 border border-slate-50'; // Invisible spacer
        grid.appendChild(spacer);
    }

    state.days.forEach(day => {
        const el = document.createElement('div');
        el.className = `date-cell relative p-1 h-20 border border-slate-100 bg-white hover:bg-slate-50 transition cursor-pointer flex flex-col items-center justify-between group select-none`;
        
        // Color logic
        // Sun/Hol: Red text, Sat: Blue text
        let dayClass = "text-slate-600";
        if (day.nativeDay === 0 || day.isHoliday) dayClass = "text-red-500 font-bold";
        else if (day.nativeDay === 6) dayClass = "text-blue-500 font-bold";

        // Special Day Background
        if (day.isSpecial) el.classList.add('bg-green-50/50');
        if (day.isSelected) {
            el.classList.add('ring-2', 'ring-brand-500', 'z-10');
            el.classList.remove('border-slate-100');
        }

        // Content
        el.innerHTML = `
            <span class="text-xs ${dayClass}">${day.date}</span>
            <div class="text-[10px] text-slate-400 w-full text-center">
                ${day.isSelected ? `<span class="font-bold text-brand-600">¥${(day.potentialPay/1000).toFixed(1)}k</span>` : '-'}
            </div>
            ${day.customStart ? '<div class="w-1.5 h-1.5 rounded-full bg-orange-400"></div>' : ''}
        `;

        // Click Handler
        el.addEventListener('click', () => handleDayClick(day));
        
        grid.appendChild(el);
    });
}

function handleDayClick(day) {
    const mode = document.getElementById('modeSpecial').classList.contains('bg-white') ? 'special' : 'select'; // Crude check

    if (mode === 'special') {
        // Toggle Special Status
        day.isSpecial = !day.isSpecial;
        renderCalendar(); // Re-render to show green bg
        calculateDraft(); // Recalc amounts
    } else {
        // Selection Logic? Or Modal?
        // Spec says "Button: Time Individual Change". 
        // Maybe default click is "Toggle Selection" for optimization?
        // Actually optimization is AUTO. 
        // "User selects candidates"? Or "Auto calculate from ALL days"?
        // Spec: "Select candidate dates... sort by daily wage... fill until target."
        // So user probably doesn't manually select *shifts* one by one, but maybe *unavailable* days.
        // Let's assume click opens Modal Config for that day.
        
        openTimeModal(day);
    }
}

function calculateDraft(runOptimization = false) {
    // 1. Calculate Potential Wage for ALL days
    state.days.forEach(day => {
        // Parse settings (can change anytime)
        const res = WageCalculator.calculate(
            { dayOfWeek: day.nativeDay, isSpecial: day.isSpecial, customStart: day.customStart, customEnd: day.customEnd },
            state.settings,
            state.target.isSectionRelease
        );
        day.potentialPay = res.pay;
        day.potentialHours = res.hours;
        day.isWeekendRating = res.isWeekend;
    });

    if (runOptimization) {
        runOptimizer();
    }
}

function runOptimizer() {
    // Reset selections
    state.days.forEach(d => d.isSelected = false);

    const targetNeeded = state.target.amount - state.target.current;
    if (targetNeeded <= 0) {
        updateResults(0, 0, []);
        return;
    }

    // Sort days by wage (High to Low)
    // Filter out days marked as "Holiday/No Work" (if we add that feature)
    const candidates = [...state.days].sort((a, b) => b.potentialPay - a.potentialPay);

    let currentSum = 0;
    let selectedCount = 0;
    const selectedDays = [];

    for (const day of candidates) {
        if (currentSum >= targetNeeded) break;
        if (day.potentialPay > 0) {
            day.isSelected = true;
            currentSum += day.potentialPay;
            selectedCount++;
            selectedDays.push(day);
        }
    }

    // Constraints Check (Weekend %)
    // "Selected Weekend/Special Days" / "Total Weekend/Special Days in Month" >= 50%
    const totalWeekends = state.days.filter(d => (d.nativeDay === 5 || d.nativeDay === 6 || d.isSpecial)).length;
    const selectedWeekends = selectedDays.filter(d => (d.nativeDay === 5 || d.nativeDay === 6 || d.isSpecial)).length;
    
    const weekendRatio = totalWeekends > 0 ? (selectedWeekends / totalWeekends) : 1;
    const alertSection = (state.target.isSectionRelease && weekendRatio < 0.5);

    // Update UI
    renderCalendar(); // To show selection rings
    updateResults(currentSum + parseInt(state.target.current), selectedCount, selectedDays, alertSection, selectedWeekends, totalWeekends);
}

// --- UI Handlers ---

function setupEventListeners() {
    // Settings Toggle
    const p = document.getElementById('settingsPanel');
    document.getElementById('settingsToggle').addEventListener('click', () => {
        p.classList.toggle('hidden');
    });

    // Save Settings
    document.getElementById('saveSettings').addEventListener('click', () => {
        // Read DOM
        state.settings.baseRate = parseInt(document.getElementById('baseHourlyRate').value);
        state.settings.nightRate = parseInt(document.getElementById('nightHourlyRate').value);
        state.settings.normalStart = document.getElementById('defaultWeekdayStart').value;
        // Handle >24 time input? Browser time input is 00-23. Users might type 27:00?
        // Standard time input only supports 00-23. We need text inputs for >24 or specific UI.
        // For now, let's assume they pick "03:00" and we interpret as next day if < start.
        // Wait, standard UI is fine. The Logic handles the wrap.
        state.settings.normalEnd = document.getElementById('defaultWeekdayEnd').value;
        state.settings.weekendStart = document.getElementById('defaultWeekendStart').value;
        state.settings.weekendEnd = document.getElementById('defaultWeekendEnd').value;
        
        p.classList.add('hidden');
        calculateDraft(); // Recalculate potentials
        alert('設定を保存しました');
    });

    // Target Inputs
    document.getElementById('targetAmount').addEventListener('input', (e) => {
        state.target.amount = parseInt(e.target.value) || 0;
    });
    document.getElementById('currentSalary').addEventListener('input', (e) => {
        state.target.current = parseInt(e.target.value) || 0;
    });
    document.getElementById('sectionReleaseToggle').addEventListener('change', (e) => {
        state.target.isSectionRelease = e.target.checked;
        // Recalc draft to update potentials (section release rates change)
        calculateDraft(); 
    });

    // Mode Switch
    const btnSel = document.getElementById('modeSelect');
    const btnSpec = document.getElementById('modeSpecial');
    btnSel.addEventListener('click', () => {
        btnSel.className = "px-3 py-1 rounded-md bg-white shadow-sm text-brand-600 transition-all font-bold";
        btnSpec.className = "px-3 py-1 rounded-md text-slate-500 hover:text-slate-700 transition-all";
    });
    btnSpec.addEventListener('click', () => {
        btnSpec.className = "px-3 py-1 rounded-md bg-white shadow-sm text-green-600 transition-all font-bold";
        btnSel.className = "px-3 py-1 rounded-md text-slate-500 hover:text-slate-700 transition-all";
    });

    // Main Action
    document.getElementById('calculateBtn').addEventListener('click', () => {
        calculateDraft(true);
        document.getElementById('resultsArea').classList.remove('hidden');
        document.getElementById('resultPreview').classList.remove('hidden'); // Show preview too?
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });

    // Modal
    document.getElementById('closeModal').addEventListener('click', closeTimeModal);
    document.getElementById('cancelTime').addEventListener('click', closeTimeModal);
    document.getElementById('saveTime').addEventListener('click', () => {
        if (state.selectedDayId) {
            const day = state.days.find(d => d.id === state.selectedDayId);
            if (day) {
                day.customStart = document.getElementById('modalStartTime').value;
                day.customEnd = document.getElementById('modalEndTime').value;
                // If "Holiday/No Work" checked?
                // Logic enhancement: set wages to 0 manually? 
                // For now, let's keep it simple: if start/end matches default, clear custom.
            }
        }
        closeTimeModal();
        renderCalendar();
        // If results open, maybe update?
    });

    // Copy
    document.getElementById('copyBtn').addEventListener('click', () => {
        const t = document.getElementById('resultText');
        t.select();
        document.execCommand('copy');
        alert('コピーしました');
    });
}

function openTimeModal(day) {
    state.selectedDayId = day.id;
    document.getElementById('timeModal').classList.remove('hidden');
    
    // Set Title
    document.getElementById('modalDateTitle').innerText = `${day.date}日 (${CONFIG.weekdays[day.nativeDay]})`;
    
    // Set Values (Default or Custom)
    // Need to convert "27:00" notation back to "03:00" for input[type=time] if stored that way. 
    // Logic currently stores HH:MM.
    const isWk = (day.nativeDay === 5 || day.nativeDay === 6 || day.isSpecial);
    const defStart = isWk ? state.settings.weekendStart : state.settings.normalStart;
    const defEnd = isWk ? state.settings.weekendEnd : state.settings.normalEnd;

    document.getElementById('modalStartTime').value = day.customStart || defStart;
    document.getElementById('modalEndTime').value = day.customEnd || defEnd;
}

function closeTimeModal() {
    document.getElementById('timeModal').classList.add('hidden');
    state.selectedDayId = null;
}

function updateResults(totalPay, totalDays, selectedDays, alertSection, selWk, totWk) {
    document.getElementById('resultTotalPay').innerText = `¥${totalPay.toLocaleString()}`;
    document.getElementById('resultTotalDays').innerHTML = `${totalDays}<span class="text-xs font-normal text-slate-400 ml-1">日</span>`;

    // Alert
    const alertBox = document.getElementById('alertContainer');
    if (alertSection) {
        alertBox.classList.remove('hidden');
        const needed = Math.ceil(totWk * 0.5) - selWk;
        document.getElementById('alertMessage').innerText = `週末・特日出勤があと${needed}回必要です。(現在${Math.round(selWk/totWk*100)}%)`;
    } else {
        alertBox.classList.add('hidden');
    }

    // Generate Text
    // Format: "1/15(金) 19:00-3:00"
    const lines = [`【${state.currentMonth.month + 1}月シフト希望】`, `目標: ¥${state.target.amount.toLocaleString()}`];
    selectedDays.sort((a,b) => a.date - b.date).forEach(d => {
        // Recalc times for display (might be custom)
        const isWk = (d.nativeDay === 5 || d.nativeDay === 6 || d.isSpecial);
        const s = d.customStart || (isWk ? state.settings.weekendStart : state.settings.normalStart);
        const e = d.customEnd || (isWk ? state.settings.weekendEnd : state.settings.normalEnd);
        
        // Pretty print time (remove leading zeros for hours?)
        lines.push(`${state.currentMonth.month + 1}/${d.date}(${CONFIG.weekdays[d.nativeDay]}) ${s}〜${e}`);
    });
    
    document.getElementById('resultText').value = lines.join('\n');
}

function updateUI() {
    // Initial Render
}

// --- Start ---
window.addEventListener('DOMContentLoaded', init);
