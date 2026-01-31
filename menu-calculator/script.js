// Data Storage
let ingredients = JSON.parse(localStorage.getItem('menu_ingredients')) || [];
let currentRecipe = [];

// DOM Elements
const views = {
    calculator: document.getElementById('calculator'),
    ingredients: document.getElementById('ingredients')
};
const tabs = document.querySelectorAll('.tab-btn');
const ingredientForm = document.getElementById('ingredient-form');
const ingredientsList = document.getElementById('ingredients-list');
const ingredientSearch = document.getElementById('ingredient-search');

const recipeList = document.getElementById('recipe-ingredients-list');
const addRowBtn = document.getElementById('add-ingredient-row-btn');
const totalCostEl = document.getElementById('total-cost');
const sellingPriceInput = document.getElementById('selling-price');
const costPercentageEl = document.getElementById('cost-percentage');
const resetBtn = document.getElementById('reset-recipe-btn');

const modal = document.getElementById('ingredient-modal');
const modalList = document.getElementById('modal-ingredient-list');
const modalSearch = document.getElementById('modal-search');
const closeModal = document.querySelector('.close-modal');

// Init
function init() {
    renderIngredients();
    setupEventListeners();
}

// Event Listeners
function setupEventListeners() {
    // Tabs
    tabs.forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    // Ingredient Management
    ingredientForm.addEventListener('submit', handleAddIngredient);
    ingredientSearch.addEventListener('input', (e) => renderIngredients(e.target.value));

    // Calculator
    addRowBtn.addEventListener('click', openIngredientModal);
    recipeList.addEventListener('input', calculateCost); // Recalc on amount change
    recipeList.addEventListener('click', handleRecipeListClick);
    sellingPriceInput.addEventListener('input', calculateCost);
    resetBtn.addEventListener('click', resetRecipe);

    // Modal
    closeModal.addEventListener('click', () => modal.classList.remove('open'));
    modalSearch.addEventListener('input', (e) => renderModalIngredients(e.target.value));
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('open');
    });
}

// Tabs Logic
function switchTab(tabName) {
    tabs.forEach(t => t.classList.remove('active'));
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

    Object.values(views).forEach(el => el.classList.remove('active'));
    views[tabName].classList.add('active');
}

// Ingredient Logic
function handleAddIngredient(e) {
    e.preventDefault();
    const name = document.getElementById('ing-name').value;
    const price = parseFloat(document.getElementById('ing-price').value);
    const amount = document.getElementById('ing-amount').value; // Keep as string if simple, but we need float for calc.
    const amountVal = parseFloat(amount);
    const unit = document.getElementById('ing-unit').value;

    if (!name || isNaN(price) || isNaN(amountVal)) {
        alert('全ての項目を正しく入力してください。');
        return;
    }

    const newIng = {
        id: Date.now().toString(),
        name,
        price,
        amount: amountVal, // Purchased amount
        unit
    };

    ingredients.push(newIng);
    saveIngredients();
    renderIngredients();
    e.target.reset();
}

function deleteIngredient(id) {
    if (confirm('この材料を削除しますか？')) {
        ingredients = ingredients.filter(i => i.id !== id);
        saveIngredients();
        renderIngredients();
    }
}

function saveIngredients() {
    localStorage.setItem('menu_ingredients', JSON.stringify(ingredients));
}

function renderIngredients(filter = '') {
    ingredientsList.innerHTML = '';
    const filtered = ingredients.filter(i => i.name.toLowerCase().includes(filter.toLowerCase()));

    if (filtered.length === 0) {
        ingredientsList.innerHTML = '<li class="empty-state">該当する材料がありません</li>';
        return;
    }

    filtered.forEach(ing => {
        const costPerUnit = (ing.price / ing.amount).toFixed(2);
        const li = document.createElement('li');
        li.className = 'item-row';
        li.innerHTML = `
            <div class="item-info">
                <h4>${ing.name}</h4>
                <p>¥${ing.price} / ${ing.amount}${ing.unit} (@¥${costPerUnit}/${ing.unit})</p>
            </div>
            <button class="delete-btn" onclick="deleteIngredient('${ing.id}')">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;
        ingredientsList.appendChild(li);
    });
}

// Calculator Logic
function openIngredientModal() {
    modal.classList.add('open');
    renderModalIngredients();
    modalSearch.value = '';
    modalSearch.focus();
}

function renderModalIngredients(filter = '') {
    modalList.innerHTML = '';
    const filtered = ingredients.filter(i => i.name.toLowerCase().includes(filter.toLowerCase()));

    filtered.forEach(ing => {
        const li = document.createElement('li');
        li.className = 'item-row';
        li.innerHTML = `
            <div class="item-info">
                <h4>${ing.name}</h4>
                <p>¥${ing.price} / ${ing.amount}${ing.unit}</p>
            </div>
            <i class="fa-solid fa-plus" style="color:var(--text-main)"></i>
        `;
        li.addEventListener('click', () => addToRecipe(ing));
        modalList.appendChild(li);
    });
}

function addToRecipe(ingredient) {
    // Close modal
    modal.classList.remove('open');

    // Add visual row
    const div = document.createElement('div');
    div.className = 'recipe-item-row';
    div.dataset.id = ingredient.id;
    div.dataset.price = ingredient.price;
    div.dataset.baseAmount = ingredient.amount;

    div.innerHTML = `
        <div class="recipe-item-name">${ingredient.name}</div>
        <input type="number" class="recipe-item-input" placeholder="0" step="any">
        <div class="recipe-item-unit">${ingredient.unit}</div>
    `;

    // Add delete button manually
    const delBtn = document.createElement('button');
    delBtn.className = 'remove-row-btn';
    delBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    div.appendChild(delBtn);

    // Remove empty state if exists
    const emptyState = recipeList.querySelector('.empty-state');
    if (emptyState) emptyState.remove();

    recipeList.appendChild(div);

    // Focus the input
    div.querySelector('input').focus();

    calculateCost();
}

function handleRecipeListClick(e) {
    if (e.target.closest('.remove-row-btn')) {
        e.target.closest('.recipe-item-row').remove();
        calculateCost();

        if (recipeList.children.length === 0) {
            recipeList.innerHTML = '<div class="empty-state">材料を追加してください</div>';
        }
    }
}

function calculateCost() {
    let total = 0;
    const rows = recipeList.querySelectorAll('.recipe-item-row');

    rows.forEach(row => {
        const price = parseFloat(row.dataset.price);
        const baseAmount = parseFloat(row.dataset.baseAmount);
        const inputV = row.querySelector('input').value;
        const useAmount = inputV ? parseFloat(inputV) : 0;

        const cost = (price / baseAmount) * useAmount;
        total += cost;
    });

    totalCostEl.textContent = `¥${Math.round(total)}`; // Ceil or Round? Usually round or ceil.

    // Calculate %
    const sellPrice = parseFloat(sellingPriceInput.value);
    if (sellPrice && sellPrice > 0) {
        const percent = (total / sellPrice) * 100;
        costPercentageEl.textContent = `${percent.toFixed(1)}%`;

        // Visual feedback
        if (percent > 35) costPercentageEl.style.color = '#ff4d4d'; // Red if high
        else if (percent < 20) costPercentageEl.style.color = '#28a745'; // Green if low
        else costPercentageEl.style.color = 'var(--text-main)';
    } else {
        costPercentageEl.textContent = '0.0%';
        costPercentageEl.style.color = 'var(--text-muted)';
    }
}

function resetRecipe() {
    if (confirm('現在のレシピをリセットしますか？')) {
        recipeList.innerHTML = '<div class="empty-state">材料を追加してください</div>';
        document.getElementById('menu-name').value = '';
        sellingPriceInput.value = '';
        calculateCost();
    }
}

// Global expose for onclick events
window.deleteIngredient = deleteIngredient;

// Start
init();
